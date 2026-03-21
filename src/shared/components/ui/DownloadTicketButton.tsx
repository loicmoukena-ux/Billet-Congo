'use client';

import { useState } from 'react';
import { Button } from './Button';
import { incrementDownloadCountAction } from '@/features/tickets/server/ticket.actions';

interface Props {
    ticketId: string;
    role: string;
    downloadCount: number;
    targetElementId: string;
}

export function DownloadTicketButton({ ticketId, role, downloadCount, targetElementId }: Props) {
    const [isDownloading, setIsDownloading] = useState(false);
    const [localCount, setLocalCount] = useState(downloadCount);

    const isGuest = role === 'GUEST';
    const canDownload = !isGuest || localCount < 1;

    const handleDownload = async () => {
        if (!canDownload) return;
        setIsDownloading(true);

        try {
            // Chargement lazy pour éviter les crash SSR (window is not defined)
            const html2pdfModule = await import('html2pdf.js');
            const html2pdf = html2pdfModule.default || html2pdfModule;

            const element = document.getElementById(targetElementId);
            if (!element) throw new Error("Element non trouvé");

            const opt: any = {
                margin: 0.5,
                filename: `billet-${ticketId}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            };

            await html2pdf().set(opt).from(element).save();

            // Incrémente le compteur en base de données
            await incrementDownloadCountAction(ticketId);
            setLocalCount(prev => prev + 1);
        } catch (error) {
            console.error("Erreur téléchargement", error);
            alert("Erreur lors de la génération du PDF.");
        } finally {
            setIsDownloading(false);
        }
    };

    if (!canDownload) {
        return (
            <Button disabled variant="outline" className="opacity-50 mt-8 cursor-not-allowed w-full">
                🔒 Téléchargement unique déjà effectué
            </Button>
        );
    }

    return (
        <Button onClick={handleDownload} disabled={isDownloading} className="mt-8 w-full" size="lg">
            {isDownloading ? 'Génération du PDF...' : '⬇️ Télécharger mon Billet (PDF)'}
        </Button>
    );
}
