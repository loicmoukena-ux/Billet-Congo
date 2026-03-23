import React from 'react';
import { getCurrentUser, adminCreateUserAction } from '@/features/auth/server/auth.actions';
import { redirect } from 'next/navigation';
import { Card } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import Link from 'next/link';

export default async function AdminUsersPage() {
    const user = await getCurrentUser();

    if (!user || user.role !== 'ADMIN') {
        redirect('/auth/login');
    }

    return (
        <div className="container mx-auto px-4 py-16 max-w-2xl">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Gestion des Utilisateurs</h1>
                    <p className="text-neutral-400">Créer des comptes Organisateur, Scanner ou Admin</p>
                </div>
                <Link href="/admin/dashboard">
                    <Button variant="outline">Retour au Dashboard</Button>
                </Link>
            </div>

            <Card className="p-8 shadow-2xl">
                <form 
                    action={async (formData) => {
                        'use server';
                        await adminCreateUserAction(formData);
                    }} 
                    className="space-y-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-neutral-300">Nom complet</label>
                            <input
                                type="text"
                                name="fullName"
                                required
                                placeholder="Ex: Jean Dupont"
                                className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-neutral-300">Rôle</label>
                            <select
                                name="role"
                                required
                                className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            >
                                <option value="PROMOTER">Organisateur (PROMOTER)</option>
                                <option value="SCANNER">Scanner (Entrée)</option>
                                <option value="ADMIN">Administrateur</option>
                                <option value="CLIENT">Client</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-neutral-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="email@exemple.com"
                            className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-neutral-300">Numéro de téléphone</label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="06 123 45 67"
                            className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-neutral-300">Mot de passe provisoire</label>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="••••••••"
                            className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>

                    <div className="pt-4">
                        <Button type="submit" fullWidth size="lg">
                            Créer l&apos;utilisateur
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
