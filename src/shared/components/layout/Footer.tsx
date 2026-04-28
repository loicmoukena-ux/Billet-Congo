import React from 'react';
import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="border-t border-neutral-200 bg-neutral-50 py-12 mt-20">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-lg font-bold text-primary-600 mb-4">
                        CongoTickets
                    </h3>
                    <p className="text-sm text-neutral-600">
                        La première plateforme de billetterie fluide au Congo Brazzaville. Sécurisée, rapide, optimisée pour Mobile Money.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold text-neutral-900 mb-4">Liens Utiles</h4>
                    <ul className="space-y-2 text-sm text-neutral-600">
                        <li><Link href="/" className="hover:text-primary-600 transition-colors">Accueil</Link></li>
                        <li><Link href="/events" className="hover:text-primary-600 transition-colors">Tous les événements</Link></li>
                        <li><Link href="/events" className="hover:text-primary-600 transition-colors">Tarifs</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-neutral-900 mb-4">Légal</h4>
                    <ul className="space-y-2 text-sm text-neutral-600">
                        <li><a href="#" className="hover:text-primary-600 transition-colors">CGV / CGU</a></li>
                        <li><a href="#" className="hover:text-primary-600 transition-colors">Confidentialité</a></li>
                        <li><a href="#" className="hover:text-primary-600 transition-colors">Mentions Légales</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-neutral-900 mb-4">Nous Contacter</h4>
                    <p className="text-sm text-neutral-600">
                        Support WhatsApp: <br />+242 06 123 45 67
                    </p>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-neutral-200 text-center text-sm text-neutral-500">
                &copy; {new Date().getFullYear()} CongoTickets. Tous droits réservés.
            </div>
        </footer>
    );
};
