import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthDto } from './authDto/authdto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserRole } from '../userRole/userRole';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailservice: MailerService,
  ) {}
  
  async signIn(data: AuthDto) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) throw new BadRequestException('User does not exist');
    const passwordMatches = await argon2.verify(user.password, data.password);
    if (!passwordMatches) {
      throw new BadRequestException('Password is incorrect');}
    const tokens = await this.getTokens(user._id, user.email, user.role);
    await this.updateRefreshToken(user._id, tokens.refreshToken);
    if(user.role !== UserRole.ADMIN){
      return {refreshToken: tokens.refreshToken, user};
    }
    return { tokens, user };
  }

  async updateRefreshToken(userID: any,refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userService.update(userID, {
      refreshToken: hashedRefreshToken,
    });
  }
 

  async getTokens(userID: any, email: string, role: UserRole) {
    const refreshToken = await this.jwtService.signAsync(
      { sub: userID, email, role },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '1d', 
      },
    );

    if (role === UserRole.ADMIN) {
      const accessToken = await this.jwtService.signAsync(
        { sub: userID, email, role },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m', 
        },
      );

      return { accessToken, refreshToken };
    }

    return { refreshToken }; 
  }
  async hashData(data: string) {
    return argon2.hash(data);
  }
  async logout(ID: string): Promise<any> {
    try {
      await this.userService.update(ID, { refreshToken: null });
      return { success: true, message: 'Logout successful' };
    } catch (error) {
      return { message: 'Bad request' };
    }
  }

  async forgetpassword(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new BadRequestException('User does not exist');
    
    const accesstoken = this.jwtService.sign(
      { _id: user._id },
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '5m',
      },
    );
    await this.userService.updatetoken(user._id,  accesstoken );
    const frontendUrl = 'http://localhost:3001';
    const resetLink = `${frontendUrl}/auth/reset-password/${accesstoken}`;
    const mailOptions = { 
      to: user.email,
      subject: 'Reset Password',
      html: `<p>Click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a><br><br>
      <b>Note:</b> This link expires in 5 minutes.`,
    };

    await this.mailservice.sendMail(mailOptions);
    return { success: true, message: 'A reset link has been sent to your email' };
  }

  async resetpassword(token: string, newPassword: string): Promise<any> {
    try {
      const verifyToken = await this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      });
      const user = await this.userService.findById(verifyToken._id);
      if (!user) throw new BadRequestException('User does not exist');
      user.password = await this.hashData(newPassword);
      user.refreshToken = undefined; 
      await user.save();
      return { success: true, message: 'Password has been reset successfully' };
    } catch (error) {
      return { message: 'Invalid token', error: error };
    }
  }
  async updateProfile(id: string, updateData: UpdateUserDto): Promise<any>{
    return this.userService.update(id, updateData);
  }
  async deleteAccount(id: string): Promise<any>{
    const user = await this.userService.findById(id);
    if(!user){
      throw new BadRequestException('user does not exist');
    }
    await this.userService.deleteAccount(id);
    return {success: true, message:'Account deleted successfully'};
  }
  async getAllUsers(){
    return this.userService.getAllUsers();
  }
}
