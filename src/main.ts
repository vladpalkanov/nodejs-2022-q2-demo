import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwaggerForApp } from './swagger';

bootstrap();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  initSwaggerForApp(app);

  await app.listen(3000);
}
