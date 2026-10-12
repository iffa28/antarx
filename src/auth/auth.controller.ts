import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';

import type { Request } from 'express';

import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

import { JwtAuthGuard } from './guards/jwt-auth.guard.js';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,

    ) { }
    
    @Post('register')
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto.identifier, dto.password);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@Req() request: Request) {
        return request.user;
    }
 }

