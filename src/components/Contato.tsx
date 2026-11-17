import { motion, useReducedMotion } from "motion/react";
import { FacebookIcon, InstagramIcon, PhoneIcon } from "./icons";

const CONTATOS = [
  {
    nome: "Ligar agora",
    detalhe: "(37) 99841-7340",
    href: "tel:+5537998417340",
    icon: PhoneIcon,
    externo: false,
  },
  {
    nome: "Instagram",
    detalhe: "@docecafesgp",
    href: "https://www.instagram.com/docecafesgp/",
    icon: InstagramIcon,
    externo: true,
  },
  {
    nome: "Facebook",
    detalhe: "Doce Café",
    href: "https://www.facebook.com/profile.php?id=61558404790090",
    icon: FacebookIcon,
    externo: true,
  },
];

export function Contato() {
  const reduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="contato"
      aria-labelledby="contato-titulo"
      className="bg-cafe px-4 py-20 sm:px-6 sm:py-28"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-rose uppercase">
          Contato
        </p>
        <h2
          id="contato-titulo"
          className="font-heading text-3xl italic leading-tight text-creme sm:text-4xl"
        >
          Fale com a gente.
        </h2>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {CONTATOS.map(({ nome, detalhe, href, icon: Icon, externo }) => (
            <li key={nome}>
              <motion.a
                href={href}
                target={externo ? "_blank" : undefined}
                rel={externo ? "noopener noreferrer" : undefined}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                whileFocus={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="flex h-full flex-col items-center gap-2 rounded-2xl border border-creme/15 px-6 py-6 text-creme transition-colors hover:bg-creme/10"
              >
                <Icon />
                <span className="font-medium">{nome}</span>
                <span className="text-sm text-creme/70">{detalhe}</span>
                {externo && <span className="sr-only">(abre em nova aba)</span>}
              </motion.a>
            </li>
          ))}
        </ul>

        {/* WhatsApp ainda não confirmado como canal ativo deste número
            — ver Doce-Cafe-Secoes-Animacoes.md, seção 9. Não publicar
            link de WhatsApp sem essa confirmação. */}
        <p className="mt-8 text-sm italic text-creme/60">
          Atendimento por WhatsApp: em confirmação.
        </p>
      </motion.div>
    </section>
  );
}
