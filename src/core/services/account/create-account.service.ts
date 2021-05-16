import { CreateAccountUseCase } from '../../domain/ports/in/create-account/create-account.use-case';
import { CreateAccountPort } from '../../domain/ports/out/account/create-account.port';
import { HashProtocol } from '../../shared/protocols/crypto.protocol';
import { AccountEntity } from '../../domain/entities/account.entity';
import { CreateAccountCommand } from '../../domain/ports/in/create-account/create-account.command';

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
