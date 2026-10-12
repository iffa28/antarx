import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy.js';

import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

import { UsersModule } from '../users/users.module.js';
import { RolesModule } from '../roles/roles.module.js';

@Module({
  imports: [
    UsersModule,
    RolesModule,

    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: (process.env.JWT_EXPIRES_IN ?? '15m') as any,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],  
})
export class AuthModule {}