import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { UsersModule } from '../users/users.module.js';
import { RolesModule } from '../roles/roles.module.js';

@Module({
  imports: [
    UsersModule,
    RolesModule
  ],
  controllers: [AuthController],
  providers: [AuthService]   
})
export class AuthModule {}
