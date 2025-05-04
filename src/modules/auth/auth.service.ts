import { User } from '../user/user.model';
import { sign } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { AuthInterface } from './auth.interface';
import { JWT_SECRET } from '../../env/index';

export class AuthService {
    async register(userData: AuthInterface): Promise<User> {
        const user = new User(userData);
        return await user.save();
    }

    async login(email: string, password: string): Promise<string | null> {
        const user = await User.findOne({ email });
        if (user && user.comparePassword(password)) {
            return this.generateToken(user);
        }
        return null;
    }

    private generateToken(user: User): string {
        const payload = { id: user._id, email: user.email };
        return sign(payload, JWT_SECRET, { expiresIn: '1h' });
    }
}