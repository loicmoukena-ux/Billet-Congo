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
        <div className="min-h-screen flex items-center justify-center -mt-16 px-4">
            <Card className="w-full max-w-md p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Créer un compte</h1>
                    <p className="text-neutral-400">Rejoignez Billet-Congo dès aujourd&apos;hui</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-neutral-300">Nom complet</label>
                        <input
                            type="text"
                            name="fullName"
                            required
                            placeholder="Ex: John Doe"
                            className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-neutral-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="Ex: john@example.com"
                            className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                    </div>

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
                            minLength={6}
                            className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <Button type="submit" fullWidth size="lg" disabled={isLoading} className="mt-4">
                        {isLoading ? 'Création...' : 'S\'inscrire'}
                    </Button>

                    <p className="text-center text-sm text-neutral-400 pt-4">
                        Déjà un compte ?{' '}
                        <Link href="/auth/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                            Se connecter
                        </Link>
                    </p>
                </form>
            </Card>
        </div>
    );
}
