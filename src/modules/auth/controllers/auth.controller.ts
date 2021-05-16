import { Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { loadAccountSymbol } from '../auth.provider';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { routes } from '../../../infra/configs/app.routes';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Account } from '../decorators/account.decorator';
import { AuthResponse } from '../dtos/auth-response.dto';
import { AuthRequest } from '../dtos/auth-request.dto';
import { AccountIdentity } from '../passport/types';

@ApiTags('Auth')
@Controller()
@UseGuards(LocalAuthGuard)
@ApiForbiddenResponse()
@ApiBadRequestResponse()
@ApiUnauthorizedResponse()
export class AuthController {
  constructor(
    @Inject(loadAccountSymbol)
    private readonly authService: AuthService,
  ) {}

  @Post(routes.auth.login)
  @ApiBody({ type: AuthRequest })
  @ApiCreatedResponse({ type: AuthResponse })
  login(@Account() account: AccountIdentity) {
    return this.authService.login(account);
  }
}
