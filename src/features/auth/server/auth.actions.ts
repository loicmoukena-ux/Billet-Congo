'use server';

import { cookies } from 'next/headers';
import { authService } from '../services/auth.service';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
    const phone = formData.get('phone') as string;
    const pin = formData.get('pin') as string;

    if (!phone || !pin) {
        return { error: 'Numéro et code PIN requis.' };
    }

    const session = await authService.authenticate(phone, pin);

    if (!session) {
        return { error: 'Identifiants invalides.' };
    }

    // Stocker le token dans un cookie HTTP Only
    const cookieStore = await cookies();
    cookieStore.set('congo_session', session.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 semaine
        path: '/',
    });

    return { success: true, role: session.user.role };
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('congo_session');
    redirect('/auth/login');
}

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get('congo_session')?.value;

    if (!token) {
        return null;
    }

    const session = await authService.getSessionByToken(token);
    return session?.user || null;
}
