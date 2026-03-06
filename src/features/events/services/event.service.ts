import { Event, EventStatus } from '../types';

// Utilisation de globalThis pour persister la mémoire entre les Server Actions
const globalForEvents = globalThis as unknown as {
    mockEvents: Event[];
};

if (!globalForEvents.mockEvents) {
    globalForEvents.mockEvents = [
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
}

const mockEvents = globalForEvents.mockEvents;

export const eventService = {
    async getEvents(): Promise<Event[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockEvents.filter(e => e.status === 'PUBLISHED'));
            }, 800);
        });
    },

    async getAdminEvents(): Promise<Event[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...mockEvents]);
            }, 300);
        });
    },

    async getEventById(id: string): Promise<Event | null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const event = mockEvents.find((e) => e.id === id);
                resolve(event || null);
            }, 500);
        });
    },

    async createEvent(eventData: Omit<Event, 'id' | 'availableTickets'>): Promise<Event> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newEvent: Event = {
                    ...eventData,
                    id: `evo-${Date.now()}`,
                    availableTickets: eventData.capacity,
                };
                mockEvents.push(newEvent);
                resolve(newEvent);
            }, 500);
        });
    },

    async updateEvent(id: string, eventData: Partial<Event>): Promise<Event | null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const index = mockEvents.findIndex(e => e.id === id);
                if (index === -1) return resolve(null);

                mockEvents[index] = { ...mockEvents[index], ...eventData };
                resolve(mockEvents[index]);
            }, 500);
        });
    },

    async deleteEvent(id: string): Promise<boolean> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const index = mockEvents.findIndex(e => e.id === id);
                if (index === -1) return resolve(false);

                mockEvents.splice(index, 1);
                resolve(true);
            }, 500);
        });
    }
};

// Maintenons la rétrocompatibilité
export const getEvents = eventService.getEvents;
export const getEventById = eventService.getEventById;
