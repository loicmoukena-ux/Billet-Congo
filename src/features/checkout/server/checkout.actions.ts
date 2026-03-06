'use server';

import { paymentService } from '../services/payment.service';
import { getCurrentUser } from '@/features/auth/server/auth.actions';
import { redirect } from 'next/navigation';

export async function processMobileMoneyPaymentAction(formData: FormData): Promise<void> {
    const sessionId = formData.get('sessionId') as string;
    const phone = formData.get('phone') as string;
    const provider = formData.get('provider') as 'MTN' | 'AIRTEL';

    const user = await getCurrentUser();
    if (!user) {
        throw new Error('Vous devez être connecté.');
    }

    if (!phone || !provider) {
        throw new Error('Veuillez renseigner un numéro de téléphone valide.');
    }

    let redirectUrl = '';

    // Simuler l'appel à l'API de paiement
    try {
        const response = await paymentService.processMobileMoneyPayment(sessionId, phone, provider);

        if (response.success && response.tickets && response.tickets.length > 0) {
            // Redirection après succès vers le QR Billet (on prend le premier ticket ou la liste)
            // Pour ce MVP, on redirige vers le détail du ticket 1 s'il n'y en a qu'un, ou vers /account s'il y en a plusieurs
            if (response.tickets.length === 1) {
                redirectUrl = `/account/ticket/${response.tickets[0].id}`;
            } else {
                redirectUrl = `/account?success=true`;
            }
        } else {
            throw new Error('Le paiement a échoué ou a expiré.');
        }
    } catch (err) {
        throw new Error('Une erreur serveur est survenue.');
    }

    // Effectuer la redirection en dehors du try/catch
    if (redirectUrl) {
        redirect(redirectUrl);
    }
}
