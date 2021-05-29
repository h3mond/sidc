import { CacheModule, Module } from '@nestjs/common';
import { MailModule } from '../../mail/mail.module';
import { PersistenceModule } from '../../persistence/persistence.module';
import {
  BcryptServiceProvider,
  CreateAccountSymbol,
  CreateProjectProvider,
  GetProjectProvider,
  GetProjectsProvider,
} from './account.provider';
import { CreateAccountController } from './use-cases/create-account/create-account.controller';
import { CreateAccountService } from './use-cases/create-account/create-account.service';
import { CreateProjectController } from './use-cases/create-project/create-project.controller';
import { GetProjectController } from './use-cases/get-project/get-project.controller';
import { GetProjectsController } from './use-cases/get-projects/get-projects.controller';

@Module({
  imports: [
    PersistenceModule,
    MailModule,
    CacheModule.register({ ttl: 5 * 60 }),
  ],
  controllers: [
    CreateAccountController,
    CreateProjectController,
    GetProjectController,
    GetProjectsController,
  ],
  providers: [
    {
      provide: CreateAccountSymbol,
      useClass: CreateAccountService,
    },
    CreateProjectProvider,
    GetProjectProvider,
    GetProjectsProvider,
    BcryptServiceProvider,
  ],
})
export class AccountModule {}
