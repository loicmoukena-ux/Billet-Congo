export type EventStatus = 'DRAFT' | 'PUBLISHED' | 'CANCELLED' | 'COMPLETED';

export interface Event {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    location: string;
    startDate: string; // ISO string
    price: number;
    currency: 'XAF'; // Franc CFA
    capacity: number;
    availableTickets: number;
    status: EventStatus;
    organizerId: string;
}
