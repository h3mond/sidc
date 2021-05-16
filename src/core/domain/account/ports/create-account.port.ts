import { AccountEntity } from '../entity/account.entity';

export interface CreateAccountPort {
  createAccount(account: AccountEntity): Promise<boolean>;
}
