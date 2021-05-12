import { JwtService } from '@nestjs/jwt';
import { HashCompareProtocol } from '../../../core/common/protocols/crypto.protocol';
import { AccountEntity } from '../../../core/domain/account/entities/account.entity';
import { LoadAccountPort } from '../../../core/domain/account/ports/load-account.port';
import { AuthRequest } from '../dtos/auth-request.dto';
import { AuthResponse } from '../dtos/auth-response.dto';

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

  login(account: AccountEntity): AuthResponse {
    return {
      access_token: this.jwtService.sign({
        subId: account.id,
        email: account.email,
      }),
    };
  }
}
