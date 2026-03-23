import { User, AuthSession, UserRole } from '../types';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import * as jose from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'fallback-secret-for-dev-only'
);

export const authService = {
    async register(email: string, phoneNumber: string, password: string, fullName: string, role: UserRole = 'CLIENT'): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Si c'est le tout premier utilisateur, on le nomme ADMIN (pour facilitation du dev)
        const userCount = await prisma.user.count();
        const finalRole = userCount === 0 ? 'ADMIN' : role;

        const user = await prisma.user.create({
            data: {
                email,
                phoneNumber,
                password: hashedPassword,
                fullName,
                role: finalRole,
            } as any
        });

        return user as unknown as User;
    },

    async createSession(user: User): Promise<AuthSession> {
        const token = await new jose.SignJWT({ 
            userId: user.id, 
            email: user.email,
            role: user.role 
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(JWT_SECRET);

        return {
            user: user as unknown as User,
            token
        };
    },

    async authenticate(phoneNumber: string, password: string): Promise<AuthSession | null> {
        const user = await prisma.user.findUnique({
            where: { phoneNumber }
        });

        if (!user || !(user as any).password) return null;

        const isPasswordValid = await bcrypt.compare(password, (user as any).password);
        if (!isPasswordValid) return null;

        return this.createSession(user as unknown as User);
    },

    async getSessionByToken(token: string): Promise<AuthSession | null> {
        if (!token) return null;

        try {
            const { payload } = await jose.jwtVerify(token, JWT_SECRET);
            const userId = payload.userId as string;

            const user = await prisma.user.findUnique({
                where: { id: userId }
            });

            if (user) {
                return { user: user as unknown as User, token };
            }
        } catch (error) {
            // Silently handle invalid tokens (e.g. from old mock sessions)
            return null;
        }

        return null;
    }
};
