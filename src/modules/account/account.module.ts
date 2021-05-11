import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  bcryptServiceProvider,
  bcryptServiceSymbol,
  createAccountProvider,
} from './account.provider';
import { AccountOrmEntity } from './database/account.orm-entity';
import { AccountRepository } from './database/account.repository';
import { AccountController } from './web/account.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AccountOrmEntity])],
  controllers: [AccountController],
  providers: [AccountRepository, createAccountProvider, bcryptServiceProvider],
  exports: [AccountRepository, bcryptServiceSymbol],
})
export class AccountModule {}
