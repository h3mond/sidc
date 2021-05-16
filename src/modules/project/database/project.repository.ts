import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from '../../../core/domain/project/entity/project.entity';
import { CreateProjectPort } from '../../../core/domain/project/ports/create-project.port';
import { TypeOrmRepositoryBase } from '../../../infra/database/base-classes/typeorm.repository.base';
import { ProjectOrmEntity } from './project.orm-entity';
import { ProjectOrmMapper } from './project.orm-mapper';

@Injectable()
export class ProjectRepository
  extends TypeOrmRepositoryBase<ProjectEntity, ProjectOrmEntity>
  implements CreateProjectPort {
  constructor(
    @InjectRepository(ProjectOrmEntity)
    private readonly _projectRepository: Repository<ProjectOrmEntity>,
  ) {
    super(
      _projectRepository,
      new ProjectOrmMapper(ProjectEntity, ProjectOrmEntity),
    );
  }

  async createProject(project: ProjectEntity): Promise<boolean> {
    const result = await this.save(project);
    return !!result;
  }
}
