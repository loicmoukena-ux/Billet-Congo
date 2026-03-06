import { Ticket, CheckoutSession } from '../../tickets/types';

// Utilisation de globalThis pour persister la DB Mock (Dev Mode Next.js)
const globalForPayment = globalThis as unknown as {
    mockTickets: Ticket[];
    mockSessions: CheckoutSession[];
};

if (!globalForPayment.mockTickets) globalForPayment.mockTickets = [];
if (!globalForPayment.mockSessions) globalForPayment.mockSessions = [];

const mockTickets = globalForPayment.mockTickets;
const mockSessions = globalForPayment.mockSessions;

export const paymentService = {
    async initCheckout(eventId: string, userId: string, quantity: number, pricePerUnit: number): Promise<CheckoutSession> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const session: CheckoutSession = {
                    id: `chk-${Date.now()}`,
                    eventId,
                    userId,
                    quantity,
                    totalPrice: quantity * pricePerUnit,
                    status: 'AWAITING_PAYMENT',
                    expiresAt: new Date(Date.now() + 15 * 60000).toISOString(), // Expire dans 15 min
                };
                mockSessions.push(session);
                resolve(session);
            }, 500);
        });
    },

    async processMobileMoneyPayment(sessionId: string, phoneNumber: string, provider: 'MTN' | 'AIRTEL'): Promise<{ success: boolean; tickets?: Ticket[] }> {
        return new Promise((resolve) => {
            // Simule un délai de traitement USSD (prompt reçu par l'utilisateur sur son tel)
            setTimeout(() => {
                const session = mockSessions.find(s => s.id === sessionId);

                if (!session) {
                    resolve({ success: false });
                    return;
                }

                session.status = 'COMPLETED';

                // Générer les tickets
                const newTickets: Ticket[] = Array.from({ length: session.quantity }).map((_, i) => ({
                    id: `tkt-${Date.now()}-${i}`,
                    reference: `TKT-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
                    eventId: session.eventId,
                    userId: session.userId,
                    purchaseDate: new Date().toISOString(),
                    pricePaid: session.totalPrice / session.quantity,
                    status: 'PAID',
                    qrCodeData: `qr-payload-${session.eventId}-${session.userId}-${Date.now()}-${i}`
                }));

                mockTickets.push(...newTickets);

                resolve({ success: true, tickets: newTickets });
            }, 2500);
        });
    },

    async getUserTickets(userId: string): Promise<Ticket[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockTickets.filter(t => t.userId === userId));
            }, 300);
        });
    }
};
