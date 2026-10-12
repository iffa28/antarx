import { Global, Module } from '@nestjs/common';
import { PasswordService } from './password.service.js';

@Global()    // menandakan bahwa PasswordService akan tersedia secara global di seluruh aplikasi NestJS, sehingga tidak perlu mengimpor SecurityModule di setiap modul yang membutuhkan PasswordService.
@Module({
  providers: [PasswordService],
  exports: [PasswordService],
})
export class SecurityModule {}
