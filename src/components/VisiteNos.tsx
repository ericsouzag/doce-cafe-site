import { motion, useReducedMotion } from "motion/react";

const ENDERECO =
  "R. Platina, 548 – Nossa Senhora Aparecida, São Gonçalo do Pará – MG, 35544-000";

const LINK_ROTA =
  "https://www.google.com/maps/search/?api=1&query=R.%20Platina%2C%20548%2C%20Nossa%20Senhora%20Aparecida%2C%20S%C3%A3o%20Gon%C3%A7alo%20do%20Par%C3%A1%20MG%2C%2035544-000";

const MAPA_EMBED =
  "https://maps.google.com/maps?q=" +
  encodeURIComponent(
    "R. Platina, 548, Nossa Senhora Aparecida, São Gonçalo do Pará - MG, 35544-000",
  ) +
  "&output=embed";

export function VisiteNos() {
  const reduceMotion = useReducedMotion();

  const fade = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="visite-nos"
      aria-labelledby="visite-nos-titulo"
      className="bg-creme px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fade}
        >
          <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-canela uppercase">
            06 — Visite-nos
          </p>
          <h2
            id="visite-nos-titulo"
            className="font-heading text-3xl italic leading-tight text-cafe sm:text-4xl"
          >
            Seu próximo café está aqui.
          </h2>

          <p className="mt-6 text-base text-grafite/80 sm:text-lg">{ENDERECO}</p>

          {/* Horários encontrados em diretório externo, ainda não confirmados
              diretamente pela proprietária — ver Doce-Cafe-Plano-do-Site.md, seção 2.
              Não publicar horário como fato até essa confirmação. */}
          <p className="mt-2 text-sm italic text-grafite/70">
            Horários de funcionamento: em confirmação com a proprietária.
          </p>

          <a
            href={LINK_ROTA}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-canela px-6 py-3 text-sm font-semibold text-creme transition-transform hover:scale-[1.03] active:scale-95"
          >
            Como chegar
            <span className="sr-only">(abre em nova aba)</span>
          </a>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fade}
          className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-rose/20"
        >
          <iframe
            title="Mapa de localização do Doce Café"
            src={MAPA_EMBED}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}
