import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateAccountCommand } from '../../../../core/domain/account/use-cases/create-account.command';
import { CreateAccountService } from '../../../../core/services/account/create-account.service';
import { routes } from '../../../../infra/configs/app.routes';
import { createAccountSymbol } from '../../account.provider';
import { CreateAccountRequest } from './create-account.request.dto';

@ApiTags('Account')
@Controller()
export class CreateAccountController {
  constructor(
    @Inject(createAccountSymbol)
    private readonly createAccountService: CreateAccountService,
  ) {}

  @Post(routes.account.create)
  @ApiOperation({
    summary: 'Create account.',
  })
  @ApiCreatedResponse({
    description: 'Account was successfully cretaed.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User email already taken.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  async createAccount(@Body() body: CreateAccountRequest) {
    const command = new CreateAccountCommand({
      name: body.name,
      surname: body.surname,
      email: body.email,
      password: body.password,
    });
    const result = await this.createAccountService.createAccount(command);
    if (!result) {
      throw new HttpException(
        'Could not create account',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
