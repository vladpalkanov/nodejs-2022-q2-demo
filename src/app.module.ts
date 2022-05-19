import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OrmModule } from './orm/orm.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule, OrmModule, UsersModule, AuthModule],
})
export class AppModule {}
