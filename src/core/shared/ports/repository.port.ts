import { DeepPartial } from 'typeorm';
import { EntityBaseProps } from '../base-classes/entity.base';
import { ID } from '../value-objects/id.value-object';

export type QueryParams<EntityProps> = DeepPartial<
  EntityBaseProps & EntityProps
>;

export interface Save<Entity> {
  save(entity: Entity): Promise<Entity>;
}

export interface Delete<Entity> {
  delete(entity: Entity): Promise<Entity>;
}

export interface FindOne<Entity, EntityProps> {
  findOne(params: QueryParams<EntityProps>): Promise<Entity>;
}

export interface FindOneByIdOrThrow<Entity> {
  findOneByIdOrThrow(id: ID | string): Promise<Entity>;
}

export interface FindMany<Entity, EntityProps> {
  findMany(params: QueryParams<EntityProps>): Promise<Entity[]>;
}

export interface RepositoryPort<Entity, EntityProps>
  extends Save<Entity>,
    Delete<Entity>,
    FindOne<Entity, EntityProps>,
    FindOneByIdOrThrow<Entity>,
    FindMany<Entity, EntityProps> {}
