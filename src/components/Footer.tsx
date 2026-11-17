import { FacebookIcon, InstagramIcon } from "./icons";

const ANO_ATUAL = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-grafite px-4 py-10 text-creme/70 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-heading text-lg italic text-creme">doce café.</p>
          <p className="mt-1 text-sm">
            R. Platina, 548 · São Gonçalo do Pará – MG
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/docecafesgp/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram do Doce Café (abre em nova aba)"
            className="transition-colors hover:text-creme"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61558404790090"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook do Doce Café (abre em nova aba)"
            className="transition-colors hover:text-creme"
          >
            <FacebookIcon />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-6xl flex-col items-center gap-2 border-t border-creme/10 pt-6 text-xs text-creme/65 sm:flex-row sm:justify-between">
        <p>© {ANO_ATUAL} Doce Café. Todos os direitos reservados.</p>
        <p>
          Desenvolvido por{" "}
          <span className="font-medium text-creme/70">Zag</span>
        </p>
      </div>
    </footer>
  );
}
