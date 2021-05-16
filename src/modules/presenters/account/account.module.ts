import { Module } from '@nestjs/common';
import { PersistenceModule } from '../../persistence/persistence.module';
import {
  BcryptServiceProvider,
  CreateAccountProvider,
  CreateProjectProvider,
} from './account.provider';
import { CreateAccountController } from './use-cases/create-account/create-account.controller';
import { CreateProjectController } from './use-cases/create-project/create-project.controller';

@Module({
  imports: [PersistenceModule],
  controllers: [CreateAccountController, CreateProjectController],
  providers: [
    CreateAccountProvider,
    CreateProjectProvider,
    BcryptServiceProvider,
  ],
})
export class AccountModule {}
