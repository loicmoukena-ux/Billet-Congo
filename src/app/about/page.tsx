import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'À propos | CongoTickets',
  description: 'En savoir plus sur CongoTickets',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 md:py-24 overflow-hidden flex justify-center px-4">
        <div className="bg-white/30 backdrop-blur-2xl border border-white/30 rounded-[3rem] p-10 md:p-24 text-center max-w-5xl mx-auto relative overflow-hidden group shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] w-full">
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-40 pointer-events-none" />
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-neutral-900">
              À propos de <span className="text-gradient">24Ticket</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center max-w-6xl mx-auto">
            {/* Text Column */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-900">Notre Mission</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p className="text-neutral-600 leading-relaxed mt-4">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-900">Notre Vision</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
                </p>
              </div>

              <div className="pt-4">
                <Link href="/events" className="inline-flex items-center justify-center rounded-2xl bg-primary-600 text-white px-8 py-4 text-sm font-semibold hover:bg-primary-700 shadow-md shadow-primary-500/20 transition-all hover:-translate-y-0.5">
                  Découvrir nos événements
                </Link>
              </div>
            </div>

            {/* Visual Column */}
            <div className="relative">
              <div className="glass-card rounded-[2.5rem] p-8 md:p-12 h-full flex flex-col justify-center items-center text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-100 flex items-center justify-center mb-4 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900">L'Excellence</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">
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
