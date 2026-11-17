import { motion, useReducedMotion } from "motion/react";

// Depoimento de exemplo (ilustrativo) — não é uma avaliação real de
// cliente. Entra aqui quando a proprietária autorizar depoimentos reais
// (ver Doce-Cafe-Plano-do-Site.md, seção 2).
const DEPOIMENTO_EXEMPLO = {
  texto:
    "“Um lugar gostoso para tomar um café com calma e provar um doce bem feito.”",
  autor: "Depoimento de exemplo — aguardando autorização de clientes reais",
};

export function ProvaSocial() {
  const reduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section
      id="prova-social"
      aria-labelledby="prova-social-titulo"
      className="bg-rose/15 px-4 py-20 sm:px-6 sm:py-28"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-canela uppercase">
          05 — O que dizem
        </p>
        <h2 id="prova-social-titulo" className="sr-only">
          Depoimentos
        </h2>
        <blockquote>
          <p className="font-heading text-2xl italic leading-snug text-cafe sm:text-3xl">
            {DEPOIMENTO_EXEMPLO.texto}
          </p>
          <footer className="mt-5 text-sm italic text-grafite/70">
            {DEPOIMENTO_EXEMPLO.autor}
          </footer>
        </blockquote>
      </motion.div>
    </section>
  );
}
