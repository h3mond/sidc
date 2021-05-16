import { AccountEntity } from '../../../entities/account.entity';

export interface CreateAccountPort {
  createAccount(account: AccountEntity): Promise<boolean>;
}
