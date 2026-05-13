import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Event } from '../types';
import { Card } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';

interface EventCardProps {
    event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
    const startDateObj = new Date(event.startDate);
    const endDateObj = event.endDate ? new Date(event.endDate) : null;
    
    const dayMonthFormatter = new Intl.DateTimeFormat('fr-FR', {
        day: 'numeric',
        month: 'short',
    });

    const fullFormatter = new Intl.DateTimeFormat('fr-FR', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    });

    const formattedStartDate = dayMonthFormatter.format(startDateObj);
    
    let displayDate = "";
    if (endDateObj) {
        const formattedEndDate = dayMonthFormatter.format(endDateObj);
        if (formattedStartDate === formattedEndDate) {
            displayDate = fullFormatter.format(startDateObj);
        } else {
            displayDate = `${formattedStartDate} - ${formattedEndDate}`;
        }
    } else {
        displayDate = fullFormatter.format(startDateObj);
    }

    const isLowStock = event.availableTickets > 0 && event.availableTickets < 10;
    const isSoldOut = event.availableTickets === 0;

    return (
        <Link href={`/events/${event.id}`} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-[2rem]">
            <div className="glass-card h-full flex flex-col rounded-[2rem] overflow-hidden relative p-2">
                <div className="aspect-[16/10] bg-neutral-100 relative overflow-hidden rounded-3xl">
                    {event.imageUrl ? (
                        <Image
                            src={event.imageUrl}
                            alt={event.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 text-neutral-400">
                             <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                        </div>
                    )}


                    <div className="absolute top-4 right-4 z-20">
                        <div className="glass border border-white/50 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                            <div className={`w-2 h-2 rounded-full ${isSoldOut ? 'bg-red-500' : isLowStock ? 'bg-orange-500' : 'bg-emerald-500'} animate-pulse`} />
                            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-800">
                                {isSoldOut ? 'Épuisé' : isLowStock ? 'Dernières places' : 'Disponible'}
                            </span>
                        </div>
                        {event.vipPrice && (
                            <div className="bg-amber-100/90 backdrop-blur-md border border-amber-200/50 px-3 py-1.5 rounded-full mt-2 shadow-sm">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                                    VIP Disponible
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                    <div className="flex flex-col gap-1 mb-4">
                        <span className="text-[10px] font-bold text-primary-500 uppercase tracking-[0.2em]">
                            {displayDate}
                        </span>
                        <h3 className="text-xl font-bold text-neutral-900 transition-colors line-clamp-1">
                            {event.title}
                        </h3>
                        <p className="text-sm text-neutral-500 flex items-center gap-1 font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                            {event.location}
                        </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-200/50">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-neutral-500 uppercase font-medium">À partir de</span>
                            <span className="font-black text-neutral-900 text-lg tracking-tight">
                                {new Intl.NumberFormat('fr-FR').format(event.price)} <span className="text-xs text-neutral-500 font-medium">{event.currency}</span>
                            </span>
                        </div>
                        <Button variant="primary" size="sm" className="rounded-xl font-semibold shadow-md shadow-primary-500/20">
                            Réserver
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    );
};
