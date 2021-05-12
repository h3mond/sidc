import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AccountEntity } from '../../../core/domain/account/entities/account.entity';
import { AuthService } from '../services/auth.service';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<AccountEntity> {
    const account = await this.authService.validateAccount({ email, password });
    if (!account) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return account;
  }
}
