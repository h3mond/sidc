import {
  ProjectEntity,
  ProjectEntityProps,
} from '../../../core/domain/project/entity/project.entity';
import { ID } from '../../../core/shared/value-objects/id.value-object';
import {
  OrmEntityProps,
  OrmMapper,
} from '../../../infra/database/base-classes/orm-mapper.base';
import { ProjectOrmEntity } from './project.orm-entity';

export class ProjectOrmMapper extends OrmMapper<
  ProjectEntity,
  ProjectOrmEntity
> {
  protected toDomainProps(ormEntity: ProjectOrmEntity): ProjectEntityProps {
    const domainEntityProps: ProjectEntityProps = {
      ownerId: new ID(ormEntity.ownerId),
      name: ormEntity.name,
      clientSecret: new ID(ormEntity.clientSecret),
    };
    return domainEntityProps;
  }

  protected toOrmProps(
    entity: ProjectEntity,
  ): OrmEntityProps<ProjectOrmEntity> {
    const ormEntityProps: OrmEntityProps<ProjectOrmEntity> = {
      ownerId: entity.ownerId.value,
      name: entity.name,
      clientSecret: entity.clientSecret.value,
    };
    return ormEntityProps;
  }
}
