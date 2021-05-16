import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmOptions } from './infra/configs/typeorm.config';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectModule } from './modules/project/project.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeOrmOptions,
      entities: ['dist/**/*.orm-entity{.ts,*.js}'],
      migrations: ['dist/**/migrations/*{.ts,*.js}'],
    }),
    AccountModule,
    ProjectModule,
    AuthModule,
  ],
  providers: [AccountModule],
})
export class AppModule {}
