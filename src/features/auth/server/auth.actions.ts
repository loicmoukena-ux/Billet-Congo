'use server';

import { cookies } from 'next/headers';
import { authService } from '../services/auth.service';
import { redirect } from 'next/navigation';

export async function registerAction(formData: FormData) {
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;

    if (!email || !phone || !password || !fullName) {
        return { error: 'Tous les champs sont requis.' };
    }

    try {
        await authService.register(email, phone, password, fullName);
        return { success: true };
    } catch (error: any) {
        if (error.code === 'P2002') {
            return { error: 'Cet email ou numéro de téléphone est déjà utilisé.' };
        }
        return { error: 'Une erreur est survenue lors de l\'inscription.' };
    }
}

export async function adminCreateUserAction(formData: FormData) {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'ADMIN') {
        return { error: 'Action non autorisée.' };
    }

    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;
    const role = formData.get('role') as any;

    if (!email || !phone || !password || !fullName || !role) {
        return { error: 'Tous les champs sont requis.' };
    }

    try {
        await authService.register(email, phone, password, fullName, role);
        return { success: true };
    } catch (error: any) {
        if (error.code === 'P2002') {
            return { error: 'Cet email ou numéro de téléphone est déjà utilisé.' };
        }
        return { error: 'Une erreur est survenue.' };
    }
}

export async function loginAction(formData: FormData) {
    const phone = formData.get('phone') as string;
    const password = formData.get('password') as string;

    if (!phone || !password) {
        return { error: 'Numéro et mot de passe requis.' };
    }

    const session = await authService.authenticate(phone, password);

    if (!session) {
        return { error: 'Identifiants invalides.' };
    }

    // Stocker le token dans un cookie HTTP Only
    const cookieStore = await cookies();
    cookieStore.set('congo_session', session.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
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
