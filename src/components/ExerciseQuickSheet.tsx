import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Dumbbell, X } from 'lucide-react';
import type { ExerciseItem } from '../data/exercises';

interface ExerciseQuickSheetProps {
  exercises: ExerciseItem[];
  activeExerciseId: string | null;
  onSelectExercise: (id: string) => void;
  onClose: () => void;
}

type SlideDirection = 'none' | 'next' | 'prev';

export function ExerciseQuickSheet({
  exercises,
  activeExerciseId,
  onSelectExercise,
  onClose,
}: ExerciseQuickSheetProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const [failedImageId, setFailedImageId] = useState<string | null>(null);
  const [direction, setDirection] = useState<SlideDirection>('none');

  const isOpen = activeExerciseId !== null;
  const currentIndex = activeExerciseId
    ? exercises.findIndex((item) => item.id === activeExerciseId)
    : -1;
  const activeExercise = currentIndex >= 0 ? exercises[currentIndex] : null;
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex >= 0 && currentIndex < exercises.length - 1;

  const goToPrev = useCallback(() => {
    if (!canGoPrev) return;
    setDirection('prev');
    onSelectExercise(exercises[currentIndex - 1].id);
  }, [canGoPrev, currentIndex, exercises, onSelectExercise]);

  const goToNext = useCallback(() => {
    if (!canGoNext) return;
    setDirection('next');
    onSelectExercise(exercises[currentIndex + 1].id);
  }, [canGoNext, currentIndex, exercises, onSelectExercise]);

  // Lock body scroll & set initial focus ONLY when opening/closing modal
  useEffect(() => {
    if (!isOpen) {
      setDirection('none');
      return;
    }

    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft') {
        goToPrev();
      } else if (event.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, isOpen, onClose]);

  if (!activeExercise) return null;

  const hasImageError = failedImageId === activeExercise.id;
  const slideAnimClass =
    direction === 'next'
      ? 'animate-card-next'
      : direction === 'prev'
        ? 'animate-card-prev'
        : '';

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (!touch) return;
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touch = event.changedTouches[0];
    if (!touch) return;

    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;

    if (Math.abs(deltaX) >= 44 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050811]/88 p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exercise-detail-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="animate-modal-reveal relative w-full max-w-md sm:max-w-lg max-h-[90dvh] flex flex-col overflow-hidden rounded-2xl border border-white/[0.12] bg-[#131A29] shadow-2xl"
      >
        {/* Topo fixo sobreposto: contador e botão fechar não piscam na transição */}
        <div className="pointer-events-none absolute inset-x-3.5 top-3.5 z-20 flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-lg bg-[#0B101B]/80 px-2.5 py-1 text-xs text-slate-200">
            <span className="font-mono font-semibold tabular-nums text-amber-400">
              {String(currentIndex + 1).padStart(2, '0')} /{' '}
              {String(exercises.length).padStart(2, '0')}
            </span>
            <span aria-hidden="true" className="text-slate-500">
              ·
            </span>
            <span className="truncate max-w-[170px] sm:max-w-none">
              {activeExercise.category}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar visualização do exercício"
            className="pointer-events-auto inline-flex min-h-[42px] min-w-[42px] items-center justify-center rounded-xl bg-[#0B101B]/80 text-slate-100 transition-colors hover:bg-[#0B101B] hover:text-white active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Conteúdo deslizável instantâneo */}
        <div
          key={activeExercise.id}
          className={`flex-1 overflow-y-auto ${slideAnimClass}`}
        >
          {/* Imagem full-bleed no topo do card */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0D1320]">
            {!hasImageError ? (
              <img
                src={activeExercise.imageSrc}
                alt={activeExercise.imageAlt}
                decoding="async"
                fetchPriority="high"
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
              className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/70 via-black/30 to-transparent"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#131A29] via-[#131A29]/45 to-transparent"
            />
          </div>

          {/* Informações do exercício */}
          <div className="px-5 pt-3 pb-4">
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
        </div>

        {/* Barra de navegação fixa no rodapé do card */}
        <div className="flex items-center justify-between gap-2.5 border-t border-white/[0.08] bg-[#0F1625] p-3.5">
          <button
            type="button"
            onClick={goToPrev}
            disabled={!canGoPrev}
            className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/[0.1] bg-[#162033] px-4 text-sm font-medium text-slate-100 transition-transform duration-100 hover:border-amber-400/40 hover:bg-[#1C2840] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-35 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 whitespace-nowrap"
          >
            <ChevronLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Anterior</span>
          </button>

          <button
            type="button"
            onClick={goToNext}
            disabled={!canGoNext}
            className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/[0.1] bg-[#162033] px-4 text-sm font-medium text-slate-100 transition-transform duration-100 hover:border-amber-400/40 hover:bg-[#1C2840] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-35 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 whitespace-nowrap"
          >
            <span>Próximo</span>
            <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
