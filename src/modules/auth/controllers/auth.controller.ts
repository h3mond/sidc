import { Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { loadAccountSymbol } from '../auth.provider';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { routes } from '../../../infra/configs/app.routes';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Account } from '../decorators/account.decorator';
import { AccountEntity } from '../../../core/domain/account/entities/account.entity';
import { AuthResponse } from '../dtos/auth-response.dto';
import { AuthRequest } from '../dtos/auth-request.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    @Inject(loadAccountSymbol)
    private readonly authService: AuthService,
  ) {}

  @Post(routes.auth.login)
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: AuthRequest })
  @ApiOperation({ summary: 'User authentication' })
  @ApiCreatedResponse({
    type: AuthResponse,
    description: 'Creates JWT token.',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  login(@Account() account: AccountEntity): AuthResponse {
    return this.authService.login(account);
  }
}
