import { JwtService } from '@nestjs/jwt';
import { HashCompareProtocol } from '../../../../core/shared/protocols/crypto.protocol';
import { AuthRequest } from '../dtos/auth-request.dto';
import { AuthResponse } from '../dtos/auth-response.dto';
import { AccountEntity } from '../../../../core/domain/entities/account.entity';
import { AccountIdentity } from '../passport/types';
import { LoadAccountPort } from '../../../../core/domain/ports/out/account/load-account.port';
import { Injectable } from '@nestjs/common';

@Injectable()
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
    const account = await this.loadAccountPort.loadAccountByEmail(email);
    if (
      account &&
      (await this.bcryptServiceAdapter.compare(password, account.password))
    ) {
      account.password = undefined;
      return account;
    }
    return undefined;
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
