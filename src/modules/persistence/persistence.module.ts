import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountOrmEntity } from './repositories/account/account.orm-entity';
import { AccountRepository } from './repositories/account/account.repository';
import { ProjectOrmEntity } from './repositories/project/project.orm-entity';
import { ProjectRepository } from './repositories/project/project.repository';
import { AccountPersistenceService } from './services/account-persistence.service';
import { ProjectPersistenceService } from './services/project-persistence.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountOrmEntity, ProjectOrmEntity])],
  providers: [
    AccountPersistenceService,
    ProjectPersistenceService,
    AccountRepository,
    ProjectRepository,
  ],
  exports: [AccountPersistenceService, ProjectPersistenceService],
})
export class PersistenceModule {}
