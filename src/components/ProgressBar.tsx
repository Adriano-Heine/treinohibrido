import { CheckCircle2, RotateCcw } from 'lucide-react';

interface ProgressBarProps {
  viewedCount: number;
  totalCount: number;
  hasAnyInteraction: boolean;
  onResetAll: () => void;
}

export function ProgressBar({
  viewedCount,
  totalCount,
  hasAnyInteraction,
  onResetAll,
}: ProgressBarProps) {
  const progressRatio = totalCount > 0 ? viewedCount / totalCount : 0;
  const isComplete = viewedCount === totalCount && totalCount > 0;

  return (
    <section aria-label="Progresso de visualização" className="space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
          {isComplete && (
            <CheckCircle2
              className="h-4 w-4 text-amber-400 shrink-0"
              aria-hidden="true"
            />
          )}
          <span className="font-mono font-semibold tabular-nums text-slate-100">
            <span className="text-amber-400">{viewedCount}</span>
            <span className="text-slate-500"> / </span>
            <span>{totalCount}</span>
          </span>
          <span className="text-slate-400">
            {isComplete ? 'todos visualizados' : 'exercícios visualizados'}
          </span>
        </div>

        <button
          type="button"
          onClick={onResetAll}
          disabled={!hasAnyInteraction}
          className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium text-amber-400 transition-colors duration-150 hover:bg-amber-500/10 hover:text-amber-300 disabled:cursor-not-allowed disabled:text-slate-500 disabled:hover:bg-transparent cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 whitespace-nowrap shrink-0"
        >
          <RotateCcw className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>Visualizar todos novamente</span>
        </button>
      </div>

      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-[#1E293B]"
        role="progressbar"
        aria-valuenow={viewedCount}
        aria-valuemin={0}
        aria-valuemax={totalCount}
        aria-label={`${viewedCount} de ${totalCount} exercícios visualizados`}
      >
        <div
          className="h-full w-full origin-left rounded-full bg-gradient-to-r from-amber-500 to-orange-400 transition-transform duration-300 ease-out"
          style={{ transform: `scaleX(${progressRatio})` }}
        />
      </div>
    </section>
  );
}
