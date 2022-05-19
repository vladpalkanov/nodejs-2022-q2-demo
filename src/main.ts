import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { initSwaggerForApp } from './swagger';

bootstrap();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  initSwaggerForApp(app);

  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(Logger));

  const port = app.get<ConfigService>(ConfigService).get<number>('server.port');

  await app.listen(port);
}
