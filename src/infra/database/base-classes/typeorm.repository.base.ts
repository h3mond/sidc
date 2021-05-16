import { NotFoundException } from '@nestjs/common';
import { DeepPartial, FindConditions, Repository } from 'typeorm';
import { EntityBaseProps } from '../../../core/shared/base-classes/entity.base';
import {
  QueryParams,
  RepositoryPort,
} from '../../../core/shared/ports/repository.port';
import { ID } from '../../../core/shared/value-objects/id.value-object';
import { OrmMapper } from './orm-mapper.base';

export type WhereCondition<OrmEntity> = FindConditions<OrmEntity>;

export abstract class TypeOrmRepositoryBase<
  Entity extends EntityBaseProps,
  EntityProps,
  OrmEntity
> implements RepositoryPort<Entity, EntityProps> {
  constructor(
    private readonly repository: Repository<OrmEntity>,
    private readonly mapper: OrmMapper<Entity, OrmEntity>,
  ) {}

  protected abstract prepareQuery(
    params: QueryParams<EntityProps>,
  ): WhereCondition<OrmEntity>;

  async save(entity: Entity): Promise<Entity> {
    const ormEntity = <DeepPartial<OrmEntity>>(
      (this.mapper.toOrmEntity(entity) as unknown)
    );
    const result = await this.repository.save(ormEntity);
    return this.mapper.toDomainEntity(result);
  }

  async delete(entity: Entity): Promise<Entity> {
    const ormEntity: OrmEntity = this.mapper.toOrmEntity(entity);
    await this.repository.remove(ormEntity);
    return entity;
  }

  async findOne(
    params: QueryParams<EntityProps> = {},
  ): Promise<Entity | undefined> {
    const where = this.prepareQuery(params);
    const found = await this.repository.findOne({ where });
    return found ? this.mapper.toDomainEntity(found) : undefined;
  }

  async findOneByIdOrThrow(id: ID | string): Promise<Entity> {
    const found = await this.repository.findOne({
      where: { id: id instanceof ID ? id.value : id },
    });
    if (found === undefined) {
      throw new NotFoundException();
    }
    return this.mapper.toDomainEntity(found);
  }

  async findMany(params: QueryParams<EntityProps> = {}): Promise<Entity[]> {
    const result = await this.repository.find({
      where: this.prepareQuery(params),
    });
    return result.map((item) => this.mapper.toDomainEntity(item));
  }
}
