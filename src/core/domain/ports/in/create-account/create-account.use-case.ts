import { ID } from '../../../../shared/value-objects/id.value-object';
import { CreateAccountCommand } from './create-account.command';

export interface CreateAccountUseCase {
  createAccount(command: CreateAccountCommand): Promise<ID>;
}
