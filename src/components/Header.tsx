import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const NAV_LINKS = [
  { href: "#essencia", label: "Essência" },
  { href: "#universo", label: "Universo" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#destaques", label: "Destaques" },
  { href: "#visite-nos", label: "Visite-nos" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";
    const toggle = toggleRef.current;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
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
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      toggle?.focus();
    };
  }, [menuOpen]);

  return (
    <>
      {/* Desktop: barra completa, com fundo sólido só depois de rolar. */}
      <header
        className={`fixed inset-x-0 top-0 z-50 hidden transition-colors duration-300 md:block ${
          scrolled ? "bg-creme/95 shadow-sm backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <a
            href="#topo"
            className={`font-heading text-2xl italic transition-colors ${
              scrolled ? "text-cafe" : "text-creme"
            }`}
          >
            doce café.
          </a>

          <nav aria-label="Navegação principal" className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-canela ${
                  scrolled ? "text-grafite" : "text-creme"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              className="rounded-full bg-canela px-5 py-2 text-sm font-medium text-creme transition-transform hover:scale-[1.03] active:scale-95"
            >
              Fale conosco
            </a>
          </nav>
        </div>
      </header>

      {/* Mobile: logo fixa no canto esquerdo + botão de menu no canto
          direito, ambos com fundo sempre sólido — não dependem do scroll
          nem da foto de fundo ter carregado para ter contraste (era o que
          fazia o header "sumir" antes de a imagem do hero aparecer). */}
      <a
        href="#topo"
        className="fixed left-4 top-4 z-50 rounded-full bg-cafe px-4 py-2.5 font-heading text-base italic text-creme shadow-md md:hidden"
      >
        doce café.
      </a>

      <button
        ref={toggleRef}
        type="button"
        className="fixed right-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-cafe text-creme shadow-md md:hidden"
        aria-haspopup="dialog"
        aria-expanded={menuOpen}
        aria-controls={menuId}
        aria-label="Abrir menu"
        onClick={() => setMenuOpen(true)}
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
        </svg>
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            role="presentation"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-grafite/60"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id={menuId}
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={reduceMotion ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={reduceMotion ? undefined : { x: "100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 right-0 flex w-[82%] max-w-sm flex-col bg-creme p-6 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="font-heading text-xl italic text-cafe">doce café.</span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Fechar menu"
                  className="flex h-11 w-11 items-center justify-center rounded-full text-cafe transition-colors hover:bg-canela/10"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <nav aria-label="Navegação mobile" className="mt-8 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium text-grafite hover:bg-rose/20"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contato"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 rounded-full bg-canela px-5 py-3 text-center text-base font-medium text-creme"
                >
                  Fale conosco
                </a>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
