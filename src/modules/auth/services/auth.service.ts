import { JwtService } from '@nestjs/jwt';
import { HashCompareProtocol } from '../../../core/shared/protocols/crypto.protocol';
import { LoadAccountPort } from '../../../core/domain/account/ports/load-account.port';
import { AuthRequest } from '../dtos/auth-request.dto';
import { AuthResponse } from '../dtos/auth-response.dto';
import { AccountEntity } from '../../../core/domain/account/entity/account.entity';
import { AccountIdentity } from '../passport/types';

export class AuthService {
  constructor(
    private readonly loadAccountPort: LoadAccountPort,
    private readonly jwtService: JwtService,
    private readonly bcryptServiceAdapter: HashCompareProtocol,
  ) {}

  async validateAccount({
    email,
    password,
  }: AuthRequest): Promise<AccountEntity> {
    const account = await this.loadAccountPort.loadAccount({
      email,
    });
    if (
      account &&
      (await this.bcryptServiceAdapter.compare(password, account.password))
    ) {
      account.password = null;
      return account;
    }
    return null;
  }

  login(account: AccountIdentity): AuthResponse {
    return {
      access_token: this.jwtService.sign({
        subId: account.id.value,
        email: account.email,
      }),
    };
  }
}
