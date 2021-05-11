import { Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { loadAccountSymbol } from '../auth.provider';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(loadAccountSymbol)
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: any) {
    return this.authService.login(req.user);
  }
}
