import { Info } from 'lucide-react';

interface HeaderProps {
  onOpenAbout: () => void;
}

export function Header({ onOpenAbout }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-14 sm:h-16 border-b border-white/[0.08] bg-[#0B101B]/90 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-xl sm:text-2xl font-bold tracking-[0.06em] text-[#F8FAFC] whitespace-nowrap shrink-0">
          HYBRID <span className="text-amber-400">VISUAL GUIDE</span>
        </h1>

        <button
          type="button"
          onClick={onOpenAbout}
          aria-label="Sobre este guia"
          title="Sobre este guia"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-[#131A29] px-3 text-sm font-medium text-slate-200 transition-colors duration-150 hover:border-amber-400/40 hover:bg-[#182235] hover:text-white active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B101B] whitespace-nowrap shrink-0"
        >
          <Info className="h-[18px] w-[18px] text-amber-400 shrink-0" aria-hidden="true" />
          <span className="hidden sm:inline">Sobre</span>
        </button>
      </div>
    </header>
  );
}
