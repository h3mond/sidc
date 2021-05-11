import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmOptions } from './infra/configs/typeorm.config';
import { AccountModule } from './modules/account/account.module';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeOrmOptions,
      migrationsRun: true,
      entities: [join(__dirname, '../dist/', '**', '*.orm-entity.js')],
      migrations: [join(__dirname, '../dist/', '**', '/migrations/*.js')],
    }),
    AccountModule,
    AuthModule,
  ],
  providers: [AccountModule],
})
export class AppModule {}
