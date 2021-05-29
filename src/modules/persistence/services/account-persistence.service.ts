import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { AccountEntity } from '../../../core/domain/entities/account.entity';
import { CreateAccountPort } from '../../../core/domain/ports/out/account/create-account.port';
import { LoadAccountPort } from '../../../core/domain/ports/out/account/load-account.port';
import { ID } from '../../../core/shared/value-objects/id.value-object';
import { AccountRepository } from '../repositories/account/account.repository';
import { ProjectRepository } from '../repositories/project/project.repository';

@Injectable()
export class AccountPersistenceService
  implements CreateAccountPort, LoadAccountPort {
  constructor(
    @Inject(AccountRepository)
    private readonly accountRepository: AccountRepository,
    @Inject(ProjectRepository)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async createAccount(account: AccountEntity): Promise<boolean> {
    const found = await this.accountRepository.loadAccountByEmail(
      account.email,
    );
    if (found !== undefined) {
      throw new ConflictException('Email address already taken');
    }
    return !!(await this.accountRepository.save(account));
  }

  async loadAccountByEmail(email: string): Promise<AccountEntity> {
    return await this.accountRepository.findOne({ email: email });
  }

  async loadAccount(accountId: ID): Promise<AccountEntity> {
    return await this.accountRepository.findOne({ id: accountId });
  }
}
