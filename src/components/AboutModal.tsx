import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 p-0 sm:p-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl border border-white/[0.1] bg-[#131A29] p-6 sm:p-7 shadow-2xl">
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-white/15 sm:hidden" aria-hidden="true" />

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-amber-400">
              HYBRID Visual Guide
            </p>
            <h2
              id="about-modal-title"
              className="mt-1 font-display text-2xl sm:text-3xl font-bold tracking-[0.03em] text-[#F8FAFC]"
            >
              Sobre este guia
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar informações"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-white/[0.08] bg-[#182235] text-slate-300 transition-colors hover:border-white/20 hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-slate-200">
          <p>
            Este aplicativo foi desenvolvido para ajudar iniciantes a reconhecer e
            associar os nomes em inglês aos exercícios utilizados no treino híbrido.
          </p>
          <p>
            Seu objetivo é exclusivamente educativo e visual. Não substitui a
            orientação de treinadores e não tem a finalidade de ensinar técnicas de
            execução, postura ou prescrição de exercícios.
          </p>
        </div>

        <div className="mt-6 border-t border-white/[0.08] pt-4">
          <p className="text-xs font-semibold text-slate-300">
            Nota sobre as imagens
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
            As imagens exibidas nos cards são referências visuais ilustrativas de
            estúdio criadas especificamente para facilitar a identificação dos
            equipamentos e movimentos de cada estação, não representando
            fotografias de competições oficiais.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center rounded-xl bg-amber-500 px-6 py-2.5 text-sm font-semibold text-[#0B101B] transition-colors hover:bg-amber-400 active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#131A29]"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
}
