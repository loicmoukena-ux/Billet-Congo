'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { loginAction } from '@/features/auth/server/auth.actions';
import { redirectToFirstEventCheckout } from '@/features/checkout/server/checkout.actions';
import { Button } from '@/shared/components/ui/Button';
import { Card } from '@/shared/components/ui/Card';

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const errorParam = searchParams.get('error');
        if (errorParam === 'not_organizer') {
            setError('Désolé, vous n\'êtes pas un organisateur. Veuillez vous connecter avec un compte approprié.');
        } else if (errorParam === 'not_authorized') {
            setError('Vous n\'êtes pas autorisé à accéder à cette zone.');
        } else if (errorParam === 'not_scanner') {
            setError('Désolé, vous n\'avez pas les droits d\'accès au mode scanner.');
        }

        if (searchParams.get('registered')) {
            setSuccess('Compte créé avec succès. Vous pouvez maintenant vous connecter.');
        }
    }, [searchParams]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const result = await loginAction(formData) as { error?: string, success?: boolean, role?: string };

        if (result.error) {
            setError(result.error);
            setIsLoading(false);
        } else if (result.success) {
            if (result.role === 'ADMIN') {
                router.push('/admin/dashboard');
            } else {
                router.push('/account');
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center -mt-16 px-4">
            <Card className="w-full max-w-md p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Bon retour</h1>
                    <p className="text-neutral-400">Connectez-vous pour accéder à vos billets</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl mb-6 text-sm">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-neutral-300">Numéro de téléphone</label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="Ex: 06 123 45 67"
                            className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-neutral-300">Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="••••••••"
                            className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <Button type="submit" fullWidth size="lg" disabled={isLoading} className="mt-4">
                        {isLoading ? 'Connexion...' : 'Se connecter'}
                    </Button>

                    <p className="text-center text-sm text-neutral-400 pt-4">
                        Pas encore de compte ?{' '}
                        <Link href="/auth/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
                            S&apos;inscrire
                        </Link>
                    </p>

                    <div className="relative mt-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-neutral-950 px-2 text-neutral-500">Ou</span>
                        </div>
                    </div>

                    <Button 
                        type="submit" 
                        formAction={redirectToFirstEventCheckout}
                        variant="outline" 
                        fullWidth 
                        className="border-neutral-700 text-neutral-300 hover:bg-neutral-800"
                    >
                        Continuer sans compte
                    </Button>
                </form>
            </Card>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center -mt-16 px-4">
                <Card className="w-full max-w-md p-8 shadow-2xl text-center">
                    <p className="text-neutral-400 animate-pulse">Chargement...</p>
                </Card>
            </div>
        }>
            <LoginForm />
        </Suspense>
    );
}
