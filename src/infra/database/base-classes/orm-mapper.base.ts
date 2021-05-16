import { DeepPartial } from 'typeorm';
import { EntityBaseProps } from '../../../core/shared/base-classes/entity.base';
import { DateVO } from '../../../core/shared/value-objects/date.value-object';
import { ID } from '../../../core/shared/value-objects/id.value-object';
import { TypeOrmEntityBase } from './typeorm.entity.base';

export type OrmEntityProps<OrmEntity> = Omit<OrmEntity, 'id' | 'createdAt'>;

export abstract class OrmMapper<T extends EntityBaseProps, OrmEntity> {
  constructor(
    private entityConstructor: new (...args: any[]) => T,
    private ormEntityConstructor: new (...args: any[]) => OrmEntity,
  ) {}

  protected abstract toDomainProps(ormEntity: OrmEntity): unknown;
  protected abstract toOrmProps(entity: T): OrmEntityProps<OrmEntity>;

  toDomainEntity(ormEntity: OrmEntity): T {
    const entityProps = this.toDomainProps(ormEntity);
    return this.assignPropsToEntity(entityProps, ormEntity);
  }

  toOrmEntity(entity: T): DeepPartial<OrmEntity> {
    const props = this.toOrmProps(entity);
    return new this.ormEntityConstructor({
      ...props,
      id: entity.id.value,
      createdAt: entity.createdAt.value,
    });
  }

  // little bit tricky
  private assignPropsToEntity<Props>(
    entityProps: Props,
    ormEntity: OrmEntity,
  ): T {
    const entityCopy = Object.create(this.entityConstructor.prototype);
    const ormEntityBase = (ormEntity as unknown) as TypeOrmEntityBase;

    entityCopy.props = entityProps;
    entityCopy._id = new ID(ormEntityBase.id);
    entityCopy._createdAt = new DateVO(ormEntityBase.createdAt);

    return entityCopy as T;
  }
}
