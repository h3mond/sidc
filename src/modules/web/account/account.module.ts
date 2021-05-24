import { CacheModule, Module } from '@nestjs/common';
import { MailModule } from '../../mail/mail.module';
import { PersistenceModule } from '../../persistence/persistence.module';
import {
  BcryptServiceProvider,
  CreateAccountSymbol,
  // CreateAccountProvider,
  CreateProjectProvider,
  GetProjectsProvider,
} from './account.provider';
import { CreateAccountController } from './use-cases/create-account/create-account.controller';
import { CreateAccountService } from './use-cases/create-account/create-account.service';
import { CreateProjectController } from './use-cases/create-project/create-project.controller';
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
    GetProjectsController,
  ],
  providers: [
    {
      provide: CreateAccountSymbol,
      useClass: CreateAccountService,
    },
    CreateProjectProvider,
    GetProjectsProvider,
    BcryptServiceProvider,
  ],
})
export class AccountModule {}
