'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { registerAction } from '@/features/auth/server/auth.actions';

export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const result = await registerAction(formData);

        if (result.error) {
            setError(result.error);
            setIsLoading(false);
        } else {
            router.push('/auth/login?registered=true');
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[80vh] py-12 px-4">
            <Card className="w-full max-w-md p-8 shadow-sm border border-neutral-200 bg-white">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2 text-neutral-900">Créer un compte</h1>
                    <p className="text-neutral-600">Rejoignez Billet-Congo dès aujourd&apos;hui</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-neutral-700">Nom complet</label>
                        <input
                            type="text"
                            name="fullName"
                            required
                            placeholder="Ex: John Doe"
                            className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-neutral-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="Ex: john@example.com"
                            className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-sm"
                        />
                    </div>

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
                            minLength={6}
                            className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-sm"
                        />
                    </div>

                    <Button type="submit" fullWidth size="lg" disabled={isLoading} className="mt-4">
                        {isLoading ? 'Création...' : 'S\'inscrire'}
                    </Button>

                    <p className="text-center text-sm text-neutral-600 pt-4">
                        Déjà un compte ?{' '}
                        <Link href="/auth/login" className="text-primary-600 hover:text-primary-700 font-medium">
                            Se connecter
                        </Link>
                    </p>
                </form>
            </Card>
        </div>
    );
}
