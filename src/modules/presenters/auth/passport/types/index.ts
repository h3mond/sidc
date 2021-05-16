import { ID } from '../../../../../core/shared/value-objects/id.value-object';

export interface JwtPayload {
  subId: string;
  email: string;
}

export interface AccountIdentity {
  id: ID;
  email: string;
}
