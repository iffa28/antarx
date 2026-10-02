import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}
        
        async findById(id: string) {
            return this.prisma.user.findUnique({
                where: {
                    id,
                },
                include: {
                    role: true,
                },
            });
        }

        async findByIdentifier(identifier: string) {
            return this.prisma.user.findFirst({     // pemakaian findFirst untuk mencari user berdasarkan email atau hp
                where: {
                    OR: [
                        {
                            email: identifier,
                        },
                        {
                            hp: identifier,
                        },
                    ],
                },
                include: {
                    role: true,

                },
            });
    }
    async create(data: {
        name: string;
        email: string;
        hp: string;
        password: string;
        roleId: string;

    }) {
        return this.prisma.user.create({
            data,
        });
    }

    
}
