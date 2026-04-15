import { createOrUpdateEventAction } from '@/features/events/server/event.actions';
import { eventService } from '@/features/events/services/event.service';
import { getCurrentUser } from '@/features/auth/server/auth.actions';
import { Card } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
    const user = await getCurrentUser();
    if (!user || !['ADMIN', 'PROMOTER'].includes(user.role)) redirect('/auth/login');

    const resolvedParams = await params;
    const event = await eventService.getEventById(resolvedParams.id);

    if (!event) notFound();

    // Verification des permissions pour les promoteurs
    if (user.role === 'PROMOTER' && event.organizerId !== user.id) {
        redirect('/admin/events');
    }

    // Format date for datetime-local input
    const formattedStartDate = new Date(event.startDate).toISOString().slice(0, 16);
    const formattedEndDate = event.endDate ? new Date(event.endDate).toISOString().slice(0, 16) : '';

    return (
        <div className="p-8 md:p-12 max-w-4xl mx-auto">
            <div className="mb-6">
                <Link href="/admin/events" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
                    ← Retour aux événements
                </Link>
            </div>

            <h1 className="text-3xl font-bold mb-8">Éditer l&apos;événement</h1>

            <Card className="p-8">
                <form action={createOrUpdateEventAction} className="space-y-6">
                    <input type="hidden" name="id" value={event.id} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2 text-neutral-300">Titre de l&apos;événement</label>
                            <input type="text" name="title" defaultValue={event.title} required className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2 text-neutral-300">Description</label>
                            <textarea name="description" defaultValue={event.description} required rows={4} className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-neutral-300">Lieu</label>
                            <input type="text" name="location" defaultValue={event.location} required className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-neutral-300">Début</label>
                                <input type="datetime-local" name="startDate" defaultValue={formattedStartDate} required className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-neutral-300">Fin (Opt.)</label>
                                <input type="datetime-local" name="endDate" defaultValue={formattedEndDate} className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-neutral-300">Prix du billet STANDARD (XAF)</label>
                            <input type="number" name="price" defaultValue={event.price} min="0" required className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-neutral-300">Capacité STANDARD (Places)</label>
                            <input type="number" name="capacity" defaultValue={event.capacity} min="1" required className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-neutral-300">Prix du billet VIP (XAF)</label>
                            <input type="number" name="vipPrice" defaultValue={event.vipPrice || ''} min="0" className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-neutral-300">Capacité VIP (Places)</label>
                            <input type="number" name="vipCapacity" defaultValue={event.vipCapacity || ''} min="0" className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2 text-neutral-300">Photo de l&apos;Affiche</label>
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                {event.imageUrl && (
                                    <div className="w-32 h-44 rounded-xl overflow-hidden border border-white/10 bg-neutral-950 flex-shrink-0">
                                        <div className="relative w-full h-full">
                                            <Image src={event.imageUrl} alt="Actuelle" fill className="object-cover opacity-70" unoptimized />
                                        </div>
                                    </div>
                                )}
                                <div className="flex-1 w-full space-y-4">
                                    <input type="file" name="imageFile" accept="image/*" className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-500/10 file:text-indigo-400 hover:file:bg-indigo-500/20 cursor-pointer" />
                                    <input type="url" name="imageUrl" defaultValue={event.imageUrl || ''} placeholder="Ou URL de l'image..." className="w-full bg-neutral-950/50 border border-white/5 rounded-xl px-4 py-3 text-neutral-400 focus:ring-2 focus:ring-indigo-500 outline-none text-sm" />
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2 text-neutral-300">Statut de publication</label>
                            <select name="status" defaultValue={event.status} className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                                <option value="DRAFT">Brouillon (Non visible)</option>
                                <option value="PUBLISHED">Publié (En vente)</option>
                                <option value="CANCELLED">Annulé</option>
                                <option value="COMPLETED">Terminé</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
                        <Link href="/admin/events">
                            <Button type="button" variant="ghost">Annuler</Button>
                        </Link>
                        <Button type="submit">Enregistrer les modifications</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
