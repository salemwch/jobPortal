import { Controller, Post, Body, Param, Put, Delete, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { resetdto } from './dto/reset.dto';
import { AuthDto } from './authDto/authdto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { AccesTokenGuards } from '../guards/accesToken.guards';
import { Role } from '../guards/role.decorator';
import { UserRole } from '../userRole/userRole';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async signIn(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }
  @Post('logout/:id')
  async logout(@Param('id') id: string) {
    return this.authService.logout(id);
  }
  @Post('forgetpassword')
  async forgetPassword(@Body('email') email: string) {
    return this.authService.forgetpassword(email);
  }
  @Post('reset-password/:token')
  async resetPassword(@Param('token') token: string, @Body() resetDto: resetdto ) {
    return this.authService.resetpassword(token, resetDto.password);
  }
  @UseGuards(AccesTokenGuards)
  @Role(UserRole.ADMIN)
  @Put('update/:id')
  async updateProfile(@Param('id') id:string, @Body() updateUserDto:  UpdateUserDto): Promise<any>{
    return this.authService.updateProfile(id,updateUserDto);
  }
  @Delete('delete/:id')
  @UseGuards(AccesTokenGuards)
  @Role(UserRole.ADMIN)
  async deleteAccount(@Param('id') id: string): Promise<any>{
    return this.authService.deleteAccount(id);
  }
  @Get()
  @UseGuards(AccesTokenGuards)
  @Role(UserRole.ADMIN)
  async getAllUser(): Promise<any>{
    return this.authService.getAllUsers();
  }
}
