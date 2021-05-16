import { Module } from '@nestjs/common';
import { PersistenceModule } from '../../persistence/persistence.module';
import {
  BcryptServiceProvider,
  CreateAccountProvider,
  CreateProjectProvider,
  GetProjectsProvider,
} from './account.provider';
import { CreateAccountController } from './use-cases/create-account/create-account.controller';
import { CreateProjectController } from './use-cases/create-project/create-project.controller';
import { GetProjectsController } from './use-cases/get-projects/get-projects.controller';

@Module({
  imports: [PersistenceModule],
  controllers: [
    CreateAccountController,
    CreateProjectController,
    GetProjectsController,
  ],
  providers: [
    CreateAccountProvider,
    CreateProjectProvider,
    GetProjectsProvider,
    BcryptServiceProvider,
  ],
})
export class AccountModule {}
