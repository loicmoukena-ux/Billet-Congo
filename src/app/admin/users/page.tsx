import React from 'react';
import { authService } from '@/features/auth/services/auth.service';
import { getCurrentUser, adminDeleteUserAction } from '@/features/auth/server/auth.actions';
import { redirect } from 'next/navigation';
import { Button } from '@/shared/components/ui/Button';
import { Card } from '@/shared/components/ui/Card';
import Link from 'next/link';

export default async function AdminUsersPage() {
    const currentUser = await getCurrentUser();
    
    // Protection : seul l'ADMIN peut accéder à cette page
    if (!currentUser || currentUser.role !== 'ADMIN') {
        redirect('/admin/dashboard');
    }

    const users = await authService.getUsers();

    return (
        <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Utilisateurs</h1>
                    <p className="text-neutral-400">Gérez les comptes ADMIN, PROMOTER et SCANNER.</p>
                </div>
                <Link href="/admin/users/new">
                    <Button>+ Nouvel Utilisateur</Button>
                </Link>
            </div>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-neutral-900 border-b border-white/10 text-sm text-neutral-400">
                                <th className="p-4 font-semibold text-indigo-400">Rôle</th>
                                <th className="p-4 font-semibold">Nom complet</th>
                                <th className="p-4 font-semibold">Email / Téléphone</th>
                                <th className="p-4 font-semibold">Date d&apos;inscription</th>
                                <th className="p-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-neutral-500 italic">
                                        Aucun utilisateur enregistré.
                                    </td>
                                </tr>
                            ) : (
                                users.map((u) => (
                                    <tr key={u.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                u.role === 'ADMIN' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                                u.role === 'PROMOTER' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' :
                                                u.role === 'SCANNER' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                                                'bg-neutral-500/20 text-neutral-400 border border-white/10'
                                            }`}>
                                                {u.role === 'PROMOTER' ? 'Organisateur' : u.role}
                                            </span>
                                        </td>
                                        <td className="p-4 font-semibold text-white">{u.fullName}</td>
                                        <td className="p-4 text-sm">
                                            <div className="text-white mb-0.5">{u.email}</div>
                                            <div className="text-neutral-500 font-mono text-xs">{u.phoneNumber}</div>
                                        </td>
                                        <td className="p-4 text-neutral-500 text-sm">
                                            {new Date(u.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={`/admin/users/${u.id}/edit`}>
                                                    <Button variant="ghost" size="sm" className="text-indigo-400 hover:bg-indigo-500/10" title="Modifier">
                                                        ✏️
                                                    </Button>
                                                </Link>
                                                                                                {u.id !== currentUser.id && (
                                                    <form action={async (formData) => {
                                                        'use server';
                                                        await adminDeleteUserAction(formData);
                                                    }} onSubmit={(e) => {
                                                        if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
                                                            e.preventDefault();
                                                        }
                                                    }}>
                                                        <input type="hidden" name="id" value={u.id} />
                                                        <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-500/10" title="Supprimer">
                                                            🗑️
                                                        </Button>
                                                    </form>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
