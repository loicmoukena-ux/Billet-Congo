import { Event } from '../types';
import prisma from '@/lib/prisma';

const MOCK_EVENTS: Event[] = [
    {
        id: 'evt-1',
        title: 'FESPACO - Special Congo',
        description: 'Une soirée cinéma exceptionnelle célébrant le talent congolais.',
        location: 'Palais du Parlement, Brazzaville',
        startDate: new Date().toISOString(),
        price: 5000,
        currency: 'XAF',
        capacity: 500,
        availableTickets: 450,
        status: 'PUBLISHED',
        imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
        organizerId: 'usr-admin-1'
    },
    {
        id: 'evt-2',
        title: 'Concert Roga Roga',
        description: 'Le roi d\'Extra Musica en concert live.',
        location: 'Stade Massamba Débat',
        startDate: new Date(Date.now() + 86400000 * 7).toISOString(),
        price: 2000,
        currency: 'XAF',
        capacity: 10000,
        availableTickets: 8000,
        status: 'PUBLISHED',
        imageUrl: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14',
        organizerId: 'usr-admin-1'
    },
    {
        id: 'evt-3',
        title: 'Brazzaville Fashion Week',
        description: 'Le rendez-vous de la mode en Afrique Centrale.',
        location: 'Hôtel Radisson Blu',
        startDate: new Date(Date.now() + 86400000 * 14).toISOString(),
        price: 15000,
        currency: 'XAF',
        capacity: 300,
        availableTickets: 5,
        status: 'PUBLISHED',
        imageUrl: 'https://images.unsplash.com/photo-1509191439902-3c17bca88924',
        organizerId: 'usr-admin-1'
    }
];

export const eventService = {
    async getEvents(): Promise<Event[]> {
        try {
            const events = await prisma.event.findMany({
                where: { status: 'PUBLISHED' },
                orderBy: { startDate: 'asc' }
            });
            
            const results = events.map(e => ({
                ...e,
                startDate: e.startDate.toISOString(),
                createdAt: e.createdAt.toISOString(),
                updatedAt: e.updatedAt.toISOString(),
            })) as unknown as Event[];

            // En développement, si la base est vide, on affiche les mocks pour ne pas avoir une page vide
            if (results.length === 0) return MOCK_EVENTS;
            return results;
        } catch (error) {
            console.error('Database connection error in getEvents, returning mock data:', error);
            return MOCK_EVENTS;
        }
    },

    async getAdminEvents(): Promise<Event[]> {
        try {
            const events = await prisma.event.findMany({
                orderBy: { createdAt: 'desc' }
            });
            return events.map(e => ({
                ...e,
                startDate: e.startDate.toISOString(),
                createdAt: e.createdAt.toISOString(),
                updatedAt: e.updatedAt.toISOString(),
            })) as unknown as Event[];
        } catch (error) {
            console.error('Database connection error in getAdminEvents, returning mock data:', error);
            return MOCK_EVENTS;
        }
    },

    async getEventById(id: string): Promise<Event | null> {
        try {
            const event = await prisma.event.findUnique({
                where: { id }
            });
            if (!event) return null;

            return {
                ...event,
                startDate: event.startDate.toISOString(),
                createdAt: event.createdAt.toISOString(),
                updatedAt: event.updatedAt.toISOString(),
            } as unknown as Event;
        } catch (error) {
            console.error(`Database connection error in getEventById(${id}), returning mock event if found:`, error);
            return MOCK_EVENTS.find(e => e.id === id) || null;
        }
    },

    async createEvent(eventData: Omit<Event, 'id' | 'availableTickets'>): Promise<Event> {
        const event = await prisma.event.create({
            data: {
                title: eventData.title,
                description: eventData.description,
                location: eventData.location,
                startDate: eventData.startDate ? new Date(eventData.startDate) : new Date(),
                price: eventData.price,
                capacity: eventData.capacity,
                availableTickets: eventData.capacity,
                status: eventData.status,
                imageUrl: eventData.imageUrl,
                organizer: {
                    connect: { id: eventData.organizerId || 'usr-admin-1' } // Fallback to admin if missing to prevent relation error in MVP
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any
        });
        return event as unknown as Event;
    },

    async updateEvent(id: string, eventData: Partial<Event>): Promise<Event | null> {
        // Prepare data to only include valid fields for update
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dataToUpdate: Record<string, unknown> = { ...eventData as any };
        if (dataToUpdate.id) delete dataToUpdate.id;
        if (dataToUpdate.organizerId) delete dataToUpdate.organizerId;
        if (dataToUpdate.startDate) dataToUpdate.startDate = new Date(dataToUpdate.startDate as string);

        const event = await prisma.event.update({
            where: { id },
            data: dataToUpdate
        });
        return event as unknown as Event;
    },

    async deleteEvent(id: string): Promise<boolean> {
        try {
            await prisma.event.delete({
                where: { id }
            });
            return true;
        } catch (e) {
            console.error('Delete event error:', e);
            return false;
        }
    }
};

export const getEvents = eventService.getEvents;
export const getEventById = eventService.getEventById;
