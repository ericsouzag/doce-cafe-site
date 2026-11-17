import { motion, useReducedMotion } from "motion/react";
import fotoFachada from "../assets/fotos-vitrine/fachada-rosas.webp";

export function Essencia() {
  const reduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section
      id="essencia"
      aria-labelledby="essencia-titulo"
      className="bg-creme px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-canela uppercase">
            01 — Nossa Essência
          </p>
          <h2
            id="essencia-titulo"
            className="font-heading text-3xl italic leading-tight text-cafe sm:text-4xl"
          >
            Mais que uma pausa para o café.
          </h2>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-grafite/80 sm:text-lg">
            {/* Texto provisório — aguardando entrevista com a proprietária
                sobre história, origem e o que diferencia a experiência. */}
            O Doce Café nasceu em São Gonçalo do Pará com a ideia de ser um
            lugar para desacelerar: um café bem feito, um doce especial e
            tempo para aproveitar. Esta é uma descrição provisória — o texto
            definitivo virá da própria história contada pela proprietária.
          </p>
        </motion.div>

        <MaskRevealImage reduceMotion={!!reduceMotion} />
      </div>
    </section>
  );
}

function MaskRevealImage({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl sm:aspect-[5/4]"
    >
      {/* Foto real da fachada do Doce Café, enviada pela cliente — provisória
          para aprovação, trocar por foto profissional em alta resolução
          antes de publicar. */}
      <motion.div
        variants={{ hidden: { scale: 1.15 }, visible: { scale: 1 } }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <img
          src={fotoFachada}
          alt="Fachada do Doce Café"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          variants={{ hidden: { scaleY: 1 }, visible: { scaleY: 0 } }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{ transformOrigin: "bottom" }}
          className="absolute inset-0 bg-creme"
        />
      )}
    </motion.div>
  );
}
