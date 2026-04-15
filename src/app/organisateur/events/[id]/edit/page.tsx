import { createOrUpdateEventAction } from '@/features/events/server/event.actions';
import { Card } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { eventService } from '@/features/events/services/event.service';
import { getCurrentUser } from '@/features/auth/server/auth.actions';
import { notFound, redirect } from 'next/navigation';

export default async function OrganisateurEditEventPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const user = await getCurrentUser();
    const role = user?.role?.toUpperCase();

    if (!user || (role !== 'ADMIN' && role !== 'PROMOTER')) {
        redirect('/auth/login?error=not_authorized');
    }

    const event = await eventService.getEventById(id);
    if (!event) notFound();

    // Vérifier que l'organisateur est bien le propriétaire
    if (role === 'PROMOTER' && event.organizerId !== user.id) {
        redirect('/organisateur/events?error=unauthorized');
    }

    // Conversion ISO en datetime-local
    const formattedStartDate = new Date(event.startDate).toISOString().slice(0, 16);
    const formattedEndDate = event.endDate ? new Date(event.endDate).toISOString().slice(0, 16) : '';

    return (
        <div className="p-8 md:p-12 max-w-4xl mx-auto">
            <div className="mb-6 text-indigo-400">
                <Link href="/organisateur/events" className="text-sm font-medium hover:text-white transition-colors flex items-center gap-2">
                    ← Retourner à mes événements
                </Link>
            </div>

            <h1 className="text-3xl font-bold mb-8">Modifier l&apos;événement</h1>

            <Card className="p-8 border-white/5 bg-neutral-900 shadow-2xl">
                <form action={createOrUpdateEventAction} className="space-y-6">
                    <input type="hidden" name="id" value={event.id} />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2 text-neutral-400 uppercase tracking-widest text-[10px] font-bold">Titre de l&apos;événement</label>
                            <input type="text" name="title" defaultValue={event.title} required className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2 text-neutral-400 uppercase tracking-widest text-[10px] font-bold">Description complète</label>
                            <textarea name="description" defaultValue={event.description} required rows={6} className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-neutral-400 uppercase tracking-widest text-[10px] font-bold">Lieu / Ville</label>
                            <input type="text" name="location" defaultValue={event.location} required className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-neutral-400 uppercase tracking-widest text-[10px] font-bold">Début</label>
                                <input type="datetime-local" name="startDate" defaultValue={formattedStartDate} required className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-neutral-400 uppercase tracking-widest text-[10px] font-bold">Fin (Opt.)</label>
                                <input type="datetime-local" name="endDate" defaultValue={formattedEndDate} className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-neutral-400 uppercase tracking-widest text-[10px] font-bold">Prix Standard (XAF)</label>
                            <input type="number" name="price" defaultValue={event.price} min="0" required className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-neutral-400 uppercase tracking-widest text-[10px] font-bold">Places Standard Total</label>
                            <input type="number" name="capacity" defaultValue={event.capacity} min="1" required className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-amber-500/80 uppercase tracking-widest text-[10px] font-bold italic">Prix VIP (XAF)</label>
                            <input type="number" name="vipPrice" defaultValue={event.vipPrice || ''} min="0" className="w-full bg-neutral-950 border border-amber-500/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all font-mono" placeholder="Non défini" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-amber-500/80 uppercase tracking-widest text-[10px] font-bold italic">Places VIP Total</label>
                            <input type="number" name="vipCapacity" defaultValue={event.vipCapacity || ''} min="0" className="w-full bg-neutral-950 border border-amber-500/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all font-mono" placeholder="Non défini" />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2 text-neutral-400 uppercase tracking-widest text-[10px] font-bold">Changer la photo de l&apos;Affiche</label>
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                {event.imageUrl && (
                                    <div className="w-32 h-44 rounded-xl overflow-hidden border border-white/10 bg-neutral-950 flex-shrink-0">
                                        <div className="relative w-full h-full">
                                            <Image src={event.imageUrl} alt="Actuelle" fill className="object-cover opacity-70" unoptimized />
                                        </div>
                                    </div>
                                )}
                                <div className="flex-1 w-full space-y-4">
                                    <input type="file" name="imageFile" accept="image/*" className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-500/10 file:text-indigo-400 hover:file:bg-indigo-500/20 cursor-pointer" />
                                    <input type="url" name="imageUrl" defaultValue={event.imageUrl || ''} placeholder="Ou URL de l'image..." className="w-full bg-neutral-950/50 border border-white/5 rounded-xl px-4 py-3 text-neutral-400 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm" />
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2 text-indigo-400 bg-indigo-500/5 p-4 rounded-xl border border-indigo-500/10 mb-4">
                            <label className="block text-sm font-medium mb-2 uppercase tracking-widest text-[10px] font-bold">Statut de mise en ligne</label>
                            <select name="status" defaultValue={event.status} className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold">
                                <option value="DRAFT">Brouillon (Non visible)</option>
                                <option value="PUBLISHED">Publié (En vente)</option>
                                <option value="CANCELLED">Annulé (Indisponible)</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
                        <Link href="/organisateur/events">
                            <Button type="button" variant="ghost">Annuler</Button>
                        </Link>
                        <Button type="submit">Enregistrer les modifications</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
