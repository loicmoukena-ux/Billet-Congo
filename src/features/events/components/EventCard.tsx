import React from 'react';
import Link from 'next/link';
import { Event } from '../types';
import { Card } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';

interface EventCardProps {
    event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
    // Formatage de la date de manière simple pour l'instant
    const dateObj = new Date(event.startDate);
    const formattedDate = new Intl.DateTimeFormat('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
    }).format(dateObj);

    return (
        <Link href={`/events/${event.id}`} className="block h-full group">
            <Card className="h-full flex flex-col transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_0_30px_rgba(79,70,229,0.2)] border-white/5 hover:border-indigo-500/30">
                <div className="aspect-[4/3] bg-neutral-800 relative overflow-hidden">
                    {event.imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent z-10" />

                    <div className="absolute top-4 right-4 z-20">
                        <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                            <div className={`w-2 h-2 rounded-full ${event.availableTickets < 1000 ? 'bg-orange-500' : 'bg-emerald-500'} shadow-[0_0_10px_currentColor]`} />
                            <span className="text-xs font-medium text-white">
                                {event.availableTickets < 1000 ? 'Bientôt épuisé' : 'Disponible'}
                            </span>
                        </div>
                    </div>

                    <div className="absolute bottom-4 left-4 z-20 right-4">
                        <h3 className="text-xl font-bold text-white line-clamp-1 mb-1">{event.title}</h3>
                        <p className="text-sm text-neutral-300 line-clamp-1">{event.location}</p>
                    </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-4">
                        <div className="text-sm text-neutral-400 capitalize">{formattedDate}</div>
                        <div className="font-bold text-indigo-400 text-lg">
                            {new Intl.NumberFormat('fr-FR').format(event.price)} {event.currency}
                        </div>
                    </div>
                    <div className="mt-auto pt-2">
                        <Button fullWidth variant="secondary" className="group-hover:bg-indigo-500 transition-colors">
                            Réserver sa place
                        </Button>
                    </div>
                </div>
            </Card>
        </Link>
    );
};
