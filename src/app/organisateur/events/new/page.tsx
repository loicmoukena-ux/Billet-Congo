import { createOrUpdateEventAction } from '@/features/events/server/event.actions';
import { Card } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import Link from 'next/link';

export default function OrganisateurNewEventPage() {
    return (
        <div className="p-8 md:p-12 max-w-4xl mx-auto">
            <div className="mb-6 text-indigo-400">
                <Link href="/organisateur/events" className="text-sm font-medium hover:text-white transition-colors flex items-center gap-2">
                    ← Retourner à mes événements
                </Link>
            </div>

            <h1 className="text-3xl font-bold mb-8">Créer un nouvel événement</h1>

            <Card className="p-8 border-white/5 bg-neutral-900 shadow-2xl">
                <form action={createOrUpdateEventAction} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2 text-neutral-400 uppercase tracking-widest text-[10px] font-bold">Titre de l&apos;événement</label>
                            <input type="text" name="title" required className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Ex: Festival des Arts de Brazzaville" />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2 text-neutral-400 uppercase tracking-widest text-[10px] font-bold">Description complète</label>
                            <textarea name="description" required rows={4} className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Décrivez votre événement en quelques lignes..."></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-neutral-400 uppercase tracking-widest text-[10px] font-bold">Lieu / Ville</label>
                            <input type="text" name="location" required className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Ex: Palais du Peuple" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-neutral-400 uppercase tracking-widest text-[10px] font-bold">Date et Heure</label>
                            <input type="datetime-local" name="startDate" required className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-neutral-400 uppercase tracking-widest text-[10px] font-bold">Prix Standard (XAF)</label>
                            <input type="number" name="price" min="0" required className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono" placeholder="5000" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-neutral-400 uppercase tracking-widest text-[10px] font-bold">Places Standard Total</label>
                            <input type="number" name="capacity" min="1" required className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono" placeholder="500" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-amber-500/80 uppercase tracking-widest text-[10px] font-bold italic">Prix VIP (XAF) - Facultatif</label>
                            <input type="number" name="vipPrice" min="0" className="w-full bg-neutral-950 border border-amber-500/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all font-mono" placeholder="20000" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-amber-500/80 uppercase tracking-widest text-[10px] font-bold italic">Places VIP Total - Facultatif</label>
                            <input type="number" name="vipCapacity" min="0" className="w-full bg-neutral-950 border border-amber-500/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all font-mono" placeholder="50" />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2 text-neutral-400 uppercase tracking-widest text-[10px] font-bold">URL de l&apos;Affiche (Illustration)</label>
                            <input type="url" name="imageUrl" className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="https://votre-image.jpg" />
                        </div>

                        <div className="md:col-span-2 text-indigo-400 bg-indigo-500/5 p-4 rounded-xl border border-indigo-500/10 mb-4">
                            <label className="block text-sm font-medium mb-2 uppercase tracking-widest text-[10px] font-bold">Statut de mise en ligne</label>
                            <select name="status" className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold">
                                <option value="DRAFT">Brouillon (Enregistrer sans publier)</option>
                                <option value="PUBLISHED">Publier maintenant (Cataloguer)</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
                        <Link href="/organisateur/events">
                            <Button type="button" variant="ghost">Annuler</Button>
                        </Link>
                        <Button type="submit">Créer l&apos;événement</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
