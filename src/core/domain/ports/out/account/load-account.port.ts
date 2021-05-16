import { ID } from '../../../../shared/value-objects/id.value-object';
import { AccountEntity } from '../../../entities/account.entity';

export interface LoadAccountPort {
  loadAccount(accountId: ID | string): Promise<AccountEntity>;
  loadAccountByEmail(email: string): Promise<AccountEntity>;
  loadAccountProjects(accountId: ID | string): Promise<AccountEntity>;
}
