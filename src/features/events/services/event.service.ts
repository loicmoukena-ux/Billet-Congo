import { Event } from '../types';

const mockEvents: Event[] = [
    {
        id: 'evo-001',
        title: 'Showcase Fally Ipupa',
        description: 'Le grand retour de l\'Aigle pour un showcase exclusif à Brazzaville. Venez vibrer au rythme de la rumba et de la tokoss music dans un cadre exceptionnel.',
        location: 'Stade Marchand, Brazzaville',
        startDate: '2024-03-24T18:00:00Z',
        price: 10000,
        currency: 'XAF',
        capacity: 5000,
        availableTickets: 3450,
        status: 'PUBLISHED',
        organizerId: 'org-001',
        imageUrl: 'https://images.unsplash.com/photo-1540039155732-684735035727?q=80&w=2669&auto=format&fit=crop',
    },
    {
        id: 'evo-002',
        title: 'Festival Panafricain de Musique (FESPAM)',
        description: 'La 12ème édition du FESPAM s\'annonce grandiose. Plus de 50 artistes venus de tout le continent pour célébrer la musique africaine.',
        location: 'Esplanade du Palais des Congrès, Brazzaville',
        startDate: '2024-07-15T15:00:00Z',
        price: 5000,
        currency: 'XAF',
        capacity: 20000,
        availableTickets: 12000,
        status: 'PUBLISHED',
        organizerId: 'org-002',
        imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2670&auto=format&fit=crop',
    },
    {
        id: 'evo-003',
        title: 'Roga Roga & Extra Musica - 30 Ans',
        description: 'Célébration des 30 ans de carrière de Roga Roga et Extra Musica. Un concert monumental pour retracer l\'histoire de la musique congolaise.',
        location: 'Stade Éboué, Brazzaville',
        startDate: '2024-05-10T20:00:00Z',
        price: 15000,
        currency: 'XAF',
        capacity: 8000,
        availableTickets: 150,
        status: 'PUBLISHED',
        organizerId: 'org-001',
        imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2670&auto=format&fit=crop',
    },
];

export const getEvents = async (): Promise<Event[]> => {
    // Simuler un délai réseau
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockEvents);
        }, 800);
    });
};

export const getEventById = async (id: string): Promise<Event | null> => {
    // Simuler un délai réseau
    return new Promise((resolve) => {
        setTimeout(() => {
            const event = mockEvents.find((e) => e.id === id);
            resolve(event || null);
        }, 500);
    });
};
