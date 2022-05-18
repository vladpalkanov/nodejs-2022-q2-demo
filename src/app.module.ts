import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'demo.sqlite',
      synchronize: process.env.NODE_ENV !== 'production',
      entities: [__dirname + '/**/*.entity.ts'],
      autoLoadEntities: true,
    }),
  ],
})
export class AppModule {}
