import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export type CategoryItem = {
  nome: string;
  foto: string;
  alt: string;
};

export function CategoryModal({
  titulo,
  itens,
  triggerRef,
  onClose,
}: {
  titulo: string;
  itens: CategoryItem[];
  triggerRef: React.RefObject<HTMLElement | null>;
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
    const trigger = triggerRef.current;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      trigger?.focus();
    };
  }, [onClose, triggerRef]);

  return (
    <AnimatePresence>
      <motion.div
        role="presentation"
        onClick={onClose}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={reduceMotion ? undefined : { opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-grafite/70 p-4"
      >
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="category-modal-titulo"
          onClick={(event) => event.stopPropagation()}
          initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-creme p-6 sm:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-canela uppercase">
                Nosso Universo
              </p>
              <h3 id="category-modal-titulo" className="mt-1 font-heading text-2xl italic text-cafe sm:text-3xl">
                {titulo}
              </h3>
              <p className="mt-2 text-sm italic text-grafite/70">
                Itens ilustrativos — cardápio e preços reais em validação com a
                proprietária.
              </p>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-cafe transition-colors hover:bg-canela/10"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {itens.map((item) => (
              <li key={item.nome} className="overflow-hidden rounded-xl bg-white/60 shadow-sm">
                <div className="aspect-square overflow-hidden">
                  <img src={item.foto} alt={item.alt} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <p className="px-3 py-3 text-center font-heading text-sm italic text-cafe">
                  {item.nome}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
