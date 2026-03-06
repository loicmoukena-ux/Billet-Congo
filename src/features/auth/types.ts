export type UserRole = 'USER' | 'ADMIN' | 'SCANNER';

export interface User {
    id: string;
    email: string;
    phoneNumber: string;
    fullName: string;
    role: UserRole;
    createdAt: string;
}

export interface AuthSession {
    user: User;
    token: string;
}
