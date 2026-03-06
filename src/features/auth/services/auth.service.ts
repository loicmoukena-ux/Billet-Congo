import { User, AuthSession } from '../types';

// Utilisation de globalThis pour persister la mémoire entre 
// les Server Actions et les Server Components en Next.js (Dev Mode)
const globalForAuth = globalThis as unknown as {
    mockUsers: User[];
};

if (!globalForAuth.mockUsers) {
    globalForAuth.mockUsers = [
        {
            id: 'usr-admin-1',
            email: 'admin@congotickets.com',
            phoneNumber: '061234567',
            fullName: 'Admin CongoTickets',
            role: 'ADMIN',
            createdAt: new Date().toISOString(),
        },
        {
            id: 'usr-client-1',
            email: 'client@example.com',
            phoneNumber: '059876543',
            fullName: 'Jean Client',
            role: 'USER',
            createdAt: new Date().toISOString(),
        }
    ];
}

const mockUsers = globalForAuth.mockUsers;

export const authService = {
    async authenticate(phoneNumber: string, pin: string): Promise<AuthSession | null> {
        // Dans ce mock, tant que le pin fait 4 chiffres, on accepte
        return new Promise((resolve) => {
            setTimeout(() => {
                const user = mockUsers.find(u => u.phoneNumber === phoneNumber);

                if (user && pin.length >= 4) {
                    resolve({
                        user,
                        token: `mock-jwt-token-${user.id}-${Date.now()}`
                    });
                } else {
                    // Création à la volée d'un USER si non trouvé pour fluidifier le test
                    if (pin.length >= 4) {
                        const newUser: User = {
                            id: `usr-new-${Date.now()}`,
                            email: `user${Date.now()}@example.com`,
                            phoneNumber,
                            fullName: `User ${phoneNumber}`,
                            role: 'USER',
                            createdAt: new Date().toISOString(),
                        };
                        mockUsers.push(newUser);
                        resolve({
                            user: newUser,
                            token: `mock-jwt-token-${newUser.id}-${Date.now()}`
                        });
                    } else {
                        resolve(null);
                    }
                }
            }, 1000);
        });
    },

    async getSessionByToken(token: string): Promise<AuthSession | null> {
        // Récupérer l'utilisateur d'après un token mock (ex: mock-jwt-token-USR_ID-1234)
        return new Promise((resolve) => {
            setTimeout(() => {
                if (!token) return resolve(null);
                const parts = token.split('-');
                const userId = parts.slice(3, -1).join('-'); // re-construct usr-admin-1
                const user = mockUsers.find(u => u.id === userId) || mockUsers[1]; // Fallback au client mock par défaut

                if (user) {
                    resolve({ user, token });
                } else {
                    resolve(null);
                }
            }, 200);
        });
    }
};
