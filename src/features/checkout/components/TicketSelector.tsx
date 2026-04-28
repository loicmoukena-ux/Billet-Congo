'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/components/ui/Button';

interface TicketSelectorProps {
    eventId: string;
    price: number;
    vipPrice?: number;
    currency: string;
    availableTickets: number;
    availableVipTickets?: number;
}

export const TicketSelector = ({ 
    eventId, 
    price, 
    vipPrice, 
    currency, 
    availableTickets,
    availableVipTickets = 0
}: TicketSelectorProps) => {
    const [quantity, setQuantity] = useState(1);
    const [ticketType, setTicketType] = useState<'STANDARD' | 'VIP'>('STANDARD');
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const currentPrice = ticketType === 'VIP' ? (vipPrice || 0) : price;
    const currentMax = ticketType === 'VIP' ? availableVipTickets : availableTickets;

    const handleIncrement = () => {
        if (quantity < Math.min(10, currentMax)) {
            setQuantity(q => q + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(q => q - 1);
        }
    };

    const handleTypeChange = (type: 'STANDARD' | 'VIP') => {
        setTicketType(type);
        setQuantity(1); // On reset la quantité quand on change de type
    };

    const handleCheckout = () => {
        const typeParam = ticketType === 'VIP' ? '&type=VIP' : '';
        startTransition(() => {
            router.push(`/checkout/${eventId}?qty=${quantity}${typeParam}`);
        });
    };

    return (
        <div className="space-y-4">
            {vipPrice && (
                <div className="flex p-1 bg-neutral-100 rounded-2xl border border-neutral-200">
                    <button
                        onClick={() => handleTypeChange('STANDARD')}
                        className={`flex-1 py-2 px-4 rounded-xl text-sm font-bold transition-all ${
                            ticketType === 'STANDARD' 
                            ? 'bg-white text-neutral-900 shadow-sm' 
                            : 'text-neutral-500 hover:text-neutral-900'
                        }`}
                    >
                        Standard
                    </button>
                    <button
                        onClick={() => handleTypeChange('VIP')}
                        className={`flex-1 py-2 px-4 rounded-xl text-sm font-bold transition-all ${
                            ticketType === 'VIP' 
                            ? 'bg-amber-100 text-amber-900 shadow-sm' 
                            : 'text-neutral-500 hover:text-neutral-900'
                        }`}
                    >
                        👑 VIP
                    </button>
                </div>
            )}

            <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-neutral-600">
                        Billet {ticketType === 'VIP' ? 'VIP' : 'Standard'}
                    </span>
                    <span className={`text-2xl font-bold ${ticketType === 'VIP' ? 'text-amber-600' : 'text-primary-600'}`}>
                        {new Intl.NumberFormat('fr-FR').format(currentPrice)} {currency}
                    </span>
                </div>

                <div className="mb-4 text-xs text-neutral-500">
                    {currentMax} places restantes
                </div>

                <div className="flex items-center justify-between mb-4 bg-white rounded-xl p-2 border border-neutral-200 shadow-sm">
                    <button
                        onClick={handleDecrement}
                        disabled={quantity <= 1}
                        className="w-10 h-10 rounded-lg flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 disabled:opacity-50 text-xl font-bold transition-colors text-neutral-700"
                    >
                        -
                    </button>
                    <span className="text-lg font-bold w-12 text-center text-neutral-900">{quantity}</span>
                    <button
                        onClick={handleIncrement}
                        disabled={quantity >= Math.min(10, currentMax)}
                        className="w-10 h-10 rounded-lg flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 disabled:opacity-50 text-xl font-bold transition-colors text-neutral-700"
                    >
                        +
                    </button>
                </div>

                <div className="flex justify-between items-center text-sm mb-6 pt-4 border-t border-neutral-200">
                    <span className="text-neutral-600">Total :</span>
                    <span className="font-bold text-neutral-900 text-lg">
                        {new Intl.NumberFormat('fr-FR').format(currentPrice * quantity)} {currency}
                    </span>
                </div>

                <Button 
                    fullWidth 
                    size="lg" 
                    className={`text-lg h-14 ${ticketType === 'VIP' ? 'bg-amber-500 hover:bg-amber-600 text-white border-none' : ''}`} 
                    onClick={handleCheckout}
                    disabled={currentMax === 0 || isPending}
                >
                    {isPending ? 'Chargement...' : currentMax === 0 ? 'Complet' : 'Réserver maintenant'}
                </Button>
            </div>
        </div>
    );
};
