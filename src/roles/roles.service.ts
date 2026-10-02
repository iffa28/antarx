import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class RolesService {
    constructor(private readonly prisma: PrismaService) { }
    
    async findByName(name: string) {
        return this.prisma.role.findUnique({
            where: {
                name,
            },
        });
    }
 }

