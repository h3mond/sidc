import { AccountEntityProps } from '../entity/account.entity';

export class CreateAccountCommand {
  constructor(private readonly _account: AccountEntityProps) {}

  get account(): AccountEntityProps {
    return this._account;
  }
}
