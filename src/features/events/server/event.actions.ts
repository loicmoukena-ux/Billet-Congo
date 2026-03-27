'use server';

import { eventService } from '../services/event.service';
import { getCurrentUser } from '@/features/auth/server/auth.actions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { EventStatus } from '../types';

export async function createOrUpdateEventAction(formData: FormData) {
    const user = await getCurrentUser();
    const userRole = user?.role?.toUpperCase() || '';
    if (!user || !['ADMIN', 'PROMOTER'].includes(userRole)) {
        throw new Error('Non autorisé');
    }

    const id = formData.get('id') as string | null;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const location = formData.get('location') as string;
    const startDate = formData.get('startDate') as string; // datetime-local format
    const price = parseInt(formData.get('price') as string, 10);
    const vipPriceStr = formData.get('vipPrice') as string;
    const vipPrice = vipPriceStr ? parseInt(vipPriceStr, 10) : undefined;
    
    const capacity = parseInt(formData.get('capacity') as string, 10);
    const vipCapacityStr = formData.get('vipCapacity') as string;
    const vipCapacity = vipCapacityStr ? parseInt(vipCapacityStr, 10) : undefined;

    const status = formData.get('status') as EventStatus;
    const imageUrl = formData.get('imageUrl') as string;

    // Conversion simple date locale en ISO
    const isoDate = new Date(startDate).toISOString();

    if (id) {
        // Update check
        if (userRole === 'PROMOTER') {
            const event = await eventService.getEventById(id);
            if (!event || event.organizerId !== user.id) {
                throw new Error('Non autorisé à modifier cet événement');
            }
        }

        // Update
        await eventService.updateEvent(id, {
            title, description, location, startDate: isoDate, price, vipPrice, capacity, vipCapacity, status, imageUrl
        });
    } else {
        // Create
        await eventService.createEvent({
            title, description, location, startDate: isoDate, price, vipPrice, capacity, vipCapacity, status, imageUrl,
            currency: 'XAF', organizerId: user.id
        });
    }

    const redirectPath = user.role.toUpperCase() === 'ADMIN' ? '/admin/events' : '/organisateur/events';
    revalidatePath('/admin/events');
    revalidatePath('/organisateur/events');
    revalidatePath('/');
    redirect(redirectPath);
}

export async function deleteEventAction(formData: FormData) {
    const user = await getCurrentUser();
    if (!user || !['ADMIN', 'PROMOTER'].includes(user.role.toUpperCase())) {
        throw new Error('Non autorisé');
    }

    const id = formData.get('id') as string;
    if (!id) throw new Error('ID manquant');

    if (user.role.toUpperCase() === 'PROMOTER') {
        const event = await eventService.getEventById(id);
        if (!event || event.organizerId !== user.id) {
            throw new Error('Non autorisé à supprimer cet événement');
        }
    }

    await eventService.deleteEvent(id);

    revalidatePath('/admin/events');
    revalidatePath('/organisateur/events');
    revalidatePath('/');
}

export async function toggleEventStatusAction(formData: FormData) {
    const user = await getCurrentUser();
    if (!user || !['ADMIN', 'PROMOTER'].includes(user.role.toUpperCase())) {
        throw new Error('Non autorisé');
    }

    const id = formData.get('id') as string;
    const currentStatus = formData.get('currentStatus') as EventStatus;

    if (user.role.toUpperCase() === 'PROMOTER') {
        const event = await eventService.getEventById(id);
        if (!event || event.organizerId !== user.id) {
            throw new Error('Non autorisé à modifier le statut de cet événement');
        }
    }

    const newStatus: EventStatus = currentStatus === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';

    await eventService.updateEvent(id, { status: newStatus });

    revalidatePath('/admin/events');
    revalidatePath('/organisateur/events');
    revalidatePath('/');
}
