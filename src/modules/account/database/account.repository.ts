import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from '../../../core/domain/account/entities/account.entity';
import { CreateAccountPort } from '../../../core/domain/account/ports/create-account.port';
import { LoadAccountPort } from '../../../core/domain/account/ports/load-account.port';
import { TypeOrmRepositoryBase } from '../../../infra/database/base-classes/typeorm.repository.base';
import { AccountOrmEntity } from './account.orm-entity';
import { AccountOrmMapper } from './account.orm-mapper';

@Injectable()
export class AccountRepository
  extends TypeOrmRepositoryBase<AccountEntity, AccountOrmEntity>
  implements CreateAccountPort, LoadAccountPort {
  constructor(
    @InjectRepository(AccountOrmEntity)
    private readonly _accountRepository: Repository<AccountOrmEntity>,
  ) {
    super(
      _accountRepository,
      new AccountOrmMapper(AccountEntity, AccountOrmEntity),
    );
  }

  async createAccount(account: AccountEntity): Promise<boolean> {
    const exists = !!(await this.findOne({
      email: account.email,
    }));
    if (exists) {
      throw new ConflictException('Account exists');
    }
    return !!(await this.save(account));
  }

  async loadAccount(entity: {
    id?: string;
    email?: string;
  }): Promise<AccountEntity> {
    return await this.findOne(entity);
  }
}
