import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { configFactory } from './config.factory';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [configFactory],
    }),
  ],
})
export class ConfigModule {}
