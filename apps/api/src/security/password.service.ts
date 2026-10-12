import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordService {
    async hash(password: string): Promise<string> {
        return argon2.hash(password); 
    }

    async verify(
        password: string,
        passwordHash: string,
    ): Promise<boolean> {  // promise boolean untuk mengembalikan nilai true atau false
        return argon2.verify(passwordHash, password);
    }
}