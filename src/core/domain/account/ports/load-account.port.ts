import { AccountEntity } from '../entities/account.entity';

export interface LoadAccountPort {
  loadAccount(entity: { id?: string; email?: string }): Promise<AccountEntity>;
}
