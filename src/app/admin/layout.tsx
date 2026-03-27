import { getCurrentUser, logoutAction } from '@/features/auth/server/auth.actions';
import { redirect } from 'next/navigation';
import { Button } from '@/shared/components/ui/Button';
import Link from 'next/link';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const user = await getCurrentUser();

    if (!user) {
        redirect('/auth/login');
    }

    if (!['ADMIN', 'PROMOTER'].includes(user.role)) {
        redirect('/auth/login?error=not_authorized');
    }

    return (
        <div className="min-h-screen bg-neutral-950 flex">
            {/* Sidebar Admin Commune */}
            <aside className="w-64 bg-neutral-900 border-r border-white/10 hidden md:flex flex-col h-screen sticky top-0">
                <div className="p-6 border-b border-white/10">
                    <Link href="/" className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        Billet Congo
                    </Link>
                </div>

                {/* Infos utilisateur connecté */}
                <div className="px-4 py-3 border-b border-white/5">
                    <p className="text-sm font-semibold text-white truncate">{user.fullName}</p>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        user.role === 'ADMIN'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-indigo-500/20 text-indigo-400'
                    }`}>
                        {user.role === 'ADMIN' ? 'Administrateur' : 'Organisateur'}
                    </span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl text-sm font-medium transition-colors">
                        📊 Vue Générale
                    </Link>
                    <Link href="/admin/events" className="flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl text-sm font-medium transition-colors">
                        🎟️ Événements
                    </Link>
                    <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl text-sm font-medium transition-colors">
                        💰 Ventes
                    </Link>
                    {user.role === 'ADMIN' && (
                        <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl text-sm font-medium transition-colors">
                            👥 Utilisateurs
                        </Link>
                    )}
                </nav>
                <div className="p-4 border-t border-white/10">
                    <form action={logoutAction}>
                        <Button variant="ghost" fullWidth type="submit" className="justify-start gap-3">
                            🚪 Déconnexion
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Contenu Principal (Dashboard ou Events) */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
