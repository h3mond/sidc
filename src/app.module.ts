import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmOptions } from './infra/configs/typeorm.config';
import { AccountModule } from './modules/web/account/account.module';
import { PersistenceModule } from './modules/persistence/persistence.module';
import { AuthModule } from './modules/web/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeOrmOptions,
      entities: ['dist/**/*.orm-entity{.ts,*.js}'],
      migrations: ['dist/**/migrations/*{.ts,*.js}'],
    }),
    PersistenceModule,
    AccountModule,
    AuthModule,
  ],
  providers: [PersistenceModule],
})
export class AppModule {}
