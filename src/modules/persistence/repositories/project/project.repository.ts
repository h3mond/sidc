import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import {
  ProjectEntity,
  ProjectEntityProps,
} from '../../../../core/domain/entities/project.entity';
import { EntityBaseProps } from '../../../../core/shared/base-classes/entity.base';
import {
  TypeOrmRepositoryBase,
  WhereCondition,
} from '../../../../infra/database/base-classes/typeorm.repository.base';
import { ProjectOrmEntity } from './project.orm-entity';
import { ProjectOrmMapper } from './project.orm-mapper';

@Injectable()
export class ProjectRepository extends TypeOrmRepositoryBase<
  ProjectEntity,
  ProjectEntityProps,
  ProjectOrmEntity
> {
  constructor(
    @InjectRepository(ProjectOrmEntity)
    private readonly _projectRepository: Repository<ProjectOrmEntity>,
  ) {
    super(
      _projectRepository,
      new ProjectOrmMapper(ProjectEntity, ProjectOrmEntity),
    );
  }

  protected prepareQuery(
    params: DeepPartial<EntityBaseProps & ProjectEntityProps>,
  ): WhereCondition<ProjectOrmEntity> {
    throw new Error('Method not implemented.');
  }
}
