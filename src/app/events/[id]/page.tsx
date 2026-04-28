import { getEventById } from '@/features/events/services/event.service';
import { notFound } from 'next/navigation';
import { Button } from '@/shared/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { TicketSelector } from '@/features/checkout/components/TicketSelector';
import { Metadata } from 'next';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const event = await getEventById(resolvedParams.id);

    if (!event) {
        return {
            title: 'Événement non trouvé | Billet-Congo',
        };
    }

    const description = event.description.length > 160 
        ? event.description.substring(0, 157) + '...' 
        : event.description;

    return {
        title: `${event.title} | Billet-Congo`,
        description: description,
        openGraph: {
            title: event.title,
            description: description,
            url: `https://billet-congo.com/events/${event.id}`,
            siteName: 'Billet-Congo',
            images: event.imageUrl ? [
                {
                    url: event.imageUrl,
                    width: 1200,
                    height: 630,
                    alt: event.title,
                }
            ] : [],
            locale: 'fr_FR',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: event.title,
            description: description,
            images: event.imageUrl ? [event.imageUrl] : [],
        },
    };
}

export default async function EventDetailPage({ params }: PageProps) {
    const resolvedParams = await params;
    const event = await getEventById(resolvedParams.id);

    if (!event) {
        notFound();
    }

    const startDateObj = new Date(event.startDate);
    const endDateObj = event.endDate ? new Date(event.endDate) : null;

    const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    const formattedStartDate = dateFormatter.format(startDateObj);
    const formattedEndDate = endDateObj ? dateFormatter.format(endDateObj) : null;

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Hero Section / Image de couverture */}
            <div className="relative h-[40vh] md:h-[60vh] w-full bg-white border-b border-neutral-200">
                {event.imageUrl && (
                    <Image
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-50 via-neutral-50/60 to-transparent" />

                <div className="absolute top-6 left-4 z-10">
                    <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-sm font-medium text-neutral-900 hover:bg-white transition-colors border border-neutral-200 shadow-sm">
                        <span>←</span> Retour aux événements
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-32 relative z-20 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content (Infos gauche) */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white border border-neutral-200 rounded-3xl p-6 md:p-10 shadow-sm">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                                    {event.status === 'PUBLISHED' ? 'En vente' : event.status}
                                </span>
                                <span className="bg-neutral-100 text-neutral-600 border border-neutral-200 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                                    Concert
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-neutral-900">
                                {event.title}
                            </h1>

                            <div className="flex flex-col sm:flex-row gap-6 mb-8 pb-8 border-b border-neutral-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center border border-primary-100">
                                        <span className="text-xl">📅</span>
                                    </div>
                                    <div>
                                        <div className="text-sm text-neutral-500 font-medium mb-1">Date & Heure</div>
                                        <div className="font-semibold text-neutral-900 capitalize text-balance">
                                            {formattedEndDate ? (
                                                <div className="flex flex-col">
                                                    <span>Du {formattedStartDate}</span>
                                                    <span className="text-primary-600">au {formattedEndDate}</span>
                                                </div>
                                            ) : (
                                                formattedStartDate
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center border border-primary-100">
                                        <span className="text-xl">📍</span>
                                    </div>
                                    <div>
                                        <div className="text-sm text-neutral-500 font-medium mb-1">Lieu</div>
                                        <div className="font-semibold text-neutral-900">{event.location}</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-neutral-900">À propos de l&apos;événement</h2>
                                <div className="prose max-w-none">
                                    <p className="text-neutral-600 leading-relaxed text-lg text-balance">
                                        {event.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar (Ticket card) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm sticky top-24">
                            <h3 className="text-xl font-bold mb-6 text-neutral-900">Réserver vos billets</h3>

                            <TicketSelector
                                eventId={event.id}
                                price={event.price}
                                vipPrice={event.vipPrice || undefined}
                                currency={event.currency}
                                availableTickets={event.availableTickets}
                                availableVipTickets={event.availableVipTickets || undefined}
                            />

                            <p className="text-xs text-center text-neutral-500 mt-4">
                                Les paiements sont sécurisés. Vous recevrez vos e-tickets instantanément après le paiement via Mobile Money.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
