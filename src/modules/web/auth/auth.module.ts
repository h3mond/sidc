import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { BcryptServiceProvider } from '../account/account.provider';
import {
  jwtStrategyProvider,
  LoadAccountProvider,
  localStrategyProvider,
} from './auth.provider';
import { AuthController } from './controllers/auth.controller';
import { config } from 'dotenv';
import { PersistenceModule } from '../../persistence/persistence.module';

config();

@Module({
  imports: [
    PassportModule,
    PersistenceModule,
    // TODO: created multiple times
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  providers: [
    LoadAccountProvider,
    BcryptServiceProvider,
    localStrategyProvider,
    jwtStrategyProvider,
  ],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
