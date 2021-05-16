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
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateAccountCommand } from '../../../../../core/domain/ports/in/create-account/create-account.command';
import { CreateAccountService } from '../../../../../core/services/account/create-account.service';
import { routes } from '../../../../../infra/configs/app.routes';
import { CreateAccountSymbol } from '../../account.provider';
import { CreateAccountRequest } from '../../dtos/create-account.request.dto';

@ApiTags('Account')
@Controller()
export class CreateAccountController {
  constructor(
    @Inject(CreateAccountSymbol)
    private readonly createAccountService: CreateAccountService,
  ) {}

  @Post(routes.account.create)
  @ApiOperation({ summary: 'Create account.' })
  @ApiCreatedResponse()
  @ApiConflictResponse()
  @ApiBadRequestResponse()
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
