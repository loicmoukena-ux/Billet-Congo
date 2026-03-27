import { Ticket } from '@/features/tickets/types';
import prisma from '@/lib/prisma';

export type ScanResult = {
    success: boolean;
    message: string;
    ticket?: Ticket & {
        eventTitle?: string;
        holderName?: string;
        ticketType?: string;
    };
};

export const scannerService = {
    async validateTicket(referenceOrQrCode: string, scannerId: string): Promise<ScanResult> {
        return new Promise(async (resolve) => {
            setTimeout(async () => {
                try {
                    // On cherche le billet avec les infos liées
                    const ticket = await prisma.ticket.findFirst({
                        where: {
                            OR: [
                                { reference: referenceOrQrCode },
                                { qrCodeData: referenceOrQrCode }
                            ]
                        },
                        include: {
                            event: { select: { title: true } },
                            user: { select: { fullName: true } },
                        }
                    }) as any;

                    if (!ticket) {
                        return resolve({ success: false, message: 'Billet introuvable ou faux billet.' });
                    }

                    const enriched = {
                        ...(ticket as any),
                        eventTitle: ticket.event?.title ?? 'Événement inconnu',
                        holderName: ticket.user?.fullName ?? 'Porteur inconnu',
                        ticketType: ticket.type ?? 'STANDARD',
                    };

                    if (ticket.status !== 'VALID') {
                        const msg = ticket.status === 'USED'
                            ? 'Ce billet a déjà été scanné et utilisé.'
                            : 'Ce billet a été annulé.';
                        await prisma.scanLog.create({
                            data: { ticketId: ticket.id, scannerId, status: 'FAILED', message: msg }
                        });
                        return resolve({ success: false, message: msg, ticket: enriched });
                    }

                    // Marquer comme utilisé
                    await prisma.ticket.update({
                        where: { id: ticket.id },
                        data: { status: 'USED', scannedAt: new Date() }
                    });

                    await prisma.scanLog.create({
                        data: { ticketId: ticket.id, scannerId, status: 'SUCCESS', message: 'Billet valide. Accès autorisé.' }
                    });

                    return resolve({
                        success: true,
                        message: 'Billet valide. Accès autorisé.',
                        ticket: { ...enriched, status: 'USED' } as any
                    });

                } catch (e) {
                    console.error("Erreur de scan", e);
                    return resolve({ success: false, message: 'Erreur interne du serveur lors du scan.' });
                }
            }, 600); // UI feel delay
        });
    }
};
