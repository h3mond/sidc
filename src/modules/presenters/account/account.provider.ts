import { Provider } from '@nestjs/common';
import { LoadAccountPort } from '../../../core/domain/ports/out/account/load-account.port';
import { CreateProjectPort } from '../../../core/domain/ports/out/project/create-project.port';
import { CreateAccountService } from '../../../core/services/account/create-account.service';
import { GetProjectsService } from '../../../core/services/account/get-projects.service';
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
    port: AccountPersistenceService,
    bcryptService: BcryptServiceAdapter,
  ): CreateAccountService => {
    return new CreateAccountService(port, bcryptService);
  },
  inject: [AccountPersistenceService, BcryptServiceSymbol],
};

export const CreateProjectSymbol = Symbol('CreateProjectSymbol');
export const CreateProjectProvider: Provider = {
  provide: CreateProjectSymbol,
  useFactory: (port: CreateProjectPort): CreateProjectService => {
    return new CreateProjectService(port);
  },
  inject: [ProjectPersistenceService],
};

export const GetProjectsSymbol = Symbol('GetProjectsSymbol');
export const GetProjectsProvider: Provider = {
  provide: GetProjectsSymbol,
  useFactory: (port: LoadAccountPort): GetProjectsService => {
    return new GetProjectsService(port);
  },
  inject: [AccountPersistenceService],
};
