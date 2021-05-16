import {
  AccountEntity,
  AccountEntityProps,
} from '../../../core/domain/account/entity/account.entity';
import {
  OrmEntityProps,
  OrmMapper,
} from '../../../infra/database/base-classes/orm-mapper.base';
import { AccountOrmEntity } from './account.orm-entity';

export class AccountOrmMapper extends OrmMapper<
  AccountEntity,
  AccountOrmEntity
> {
  protected toDomainProps(ormEntity: AccountOrmEntity): AccountEntityProps {
    const domainEntityProps: AccountEntityProps = {
      name: ormEntity.name,
      surname: ormEntity.surname,
      email: ormEntity.email,
      password: ormEntity.password,
    };
    return domainEntityProps;
  }

  protected toOrmProps(
    entity: AccountEntity,
  ): OrmEntityProps<AccountOrmEntity> {
    const ormEntityProps: OrmEntityProps<AccountOrmEntity> = {
      name: entity.name,
      surname: entity.surname,
      email: entity.email,
      password: entity.password,
    };

    return ormEntityProps;
  }
}
