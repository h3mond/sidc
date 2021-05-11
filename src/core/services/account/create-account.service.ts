import { AccountEntity } from '../../domain/account/entities/account.entity';
import { CreateAccountCommand } from '../../domain/account/use-cases/create-account.command';
import { CreateAccountUseCase } from '../../domain/account/use-cases/create-account.use-case';
import { CreateAccountPort } from '../../domain/account/ports/create-account.port';
import { HashProtocol } from '../../common/protocols/crypto.protocol';

export class CreateAccountService implements CreateAccountUseCase {
  constructor(
    private readonly createAccountPort: CreateAccountPort,
    private readonly hashEncrypt: HashProtocol,
  ) {}

  async createAccount(command: CreateAccountCommand): Promise<boolean> {
    const account = new AccountEntity(command.account);
    account.password = await this.hashEncrypt.hash(account.password);
    return await this.createAccountPort.createAccount(account);
  }
}
