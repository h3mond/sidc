import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateAccountCommand } from '../../../../../core/domain/ports/in/create-account/create-account.command';
import { routes } from '../../../../../infra/configs/app.routes';
import { CreateAccountSymbol } from '../../account.provider';
import { CreateAccountRequest } from '../../dtos/create-account.request.dto';
import { CreateAccountResponse } from '../../dtos/create-account.response.dto';
import { VerifyAccountRequest } from '../../dtos/verify-account.request.dto';

import { CreateAccountService } from './create-account.service';

@ApiTags('Account')
@Controller()
@ApiCreatedResponse()
@ApiConflictResponse()
@ApiBadRequestResponse()
export class CreateAccountController {
  constructor(
    @Inject(CreateAccountSymbol)
    private readonly createAccountService: CreateAccountService,
  ) {}

  @Post(routes.account.verify)
  @ApiOperation({ summary: 'Verifies account' })
  @ApiForbiddenResponse()
  async verifyAccount(@Body() body: VerifyAccountRequest) {
    await this.createAccountService.verifyAccount(body.key, body.code);
  }

  @Post(routes.account.create)
  @ApiOperation({ summary: 'Create account.' })
  async createAccount(
    @Body() body: CreateAccountRequest,
  ): Promise<CreateAccountResponse> {
    const command = new CreateAccountCommand({
      name: body.name,
      surname: body.surname,
      email: body.email,
      password: body.password,
    });
    const key = await this.createAccountService.createAccount(command);
    if (!key) {
      throw new HttpException(
        'Could not create account',
        HttpStatus.BAD_REQUEST,
      );
    }
    const response = new CreateAccountResponse();
    response.key = key.value;
    return response;
  }
}
