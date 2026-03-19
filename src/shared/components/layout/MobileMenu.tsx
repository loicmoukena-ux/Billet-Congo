'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-neutral-300 hover:text-white transition-colors"
        aria-label="Menu"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full glass backdrop-blur-2xl animate-fade-in border-b border-white/10 z-50">
          <nav className="flex flex-col p-6 gap-4">
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-neutral-200 hover:text-white transition-colors"
            >
              Événements
            </Link>
            <Link 
              href="/about" 
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-neutral-200 hover:text-white transition-colors"
            >
              À propos
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
};
