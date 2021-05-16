import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  AccountEntity,
  AccountEntityProps,
} from '../../../../core/domain/entities/account.entity';
import { QueryParams } from '../../../../core/shared/ports/repository.port';
import {
  TypeOrmRepositoryBase,
  WhereCondition,
} from '../../../../infra/database/base-classes/typeorm.repository.base';
import { AccountOrmEntity } from './account.orm-entity';
import { AccountOrmMapper } from './account.orm-mapper';

@Injectable()
export class AccountRepository extends TypeOrmRepositoryBase<
  AccountEntity,
  AccountEntityProps,
  AccountOrmEntity
> {
  constructor(
    @InjectRepository(AccountOrmEntity)
    private readonly _accountRepository: Repository<AccountOrmEntity>,
  ) {
    super(
      _accountRepository,
      new AccountOrmMapper(AccountEntity, AccountOrmEntity),
    );
  }

  async loadAccountByEmail(email: string): Promise<AccountEntity> {
    return await this.findOne({ email });
  }

  protected prepareQuery(
    params: QueryParams<AccountEntityProps>,
  ): WhereCondition<AccountOrmEntity> {
    const where: WhereCondition<AccountOrmEntity> = {};
    if (params.id !== undefined) {
      where.id = params.id.value;
    }
    if (params.email !== undefined) {
      where.email = params.email;
    }
    return where;
  }
}
