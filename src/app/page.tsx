import { getEvents } from '@/features/events/services/event.service';
import { EventCard } from '@/features/events/components/EventCard';
import { Button } from '@/shared/components/ui/Button';
import { getCurrentUser } from '@/features/auth/server/auth.actions';
import Link from 'next/link';

export default async function Home() {
  const events = await getEvents();
  const user = await getCurrentUser();
  const organizeHref = user
    ? (user.role === 'CLIENT' ? '/auth/login?error=not_organizer' : '/admin/dashboard')
    : '/auth/login';

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden flex justify-center">
        <div className="glass rounded-[3rem] p-10 md:p-24 text-center max-w-5xl mx-auto relative overflow-hidden group shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border-white/80">
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent opacity-50 pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <h1 className="text-5xl md:text-8xl font-black tracking-tight text-neutral-900 animate-slide-up leading-tight">
              Vivez <span className="text-gradient">l&apos;instant.</span>
            </h1>
            <p className="text-lg md:text-2xl text-neutral-600 max-w-2xl mx-auto leading-relaxed animate-slide-up [animation-delay:0.1s] text-balance">
              La billetterie nouvelle génération pour le Congo. Découvrez, réservez et vibrez aux rythmes des meilleurs événements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4 animate-slide-up [animation-delay:0.2s]">
              <Button asChild size="lg" className="min-w-[200px] h-14 rounded-2xl text-base font-semibold group flex items-center justify-center gap-2 px-0 shadow-xl shadow-primary-500/20 hover:shadow-primary-500/30 transition-all hover:-translate-y-0.5">
                <Link href="/events" className="flex items-center justify-center w-full h-full px-10">
                  <span className="w-5 h-5 invisible" aria-hidden="true" />
                  <span className="flex-1 text-center">Découvrir</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </Link>
              </Button>
              <Link href={organizeHref}>
                <Button size="lg" variant="outline" className="min-w-[200px] h-14 rounded-2xl text-base font-semibold bg-white/60 backdrop-blur-md border-neutral-200 hover:bg-white hover:border-neutral-300 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
                  Organiser un événement
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Events Feed */}
      <section className="pb-32 animate-fade-in [animation-delay:0.4s]">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">À l&apos;affiche</h2>
            <p className="text-neutral-600">Les événements incontournables du moment</p>
          </div>
          <Button asChild variant="ghost" className="text-primary-600">
            <Link href="/events">Voir tout le calendrier</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="animate-fade-in">
              <EventCard event={event} />
            </div>
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-32 bg-neutral-50 border border-neutral-200 rounded-[2rem]">
            <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-6 text-neutral-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-neutral-900">Aucun événement</h3>
            <p className="text-neutral-600">Revenez plus tard pour découvrir de nouvelles pépites.</p>
          </div>
        )}
      </section>
    </div>
  );
}
