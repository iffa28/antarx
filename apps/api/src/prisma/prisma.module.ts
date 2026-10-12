import {Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Global()   // menandakan bahwa PrismaService akan tersedia secara global di seluruh aplikasi NestJS, sehingga tidak perlu mengimpor PrismaModule di setiap modul yang membutuhkan PrismaService.
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
