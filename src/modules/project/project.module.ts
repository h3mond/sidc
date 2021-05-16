import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectOrmEntity } from './database/project.orm-entity';
import { ProjectRepository } from './database/project.repository';
import { createProjectProvider } from './project.provider';
import { CreateProjectController } from './use-cases/create-project/create-project.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectOrmEntity])],
  controllers: [CreateProjectController],
  providers: [createProjectProvider, ProjectRepository],
})
export class ProjectModule {}
