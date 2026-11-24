import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Dumbbell, X } from 'lucide-react';
import type { ExerciseItem } from '../data/exercises';

interface ExerciseQuickSheetProps {
  exercises: ExerciseItem[];
  activeExerciseId: string | null;
  onSelectExercise: (id: string) => void;
  onClose: () => void;
}

export function ExerciseQuickSheet({
  exercises,
  activeExerciseId,
  onSelectExercise,
  onClose,
}: ExerciseQuickSheetProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [failedImageId, setFailedImageId] = useState<string | null>(null);

  const currentIndex = activeExerciseId
    ? exercises.findIndex((item) => item.id === activeExerciseId)
    : -1;
  const activeExercise = currentIndex >= 0 ? exercises[currentIndex] : null;
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex >= 0 && currentIndex < exercises.length - 1;

  useEffect(() => {
    if (!activeExercise) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft' && canGoPrev) {
        onSelectExercise(exercises[currentIndex - 1].id);
      } else if (event.key === 'ArrowRight' && canGoNext) {
        onSelectExercise(exercises[currentIndex + 1].id);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeExercise, canGoNext, canGoPrev, currentIndex, exercises, onClose, onSelectExercise]);

  if (!activeExercise) return null;

  const hasImageError = failedImageId === activeExercise.id;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 p-0 sm:p-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exercise-detail-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl border border-white/[0.1] bg-[#0F1625] p-4 sm:p-5 shadow-2xl max-h-[92dvh] overflow-y-auto">
        <div
          className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-white/15 sm:hidden"
          aria-hidden="true"
        />

        {/* Topo discreto do modal */}
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-mono font-semibold tabular-nums text-amber-400">
              {String(currentIndex + 1).padStart(2, '0')} /{' '}
              {String(exercises.length).padStart(2, '0')}
            </span>
            <span aria-hidden="true">·</span>
            <span>{activeExercise.category}</span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar visualização do exercício"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-white/[0.08] bg-[#182235] text-slate-300 transition-colors hover:border-white/20 hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Card direto com imagem e informações completas do exercício */}
        <article className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#131A29]">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0D1320]">
            {!hasImageError ? (
              <img
                src={activeExercise.imageSrc}
                alt={activeExercise.imageAlt}
                referrerPolicy="no-referrer"
                onError={() => setFailedImageId(activeExercise.id)}
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#162033] to-[#0D1320] p-4 text-center">
                <Dumbbell className="h-9 w-9 text-amber-400/80" aria-hidden="true" />
                <span className="font-display text-2xl font-bold tracking-wide text-slate-200">
                  {activeExercise.englishName}
                </span>
              </div>
            )}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#131A29] via-[#131A29]/45 to-transparent"
            />

            <div className="pointer-events-none absolute left-3.5 top-3.5 rounded-lg bg-[#0B101B]/75 px-2.5 py-0.5 font-mono text-xs font-semibold tabular-nums text-amber-400 backdrop-blur-sm">
              {activeExercise.number}
            </div>
          </div>

          <div className="px-5 pb-5 pt-3">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <h2
                id="exercise-detail-title"
                className="font-display text-3xl sm:text-[2.1rem] leading-none font-bold tracking-[0.03em] text-[#F8FAFC]"
              >
                {activeExercise.englishName}
              </h2>

              <span className="text-sm font-medium text-amber-300">
                &ldquo;{activeExercise.pronunciation}&rdquo;
              </span>
            </div>

            <p className="mt-1.5 text-sm sm:text-[15px] font-semibold text-amber-400">
              {activeExercise.portugueseTranslation}
            </p>

            <div className="my-3.5 h-px w-full bg-white/[0.08]" />

            <p className="text-sm leading-relaxed text-slate-200">
              {activeExercise.description}
            </p>
          </div>
        </article>

        {/* Navegação Anterior / Próximo */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => canGoPrev && onSelectExercise(exercises[currentIndex - 1].id)}
            disabled={!canGoPrev}
            className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/[0.1] bg-[#131A29] px-4 text-sm font-medium text-slate-100 transition-colors hover:border-amber-400/40 hover:bg-[#182235] disabled:cursor-not-allowed disabled:opacity-35 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 whitespace-nowrap"
          >
            <ChevronLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Anterior</span>
          </button>

          <button
            type="button"
            onClick={() => canGoNext && onSelectExercise(exercises[currentIndex + 1].id)}
            disabled={!canGoNext}
            className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/[0.1] bg-[#131A29] px-4 text-sm font-medium text-slate-100 transition-colors hover:border-amber-400/40 hover:bg-[#182235] disabled:cursor-not-allowed disabled:opacity-35 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 whitespace-nowrap"
          >
            <span>Próximo</span>
            <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
