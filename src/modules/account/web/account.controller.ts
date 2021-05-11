import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { AccountEntityProps } from '../../../core/domain/account/entities/account.entity';
import { CreateAccountCommand } from '../../../core/domain/account/use-cases/create-account.command';
import { CreateAccountService } from '../../../core/services/account/create-account.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { createAccountSymbol } from '../account.provider';

@Controller('account')
export class AccountController {
  constructor(
    @Inject(createAccountSymbol)
    private readonly createAccountService: CreateAccountService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  indexAction(@Req() req: any): void {
    console.log('JWT', req.user);
  }

  @Post('create')
  async createAccountAction(@Body() account: AccountEntityProps) {
    const command = new CreateAccountCommand(account);
    return { result: await this.createAccountService.createAccount(command) };
  }
}

// curl -X POST http://localhost:3000/account/create -d '{ "name": "John", "surname": "Smith", "email": "john@mail.kz", "password": "password" }' -H 'Content-Type: application/json'
// curl -X POST http://localhost:3000/auth/login -d '{ "email": "john@mail.ru", "password": "password" }' -H 'Content-Type: application/json'
// curl -X POST http://localhost:3000/auth/login -d '{ "email": "john@mail.kz", "password": "password" }' -H 'Content-Type: application/json'
// curl -X POST http://localhost:3000/auth/login -d '{ "email": "john@mail.kz", "password": "password" }' -H 'Content-Type: application/json'
// curl -X POST http://localhost:3000/account -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJJZCI6eyJwcm9wcyI6eyJ2YWx1ZSI6ImJhOTI4YjIzLTc4Y2ItNDhkYy05ZTI0LTYwYmZjZjY0NjZkMSJ9fSwiZW1haWwiOiJqb2huQG1haWwua3oiLCJpYXQiOjE2MjA3MTEzMTIsImV4cCI6MTYyMDcxNDkxMn0.GIwYahR7kSp5n7YpDd9rhE9P8cDwJuFHttfDr136G2E'
