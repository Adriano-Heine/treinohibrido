import { useCallback, useMemo, useState } from 'react';
import { Search, SearchX, X } from 'lucide-react';
import { AboutModal } from './components/AboutModal';
import { ExerciseGlossaryList } from './components/ExerciseGlossaryList';
import { ExerciseQuickSheet } from './components/ExerciseQuickSheet';
import { Header } from './components/Header';
import { ProgressBar } from './components/ProgressBar';
import { EXERCISES } from './data/exercises';

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export default function App() {
  const [viewedIds, setViewedIds] = useState<Set<string>>(() => new Set());
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeExerciseId, setActiveExerciseId] = useState<string | null>(null);

  const totalCount = EXERCISES.length;
  const hasAnyInteraction = viewedIds.size > 0;

  const filteredExercises = useMemo(() => {
    const query = normalizeText(searchQuery);
    if (!query) return EXERCISES;

    return EXERCISES.filter((exercise) => {
      const searchable = normalizeText(
        `${exercise.number} ${exercise.englishName} ${exercise.pronunciation} ${exercise.portugueseTranslation} ${exercise.description}`
      );
      return searchable.includes(query);
    });
  }, [searchQuery]);

  const handleSelectExercise = useCallback((id: string) => {
    setActiveExerciseId(id);
    setViewedIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const handleResetAll = useCallback(() => {
    setViewedIds(new Set());
    setActiveExerciseId(null);
  }, []);

  return (
    <div id="topo" className="min-h-dvh flex flex-col">
      <Header onOpenAbout={() => setIsAboutOpen(true)} />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6 lg:px-8 pt-6 sm:pt-9 pb-14">
        {/* Apresentação concisa */}
        <section className="max-w-2xl">
          <p className="text-lg sm:text-2xl font-semibold leading-snug text-[#F8FAFC] text-balance">
            Conheça os exercícios. Entenda os nomes.{' '}
            <span className="text-amber-400">Chegue preparado.</span>
          </p>

          <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-slate-300">
            Um guia visual para ajudar você a identificar os principais exercícios do
            treino híbrido. Toque em qualquer exercício para visualizar.
          </p>
        </section>

        {/* Busca instantânea */}
        <section aria-label="Buscar exercícios" className="mt-5 sm:mt-6">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Buscar exercício em inglês ou português..."
              aria-label="Buscar exercício em inglês ou português"
              className="h-12 w-full rounded-xl border border-white/[0.1] bg-[#131A29] pl-10 pr-11 text-sm sm:text-[15px] text-[#F8FAFC] placeholder:text-slate-400 transition-colors focus:border-amber-400/60 focus:bg-[#162033] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
            />
            {searchQuery.trim().length > 0 && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Limpar busca"
                className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </section>

        {/* Indicador de progresso discreto */}
        <div className="mt-4">
          <ProgressBar
            viewedCount={viewedIds.size}
            totalCount={totalCount}
            hasAnyInteraction={hasAnyInteraction}
            onResetAll={handleResetAll}
          />
        </div>

        {/* Lista Compacta de Exercícios */}
        <section
          id="estacoes"
          aria-label="Lista dos principais exercícios de treino híbrido"
          className="mt-5"
        >
          {filteredExercises.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.08] bg-[#131A29] px-6 py-12 text-center">
              <SearchX className="h-8 w-8 text-slate-400" aria-hidden="true" />
              <h2 className="mt-3 font-display text-2xl font-bold tracking-wide text-[#F8FAFC]">
                Nenhum exercício encontrado
              </h2>
              <p className="mt-1.5 max-w-sm text-sm text-slate-300">
                Nenhum resultado para &ldquo;{searchQuery.trim()}&rdquo;. Tente outro
                termo em inglês ou português.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-amber-500 px-5 text-sm font-semibold text-[#0B101B] transition-colors hover:bg-amber-400 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                Limpar busca
              </button>
            </div>
          ) : (
            <ExerciseGlossaryList
              exercises={filteredExercises}
              viewedIds={viewedIds}
              onSelectExercise={handleSelectExercise}
            />
          )}
        </section>
      </main>

      <footer className="border-t border-white/[0.07] bg-[#090D16]/70">
        <div className="mx-auto flex max-w-5xl flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-5 text-xs text-slate-400">
          <p>
            HYBRID Visual Guide · Conteúdo exclusivamente educativo e visual para
            reconhecimento dos exercícios.
          </p>
          <button
            type="button"
            onClick={() => setIsAboutOpen(true)}
            className="font-medium text-slate-300 underline decoration-white/20 underline-offset-4 transition-colors hover:text-amber-400 hover:decoration-amber-400/60 cursor-pointer whitespace-nowrap shrink-0"
          >
            Sobre este guia
          </button>
        </div>
      </footer>

      <ExerciseQuickSheet
        exercises={filteredExercises}
        activeExerciseId={activeExerciseId}
        onSelectExercise={handleSelectExercise}
        onClose={() => setActiveExerciseId(null)}
      />

      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
}
