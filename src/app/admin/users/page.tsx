import React from 'react';
import { authService } from '@/features/auth/services/auth.service';
import { getCurrentUser } from '@/features/auth/server/auth.actions';
import { DeleteUserButton } from '@/features/auth/components/DeleteUserButton';
import { redirect } from 'next/navigation';
import { Button } from '@/shared/components/ui/Button';
import { Card } from '@/shared/components/ui/Card';
import Link from 'next/link';

export default async function AdminUsersPage() {
    const currentUser = await getCurrentUser();
    
    // Protection : seul l'ADMIN peut accéder à cette page
    if (!currentUser || currentUser.role.toUpperCase() !== 'ADMIN') {
        redirect('/admin/dashboard');
    }

    const users = await authService.getUsers();

    return (
        <div className="p-4 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2 text-neutral-900">Utilisateurs</h1>
                    <p className="text-neutral-600 text-sm md:text-base">Gérez les comptes ADMIN, PROMOTER et SCANNER.</p>
                </div>
                <div className="w-full md:w-auto">
                    <Link href="/admin/users/new" className="block w-full">
                        <Button className="w-full md:w-auto">+ Nouvel Utilisateur</Button>
                    </Link>
                </div>
            </div>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse bg-white">
                        <thead>
                            <tr className="bg-neutral-50 border-b border-neutral-200 text-sm text-neutral-600">
                                <th className="p-4 font-semibold text-primary-600">Rôle</th>
                                <th className="p-4 font-semibold whitespace-nowrap">Nom complet</th>
                                <th className="p-4 font-semibold whitespace-nowrap">Email / Téléphone</th>
                                <th className="p-4 font-semibold whitespace-nowrap">Date d&apos;inscription</th>
                                <th className="p-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-neutral-500 italic">
                                        Aucun utilisateur enregistré.
                                    </td>
                                </tr>
                            ) : (
                                users.map((u) => (
                                    <tr key={u.id} className="hover:bg-neutral-50 transition-colors group">
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${
                                                u.role === 'ADMIN' ? 'bg-red-50 text-red-700 border border-red-200' :
                                                u.role === 'PROMOTER' ? 'bg-primary-50 text-primary-700 border border-primary-200' :
                                                u.role === 'SCANNER' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                                'bg-neutral-100 text-neutral-700 border border-neutral-200'
                                            }`}>
                                                {u.role === 'PROMOTER' ? 'Organisateur' : u.role}
                                            </span>
                                        </td>
                                        <td className="p-4 font-semibold text-neutral-900 whitespace-nowrap">{u.fullName}</td>
                                        <td className="p-4 text-sm whitespace-nowrap">
                                            <div className="text-neutral-900 mb-0.5">{u.email}</div>
                                            <div className="text-neutral-500 font-mono text-xs">{u.phoneNumber}</div>
                                        </td>
                                        <td className="p-4 text-neutral-500 text-sm whitespace-nowrap">
                                            {new Date(u.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                                <Link href={`/admin/users/${u.id}/edit`}>
                                                    <Button variant="ghost" size="sm" className="text-primary-600 hover:bg-primary-50" title="Modifier">
                                                        ✏️
                                                    </Button>
                                                </Link>
                                                
                                                {u.id !== currentUser.id && (
                                                    <DeleteUserButton userId={u.id} />
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
