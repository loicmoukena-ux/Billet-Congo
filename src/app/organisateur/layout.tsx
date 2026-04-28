import { getCurrentUser, logoutAction } from '@/features/auth/server/auth.actions';
import { redirect } from 'next/navigation';
import { Button } from '@/shared/components/ui/Button';
import Link from 'next/link';

export default async function OrganisateurLayout({ children }: { children: React.ReactNode }) {
    const user = await getCurrentUser();
    const role = user?.role?.toUpperCase();

    if (!user) {
        redirect('/auth/login');
    }

    // Seuls les PROMOTER et ADMIN peuvent accéder à cet espace
    const isAuthorized = role === 'ADMIN' || role === 'PROMOTER';
    
    if (!isAuthorized) {
        redirect('/auth/login?error=not_authorized');
    }

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col md:flex-row pb-16 md:pb-0">
            {/* Sidebar Organisateur (Desktop) */}
            <aside className="w-64 bg-white border-r border-neutral-200 hidden md:flex flex-col h-screen sticky top-0 z-10">
                <div className="p-6 border-b border-neutral-200">
                    <Link href="/" className="text-xl font-bold text-primary-600">
                        Billet Congo
                    </Link>
                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-1">Espace Organisateur</p>
                </div>

                {/* Infos utilisateur connecté */}
                <div className="px-4 py-3 border-b border-neutral-100">
                    <p className="text-sm font-semibold text-neutral-900 truncate">{user.fullName}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary-50 text-primary-700 border border-primary-200">
                        {role === 'ADMIN' ? 'Administrateur' : 'Organisateur'}
                    </span>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <Link href="/organisateur/dashboard" className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl text-sm font-medium transition-colors">
                        📊 Tableau de bord
                    </Link>
                    <Link href="/organisateur/events" className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl text-sm font-medium transition-colors">
                        🎟️ Mes Événements
                    </Link>
                    <Link href="/organisateur/events/new" className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl text-sm font-medium transition-colors">
                        ➕ Créer un événement
                    </Link>
                </nav>

                <div className="p-4 border-t border-neutral-200">
                    <form action={logoutAction}>
                        <Button variant="outline" fullWidth type="submit" className="justify-start gap-3 border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:text-red-600">
                            🚪 Déconnexion
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 flex justify-around items-center p-2 z-50 h-16">
                <Link href="/organisateur/dashboard" className="flex flex-col items-center gap-1 p-2 text-neutral-500 hover:text-primary-600 transition-colors">
                    <span className="text-lg">📊</span>
                    <span className="text-[10px] font-medium">Dashboard</span>
                </Link>
                <Link href="/organisateur/events" className="flex flex-col items-center gap-1 p-2 text-neutral-500 hover:text-primary-600 transition-colors">
                    <span className="text-lg">🎟️</span>
                    <span className="text-[10px] font-medium">Événements</span>
                </Link>
                <Link href="/organisateur/events/new" className="flex flex-col items-center gap-1 p-2 text-neutral-500 hover:text-primary-600 transition-colors">
                    <span className="text-lg">➕</span>
                    <span className="text-[10px] font-medium">Créer</span>
                </Link>
                <form action={logoutAction} className="flex flex-col items-center">
                    <button type="submit" className="flex flex-col items-center gap-1 p-2 text-neutral-500 hover:text-red-600 transition-colors">
                        <span className="text-lg">🚪</span>
                        <span className="text-[10px] font-medium">Sortir</span>
                    </button>
                </form>
            </nav>

            {/* Contenu Principal */}
            <main className="flex-1 w-full overflow-x-hidden p-0 md:p-0">
                {children}
            </main>
        </div>
    );
}
