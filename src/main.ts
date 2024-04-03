import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000, function () {
    console.log(`
    🚀  Server is running!
    📭  Query at PORT 3000
    `);
  });
}
bootstrap();
