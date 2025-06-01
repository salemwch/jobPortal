import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { accessTokenStrategy } from './strategies/accessToken.strategy';
import { refreshTokenStrategy } from './strategies/refreshToken.strategy';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    ConfigModule,
    UserModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'sandbox.smtp.mailtrap.io',
          port: 2525,
          auth: {
            user: '5d5b17e53ff5a5',
            pass: '83a19f07341924',
          },
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, accessTokenStrategy, refreshTokenStrategy],
})
export class AuthModule {}
