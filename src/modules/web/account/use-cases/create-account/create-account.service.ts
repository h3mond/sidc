import {
  CACHE_MANAGER,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateAccountCommand } from '../../../../../core/domain/ports/in/create-account/create-account.command';
import { CreateAccountUseCase } from '../../../../../core/domain/ports/in/create-account/create-account.use-case';
import { CreateAccountPort } from '../../../../../core/domain/ports/out/account/create-account.port';
import { HashProtocol } from '../../../../../core/shared/protocols/crypto.protocol';
import { MailService } from '../../../../mail/mail.service';
import { AccountPersistenceService } from '../../../../persistence/services/account-persistence.service';
import { BcryptServiceSymbol } from '../../account.provider';
import { Cache } from 'cache-manager';
import { ID } from '../../../../../core/shared/value-objects/id.value-object';
import { AccountCacheInterface } from './interfaces/account-cache.interface';
import { AccountEntity } from '../../../../../core/domain/entities/account.entity';
import { LoadAccountPort } from '../../../../../core/domain/ports/out/account/load-account.port';

@Injectable()
export class CreateAccountService implements CreateAccountUseCase {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    @Inject(AccountPersistenceService)
    private readonly createAccountPort: CreateAccountPort,
    @Inject(AccountPersistenceService)
    private readonly loadAccountPort: LoadAccountPort,
    @Inject(BcryptServiceSymbol)
    private readonly hashAdapter: HashProtocol,
    @Inject(MailService)
    private readonly mailerService: MailService,
  ) {}

  async verifyAccount(key: string, code: string): Promise<boolean> {
    const accountCache = await this.cacheManager.get<AccountCacheInterface>(
      key,
    );
    if (accountCache === undefined) {
      throw new ForbiddenException('Invalid key');
    }
    if (accountCache.code !== code) {
      throw new ForbiddenException('Invalid code');
    }
    await this.cacheManager.del(key);
    const account = new AccountEntity(accountCache.account);
    return !!(await this.createAccountPort.createAccount(account));
  }

  async createAccount(command: CreateAccountCommand): Promise<ID> {
    const found = await this.loadAccountPort.loadAccountByEmail(
      command.account.email,
    );

    if (found !== undefined) {
      throw new ConflictException('Email address already taken.');
    }

    command.account.password = await this.hashAdapter.hash(
      command.account.password,
    );

    const code = Math.random().toString().slice(2, 11);
    await this.mailerService.sendEmailConfirmation(command.account, code);

    const key = ID.generate();
    const account: AccountCacheInterface = {
      code: code,
      account: command.account,
    };
    await this.cacheManager.set<AccountCacheInterface>(key.value, account);

    return key;
  }
}
