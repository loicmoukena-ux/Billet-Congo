export default function GlobalLoading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
                <div className="text-sm font-medium tracking-widest text-neutral-500 uppercase animate-pulse">Chargement...</div>
            </div>
        </div>
    );
}
