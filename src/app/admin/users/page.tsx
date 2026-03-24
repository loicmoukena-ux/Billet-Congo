import React from 'react';
import { getCurrentUser, adminCreateUserAction, adminUpdateUserAction, adminDeleteUserAction } from '@/features/auth/server/auth.actions';
import { authService } from '@/features/auth/services/auth.service';
import { redirect } from 'next/navigation';
import { Card } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import Link from 'next/link';

export default async function AdminUsersPage({ searchParams }: { searchParams: Promise<{ edit?: string, add?: string }> }) {
    const user = await getCurrentUser();
    const resolvedSearchParams = await searchParams;

    if (!user || user.role !== 'ADMIN') {
        redirect('/auth/login');
    }

    const users = await authService.getUsers();
    const editingUserId = resolvedSearchParams.edit;
    const isAdding = resolvedSearchParams.add === 'true';
    const userToEdit = editingUserId ? users.find(u => u.id === editingUserId) : null;

    return (
        <div className="p-8 md:p-12">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Gestion des Utilisateurs</h1>
                    <p className="text-neutral-400">Gérez les comptes et les accès de la plateforme.</p>
                </div>
                <div className="flex gap-4">
                    <Link href="/admin/dashboard">
                        <Button variant="outline">Retour au Dashboard</Button>
                    </Link>
                    {!isAdding && !userToEdit && (
                        <Link href="/admin/users?add=true">
                            <Button>+ Nouvel Utilisateur</Button>
                        </Link>
                    )}
                </div>
            </div>

            {(isAdding || userToEdit) ? (
                <div className="max-w-2xl mx-auto">
                    <Card className="p-8 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">{userToEdit ? 'Modifier l\'utilisateur' : 'Créer un utilisateur'}</h2>
                            <Link href="/admin/users">
                                <Button variant="ghost" size="sm">Annuler</Button>
                            </Link>
                        </div>
                        <form 
                            action={async (formData) => {
                                'use server';
                                if (userToEdit) {
                                    await adminUpdateUserAction(formData);
                                } else {
                                    await adminCreateUserAction(formData);
                                }
                            }} 
                            className="space-y-6"
                        >
                            {userToEdit && <input type="hidden" name="id" value={userToEdit.id} />}
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-neutral-300">Nom complet</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        required
                                        defaultValue={userToEdit?.fullName}
                                        placeholder="Ex: Jean Dupont"
                                        className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-neutral-300">Rôle</label>
                                    <select
                                        name="role"
                                        required
                                        defaultValue={userToEdit?.role || 'PROMOTER'}
                                        className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    >
                                        <option value="PROMOTER">Organisateur (PROMOTER)</option>
                                        <option value="SCANNER">Scanner (Entrée)</option>
                                        <option value="ADMIN">Administrateur</option>
                                        <option value="CLIENT">Client</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-neutral-300">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        defaultValue={userToEdit?.email}
                                        placeholder="email@exemple.com"
                                        className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-neutral-300">Téléphone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        defaultValue={userToEdit?.phoneNumber}
                                        placeholder="06 123 45 67"
                                        className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-neutral-300">Mot de passe {userToEdit && '(laisser vide pour ne pas changer)'}</label>
                                <input
                                    type="password"
                                    name="password"
                                    required={!userToEdit}
                                    placeholder="••••••••"
                                    className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                />
                            </div>

                            <div className="pt-4">
                                <Button type="submit" fullWidth size="lg">
                                    {userToEdit ? 'Enregistrer les modifications' : 'Créer l\'utilisateur'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            ) : (
                <Card className="overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-neutral-900 border-b border-white/10 text-sm text-neutral-400">
                                    <th className="p-4 font-semibold">Nom & Email</th>
                                    <th className="p-4 font-semibold">Téléphone</th>
                                    <th className="p-4 font-semibold">Rôle</th>
                                    <th className="p-4 font-semibold">Inscrit le</th>
                                    <th className="p-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {users.map((u) => (
                                    <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="p-4">
                                            <div className="font-bold text-white">{u.fullName}</div>
                                            <div className="text-xs text-neutral-500">{u.email}</div>
                                        </td>
                                        <td className="p-4 text-sm">{u.phoneNumber}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                                                u.role === 'ADMIN' ? 'bg-red-500/20 text-red-400' :
                                                u.role === 'PROMOTER' ? 'bg-indigo-500/20 text-indigo-400' :
                                                u.role === 'SCANNER' ? 'bg-amber-500/20 text-amber-400' :
                                                'bg-neutral-500/20 text-neutral-400'
                                            }`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="p-4 text-xs text-neutral-500">
                                            {new Date(u.createdAt).toLocaleDateString('fr-FR')}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/users?edit=${u.id}`}>
                                                    <Button variant="ghost" size="sm" className="text-indigo-400 hover:bg-indigo-500/10" title="Modifier">
                                                        ✏️
                                                    </Button>
                                                </Link>
                                                
                                                {u.id !== user.id && (
                                                    <form action={async (formData) => {
                                                        'use server';
                                                        await adminDeleteUserAction(formData);
                                                    }} onSubmit={(e) => {
                                                        if(!confirm('Supprimer cet utilisateur ?')) e.preventDefault();
                                                    }}>
                                                        <input type="hidden" name="id" value={u.id} />
                                                        <Button variant="ghost" size="sm" type="submit" className="text-red-400 hover:bg-red-500/10" title="Supprimer">
                                                            🗑️
                                                        </Button>
                                                    </form>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}
        </div>
    );
}
