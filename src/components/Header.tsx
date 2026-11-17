import { useEffect, useId, useRef, useState } from "react";

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
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "bg-creme/95 shadow-sm backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <a
          href="#topo"
          className={`font-heading text-xl italic transition-colors sm:text-2xl ${
            scrolled || menuOpen ? "text-cafe" : "text-creme"
          }`}
        >
          doce café.
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-8 md:flex"
        >
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

        <button
          ref={toggleRef}
          type="button"
          className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors md:hidden ${
            scrolled || menuOpen ? "text-cafe" : "text-creme"
          }`}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
            {menuOpen ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      <nav
        id={menuId}
        aria-label="Navegação mobile"
        className={`grid overflow-hidden bg-creme transition-[grid-template-rows] duration-300 md:hidden ${
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="flex min-h-0 flex-col gap-1 px-4 pb-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-3 text-base font-medium text-grafite hover:bg-rose/20"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            className="mt-2 rounded-full bg-canela px-5 py-3 text-center text-base font-medium text-creme"
            onClick={() => setMenuOpen(false)}
          >
            Fale conosco
          </a>
        </div>
      </nav>
    </header>
  );
}
