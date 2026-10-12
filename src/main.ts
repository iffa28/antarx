import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,  // untuk menghapus properti yang tidak ada di DTO
      forbidNonWhitelisted: true,   // untuk menolak properti yang tidak ada di DTO
      transform: true,  // untuk mengubah tipe data input menjadi tipe data yang sesuai dengan DTO
    })
  )
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
