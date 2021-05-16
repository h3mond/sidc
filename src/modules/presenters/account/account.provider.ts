import { Provider } from '@nestjs/common';
import { CreateAccountPort } from '../../../core/domain/ports/out/account/create-account.port';
import { CreateProjectPort } from '../../../core/domain/ports/out/project/create-project.port';
import { CreateAccountService } from '../../../core/services/account/create-account.service';
import { CreateProjectService } from '../../../core/services/project/create-project.service';
import { BcryptServiceAdapter } from '../../../infra/crypto/bcrypt-service.adapter';
import { AccountPersistenceService } from '../../persistence/services/account-persistence.service';
import { ProjectPersistenceService } from '../../persistence/services/project-persistence.service';

export const BcryptServiceSymbol = Symbol('bcryptServiceSymbol');
export const BcryptServiceProvider: Provider = {
  provide: BcryptServiceSymbol,
  useFactory: (): BcryptServiceAdapter => {
    return new BcryptServiceAdapter(10);
  },
};

export const CreateAccountSymbol = Symbol('CreateAccountSymbol');
export const CreateAccountProvider: Provider = {
  provide: CreateAccountSymbol,
  useFactory: (
    repository: AccountPersistenceService,
    bcryptService: BcryptServiceAdapter,
  ): CreateAccountService => {
    return new CreateAccountService(repository, bcryptService);
  },
  inject: [AccountPersistenceService, BcryptServiceSymbol],
};

export const CreateProjectSymbol = Symbol('CreateProjectSymbol');
export const CreateProjectProvider: Provider = {
  provide: CreateProjectSymbol,
  useFactory: (repository: CreateProjectPort): CreateProjectService => {
    return new CreateProjectService(repository);
  },
  inject: [ProjectPersistenceService],
};
