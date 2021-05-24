import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ID } from '../../../../core/shared/value-objects/id.value-object';
import { AccountIdentity, JwtPayload } from './types';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly secret: string) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload): Promise<AccountIdentity> {
    return { id: new ID(payload.subId), email: payload.email };
  }
}
