import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'À propos | CongoTickets',
  description: 'En savoir plus sur CongoTickets',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary-500/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-black to-black -z-10"></div>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            À propos de <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">CongoTickets</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center max-w-6xl mx-auto">
            {/* Text Column */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Notre Mission</h2>
                <p className="text-neutral-400 leading-relaxed">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
                </p>
                <p className="text-neutral-400 leading-relaxed mt-4">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Notre Vision</h2>
                <p className="text-neutral-400 leading-relaxed">
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
                </p>
              </div>

              <div className="pt-4">
                <Link href="/events" className="inline-flex items-center justify-center rounded-full bg-white text-black px-8 py-3 text-sm font-semibold hover:bg-neutral-200 transition-colors">
                  Découvrir nos événements
                </Link>
              </div>
            </div>

            {/* Visual Column */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-accent-500/20 blur-3xl rounded-full -z-10"></div>
              <div className="glass border border-white/10 rounded-3xl p-8 md:p-12 h-full flex flex-col justify-center items-center text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-400">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">L'Excellence</h3>
                <p className="text-neutral-400 text-sm">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
