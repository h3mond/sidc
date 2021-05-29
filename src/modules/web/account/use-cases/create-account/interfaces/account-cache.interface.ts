import { AccountEntityProps } from '../../../../../../core/domain/entities/account.entity';

export interface AccountCacheInterface {
  code: string;
  account: AccountEntityProps;
}
