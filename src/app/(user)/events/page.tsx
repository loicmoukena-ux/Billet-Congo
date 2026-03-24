import { getEvents } from '@/features/events/services/event.service';
import { EventCard } from '@/features/events/components/EventCard';

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Tous les événements</h1>
        <p className="text-neutral-400 text-lg">Découvrez tous les événements à venir au Congo.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div key={event.id} className="animate-fade-in">
            <EventCard event={event} />
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-32 glass-card rounded-[2rem]">
          <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6 text-neutral-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Aucun événement</h3>
          <p className="text-neutral-500">Revenez plus tard pour découvrir de nouvelles pépites.</p>
        </div>
      )}
    </div>
  );
}
