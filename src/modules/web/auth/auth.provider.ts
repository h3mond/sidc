import { Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptServiceAdapter } from '../../../infra/crypto/bcrypt-service.adapter';
import { BcryptServiceSymbol } from '../account/account.provider';
import { AccountPersistenceService } from '../../persistence/services/account-persistence.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { LocalStrategy } from './passport/local.strategy';
import { AuthService } from './services/auth.service';

export const LoadAccountSymbol = Symbol('loadAccountSymbol');
export const LoadAccountProvider: Provider = {
  provide: LoadAccountSymbol,
  useFactory: (
    repository: AccountPersistenceService,
    jwtService: JwtService,
    bcryptAdapter: BcryptServiceAdapter,
  ): AuthService => {
    return new AuthService(repository, jwtService, bcryptAdapter);
  },
  inject: [AccountPersistenceService, JwtService, BcryptServiceSymbol],
};

export const localStrategySymbol = Symbol('localStrategySymbol');
export const localStrategyProvider: Provider = {
  provide: localStrategySymbol,
  useFactory: (authService: AuthService): LocalStrategy => {
    return new LocalStrategy(authService);
  },
  inject: [LoadAccountSymbol],
};

export const jwtStrategySymbol = Symbol('jwtStrategySymbol');
export const jwtStrategyProvider: Provider = {
  provide: jwtStrategySymbol,
  useFactory: (): JwtStrategy => {
    return new JwtStrategy(process.env.JWT_SECRET);
  },
};
