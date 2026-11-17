import { motion, useReducedMotion } from "motion/react";
import boloChocolate from "../assets/fotos-cliente/bolo-chocolate.jpg";

const TITLE_LINES = ["Pequenos momentos,", "grandes prazeres."];

export function Hero() {
  const reduceMotion = useReducedMotion();

  const lineVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.15 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  return (
    <section
      id="topo"
      aria-label="Abertura"
      className="relative flex min-h-dvh items-end overflow-hidden bg-cafe"
    >
      {/* Foto real tirada do Instagram @docecafesgp (baixa resolução,
          provisória para aprovação) — trocar por foto profissional em alta
          resolução antes de publicar. */}
      <img
        src={boloChocolate}
        alt="Bolo de chocolate do Doce Café"
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-grafite/90 via-grafite/30 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-32 sm:px-6 sm:pb-24">
        <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-rose uppercase">
          Café · Afeto · Experiências
        </p>

        <h1 className="font-heading text-4xl italic leading-[1.05] text-creme sm:text-6xl lg:text-7xl">
          {TITLE_LINES.map((line, i) => (
            <motion.span
              key={line}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={lineVariants}
              className="block"
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-6 max-w-md text-base text-creme/85 sm:text-lg"
        >
          Conheça o Doce Café e descubra um lugar especial para fazer uma
          pausa, em São Gonçalo do Pará (MG).
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <a
            href="#essencia"
            className="rounded-full bg-creme px-6 py-3 text-sm font-semibold text-cafe transition-transform hover:scale-[1.03] active:scale-95"
          >
            Conheça nossa história
          </a>
          <a
            href="#experiencia"
            className="rounded-full border border-creme/60 px-6 py-3 text-sm font-semibold text-creme transition-colors hover:bg-creme/10"
          >
            Explore o espaço
          </a>
        </motion.div>
      </div>
    </section>
  );
}
