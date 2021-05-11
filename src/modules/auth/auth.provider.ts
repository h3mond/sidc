import { Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptServiceAdapter } from '../../infra/crypto/bcrypt-service.adapter';
import { bcryptServiceSymbol } from '../account/account.provider';
import { AccountRepository } from '../account/database/account.repository';
import { JwtStrategy } from './passport/jwt-strategy.strategy';
import { LocalStrategy } from './passport/local-strategy.strategy';
import { AuthService } from './services/auth.service';

export const loadAccountSymbol = Symbol('loadAccountSymbol');
export const loadAccountProvider: Provider = {
  provide: loadAccountSymbol,
  useFactory: (
    repository: AccountRepository,
    jwtService: JwtService,
    bcryptAdapter: BcryptServiceAdapter,
  ): AuthService => {
    return new AuthService(repository, jwtService, bcryptAdapter);
  },
  inject: [AccountRepository, JwtService, bcryptServiceSymbol],
};

export const localStrategySymbol = Symbol('localStrategySymbol');
export const localStrategyProvider: Provider = {
  provide: localStrategySymbol,
  useFactory: (authService: AuthService): LocalStrategy => {
    return new LocalStrategy(authService);
  },
  inject: [loadAccountSymbol],
};

export const jwtStrategySymbol = Symbol('jwtStrategySymbol');
export const jwtStrategyProvider: Provider = {
  provide: jwtStrategySymbol,
  useFactory: (): JwtStrategy => {
    return new JwtStrategy(process.env.JWT_TOKEN);
  },
};
