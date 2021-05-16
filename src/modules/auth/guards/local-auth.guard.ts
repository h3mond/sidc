import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { isEmail, isNotEmpty } from 'class-validator';
import { AuthRequest } from '../dtos/auth-request.dto';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (!isEmail(request.body.email) || !isNotEmpty(request.body.password))
      return false;

    return super.canActivate(context);
  }
}
