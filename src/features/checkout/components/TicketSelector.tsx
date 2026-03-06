'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/components/ui/Button';

interface TicketSelectorProps {
    eventId: string;
    price: number;
    currency: string;
    availableTickets: number;
}

export const TicketSelector = ({ eventId, price, currency, availableTickets }: TicketSelectorProps) => {
    const [quantity, setQuantity] = useState(1);
    const router = useRouter();

    const handleIncrement = () => {
        if (quantity < Math.min(10, availableTickets)) {
            setQuantity(q => q + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(q => q - 1);
        }
    };

    const handleCheckout = () => {
        router.push(`/checkout/${eventId}?qty=${quantity}`);
    };

    return (
        <div className="bg-neutral-950 rounded-2xl p-4 border border-white/5 mb-6">
            <div className="flex justify-between items-center mb-4">
                <span className="text-neutral-400">Billet Standard</span>
                <span className="text-2xl font-bold text-indigo-400">
                    {new Intl.NumberFormat('fr-FR').format(price)} {currency}
                </span>
            </div>

            <div className="flex items-center justify-between mb-4 bg-neutral-900 rounded-xl p-2 border border-white/10">
                <button
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-lg flex items-center justify-center bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 text-xl font-bold transition-colors"
                >
                    -
                </button>
                <span className="text-lg font-bold w-12 text-center">{quantity}</span>
                <button
                    onClick={handleIncrement}
                    disabled={quantity >= Math.min(10, availableTickets)}
                    className="w-10 h-10 rounded-lg flex items-center justify-center bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 text-xl font-bold transition-colors"
                >
                    +
                </button>
            </div>

            <div className="flex justify-between items-center text-sm mb-6 pt-4 border-t border-white/10">
                <span className="text-neutral-400">Total :</span>
                <span className="font-bold text-white text-lg">
                    {new Intl.NumberFormat('fr-FR').format(price * quantity)} {currency}
                </span>
            </div>

            <Button fullWidth size="lg" className="text-lg h-14" onClick={handleCheckout}>
                Continuer vers le paiement
            </Button>
        </div>
    );
};
