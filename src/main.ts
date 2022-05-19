import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwaggerForApp } from './swagger';

bootstrap();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  initSwaggerForApp(app);

  app.useGlobalPipes(new ValidationPipe());

  const port = app.get<ConfigService>(ConfigService).get<number>('server.port');

  await app.listen(port);
}
