import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

import {UsersService} from '../users/users.service.js';
import { RolesService } from '../roles/roles.service.js';
import { PasswordService } from '../security/password.service.js';
import { RegisterDto } from './dto/register.dto.js';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly rolesService: RolesService,
        private readonly passwordService: PasswordService
    ) { }
    
    async register(dto: RegisterDto) {
        const email = dto.email.trim().toLowerCase();
        const hp = dto.hp.trim();
        
        const existingUser = await this.usersService.findByIdentifier(email) || await this.usersService.findByIdentifier(hp);
        if (existingUser) {
            throw new ConflictException(
                'Email atau nomor HP sudah terdaftar',

            );
        }

        const role = await this.rolesService.findByName('CUSTOMER');
        if (!role) {
            throw new InternalServerErrorException('Role Customer tidak ditemukan');
        }

        const passwordHash = await this.passwordService.hash(dto.password);

        const user = await this.usersService.create({
            name: dto.name.trim(),
            email,
            hp,
            password: passwordHash,
            roleId: role.id,
        });

        return {
            message: 'Registrasi berhasil',
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                hp: user.hp,
                role: user.roleId
            }
        }
    }

    async login(identifier: string, password: string) {
        const normalizedIdentifier = identifier.trim().toLowerCase();

        const user = await this.usersService.findByIdentifier(normalizedIdentifier);
        if (!user) {
            throw new UnauthorizedException('Email/nomor HP atau password salah');
        }

        const isPasswordValid = await this.passwordService.verify(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Email/nomor HP atau password salah');
        }


        // return pesan berhasil login beserta data user

        return {
            message: 'Login berhasil',
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                hp: user.hp,
                role: user.role.name,
            },
        }
    }
}
