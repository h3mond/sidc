import { Provider } from '@nestjs/common';
import { CreateAccountService } from '../../core/services/account/create-account.service';
import { BcryptServiceAdapter } from '../../infra/crypto/bcrypt-service.adapter';
import { AccountRepository } from './database/account.repository';

export const bcryptServiceSymbol = Symbol('bcryptServiceSymbol');
export const bcryptServiceProvider: Provider = {
  provide: bcryptServiceSymbol,
  useFactory: (): BcryptServiceAdapter => {
    return new BcryptServiceAdapter(10);
  },
};

export const createAccountSymbol = Symbol('createAccount');
export const createAccountProvider: Provider = {
  provide: createAccountSymbol,
  useFactory: (
    repository: AccountRepository,
    bcryptService: BcryptServiceAdapter,
  ): CreateAccountService => {
    return new CreateAccountService(repository, bcryptService);
  },
  inject: [AccountRepository, bcryptServiceSymbol],
};
