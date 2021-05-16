import { Repository } from 'typeorm';
import { EntityBaseProps } from '../../../core/shared/base-classes/entity.base';
import { RepositoryPort } from '../../../core/shared/ports/repository.port';
import { OrmMapper } from './orm-mapper.base';
import { TypeOrmEntityBase } from './typeorm.entity.base';

export abstract class TypeOrmRepositoryBase<
  T extends EntityBaseProps,
  OrmEntity extends TypeOrmEntityBase
> implements RepositoryPort<T> {
  constructor(
    private readonly repository: Repository<OrmEntity>,
    private readonly mapper: OrmMapper<T, OrmEntity>,
  ) {}

  async save(entity: T): Promise<boolean> {
    const ormEntity = this.mapper.toOrmEntity(entity);
    const result = await this.repository.save(ormEntity);
    return !!result;
  }

  async delete(entity: T): Promise<T> {
    throw new Error('Method not implemented.');
  }

  async findOne(entity: { id?: string; email?: string }): Promise<T> {
    const found = await this.repository.findOne({
      where: [entity],
    });

    return found ? this.mapper.toDomainEntity(found) : undefined;
  }
}
