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
            const userRole = result.role?.toUpperCase();
            if (userRole === 'ADMIN') {
                router.push('/admin/dashboard');
            } else if (userRole === 'PROMOTER') {
                router.push('/organisateur/dashboard');
            } else if (userRole === 'SCANNER') {
                router.push('/scanner');
            } else {
                router.push('/account');
            }
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[80vh] py-12 px-4">
            <Card className="w-full max-w-md p-8 shadow-sm border border-neutral-200 bg-white">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2 text-neutral-900">Bon retour</h1>
                    <p className="text-neutral-600">Connectez-vous pour accéder à vos billets</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-6 text-sm">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 p-4 rounded-xl mb-6 text-sm">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-neutral-700">Numéro de téléphone</label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="Ex: 06 123 45 67"
                            className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-neutral-700">Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="••••••••"
                            className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-sm"
                        />
                    </div>

                    <Button type="submit" fullWidth size="lg" disabled={isLoading} className="mt-4">
                        {isLoading ? 'Connexion...' : 'Se connecter'}
                    </Button>

                    <p className="text-center text-sm text-neutral-600 pt-4">
                        Pas encore de compte ?{' '}
                        <Link href="/auth/register" className="text-primary-600 hover:text-primary-700 font-medium">
                            S&apos;inscrire
                        </Link>
                    </p>

                    <div className="relative mt-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-neutral-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-neutral-500">Ou</span>
                        </div>
                    </div>

                    <Button 
                        type="submit" 
                        formAction={redirectToFirstEventCheckout}
                        variant="outline" 
                        fullWidth 
                        className="border-neutral-200 text-neutral-700 hover:bg-neutral-50"
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
            <div className="flex items-center justify-center min-h-[80vh] py-12 px-4">
                <Card className="w-full max-w-md p-8 shadow-sm border border-neutral-200 bg-white text-center">
                    <p className="text-neutral-600 animate-pulse">Chargement...</p>
                </Card>
            </div>
        }>
            <LoginForm />
        </Suspense>
    );
}
