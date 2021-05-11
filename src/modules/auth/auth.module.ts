import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccountModule } from '../account/account.module';
import { bcryptServiceProvider } from '../account/account.provider';
import {
  jwtStrategyProvider,
  loadAccountProvider,
  localStrategyProvider,
} from './auth.provider';
import { AuthController } from './web/auth.controller';

@Module({
  imports: [
    AccountModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_TOKEN,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  providers: [
    loadAccountProvider,
    bcryptServiceProvider,
    localStrategyProvider,
    jwtStrategyProvider,
  ],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
