import { Check, ChevronRight } from 'lucide-react';
import type { ExerciseItem } from '../data/exercises';

interface ExerciseGlossaryListProps {
  exercises: ExerciseItem[];
  viewedIds: Set<string>;
  onSelectExercise: (exerciseId: string) => void;
}

export function ExerciseGlossaryList({
  exercises,
  viewedIds,
  onSelectExercise,
}: ExerciseGlossaryListProps) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
      {exercises.map((exercise) => {
        const isViewed = viewedIds.has(exercise.id);

        return (
          <li key={exercise.id}>
            <button
              type="button"
              onClick={() => onSelectExercise(exercise.id)}
              aria-label={`${exercise.englishName}, pronúncia ${exercise.pronunciation}, tradução ${exercise.portugueseTranslation}. Toque para visualizar.`}
              className="group flex min-h-[76px] w-full items-center justify-between gap-3 rounded-2xl border border-white/[0.08] bg-[#131A29] px-4 sm:px-5 py-3.5 text-left transition-colors duration-150 hover:border-amber-400/40 hover:bg-[#172136] active:scale-[0.99] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B101B]"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <span className="mt-1 font-mono text-xs sm:text-sm font-semibold tabular-nums text-amber-400 shrink-0">
                  {exercise.number}
                </span>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="font-display text-[1.35rem] sm:text-2xl leading-tight font-bold tracking-[0.03em] text-[#F8FAFC] group-hover:text-amber-300 transition-colors">
                      {exercise.englishName}
                    </span>
                    <span className="text-xs font-medium text-amber-300/85">
                      &ldquo;{exercise.pronunciation}&rdquo;
                    </span>
                  </div>

                  <p className="mt-0.5 text-sm text-slate-300 truncate">
                    {exercise.portugueseTranslation}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                {isViewed && (
                  <span
                    className="inline-flex items-center gap-1 text-xs font-medium text-amber-300/90 whitespace-nowrap"
                    aria-label="Visualizado"
                  >
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="hidden sm:inline">Visto</span>
                  </span>
                )}

                <ChevronRight
                  className="h-4 w-4 text-slate-400 transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-amber-400"
                  aria-hidden="true"
                />
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
