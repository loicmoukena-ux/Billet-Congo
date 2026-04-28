import React from 'react';
import Link from 'next/link';
import { getCurrentUser, logoutAction } from '@/features/auth/server/auth.actions';
import { MobileMenu } from './MobileMenu';

export const Header = async () => {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/90 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-primary-600 tracking-tight">
            CongoTickets
          </Link>
        </div>

        {/* Centered Navigation for Desktop */}
        <nav className="hidden md:flex items-center justify-center gap-8 absolute left-1/2 -translate-x-1/2">
          <Link href="/events" className="text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors">
            Événements
          </Link>
          <Link href="/about" className="text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors">
            À propos
          </Link>
        </nav>

        {/* Actions (Desktop Auth + Mobile Menu) */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href={
                    user.role.toUpperCase() === 'ADMIN' 
                      ? "/admin/dashboard" 
                      : user.role.toUpperCase() === 'PROMOTER'
                        ? "/organisateur/dashboard"
                        : user.role.toUpperCase() === 'SCANNER' 
                          ? "/scanner" 
                          : "/account"
                  }
                  className="text-sm font-medium bg-neutral-100 border border-neutral-200 text-neutral-900 px-4 py-2 rounded-lg hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-sm"
                >
                  <span className="w-5 h-5 rounded-full bg-primary-600 text-white flex items-center justify-center text-[10px] font-bold">
                    {user.fullName.charAt(0)}
                  </span>
                  <span>
                    {user.role === 'ADMIN' ? 'Admin' : 
                     user.role === 'PROMOTER' ? 'Organisateur' : 
                     user.role === 'SCANNER' ? 'Scanner' : 'Mon Compte'}
                  </span>
                </Link>
                
                <form action={logoutAction}>
                  <button 
                    type="submit"
                    className="text-neutral-500 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
                    title="Déconnexion"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  </button>
                </form>
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors">
                  Connexion
                </Link>
                <Link href="/auth/register" className="text-sm font-medium bg-primary-600 text-white px-5 py-2 rounded-lg hover:bg-primary-700 transition-all shadow-sm">
                  S&apos;inscrire
                </Link>
              </>
            )}
          </div>
          <MobileMenu user={user} />
        </div>
      </div>
    </header>
  );
};
