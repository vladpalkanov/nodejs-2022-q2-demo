import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'better-sqlite3',
          database: configService.get<string>('database.sqlite.database'),
          synchronize: process.env.NODE_ENV !== 'production',
          entities: [__dirname + '/**/*.entity.ts'],
          autoLoadEntities: true,
          logging: true,
        };
      },
    }),
  ],
})
export class OrmModule {}
