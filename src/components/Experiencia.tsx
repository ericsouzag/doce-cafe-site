import { motion, useReducedMotion } from "motion/react";
import { FlipCarousel } from "./FlipCarousel";
import fotoAmbiente from "../assets/fotos-vitrine/ambiente-interior.webp";
import fotoBoloAmbiente from "../assets/fotos-vitrine/bolo-no-ambiente.webp";
import fotoTaca from "../assets/fotos-vitrine/taca-morango-chocolate.webp";
import fotoSanduiche from "../assets/fotos-vitrine/sanduiche-carne.webp";
import fotoBebidas from "../assets/fotos-vitrine/bebidas-especiais-trio.webp";
import fotoCafe from "../assets/fotos-vitrine/cafe-crumble.webp";

// Todas as fotos são reais, enviadas pela cliente — nenhuma foto de banco
// público nesta seção.
const SLIDES = [
  { image: fotoAmbiente, alt: "Interior do Doce Café", label: "Nosso cantinho" },
  { image: fotoBoloAmbiente, alt: "Bolo do Doce Café no ambiente da loja", label: "Feito com carinho" },
  { image: fotoTaca, alt: "Taça de morango com chocolate do Doce Café", label: "Pra se lambuzar" },
  { image: fotoSanduiche, alt: "Sanduíche do Doce Café", label: "Pausa pro lanche" },
  { image: fotoBebidas, alt: "Bebidas especiais do Doce Café", label: "Refresca o dia" },
  { image: fotoCafe, alt: "Café com calda e farofa crocante do Doce Café", label: "Com calma" },
];

export function Experiencia() {
  const reduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section
      id="experiencia"
      aria-labelledby="experiencia-titulo"
      className="bg-cafe px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-rose uppercase">
            03 — Experiência
          </p>
          <h2
            id="experiencia-titulo"
            className="font-heading text-3xl italic leading-tight text-creme sm:text-4xl"
          >
            Um lugar para ficar mais um pouquinho.
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mt-14"
        >
          <FlipCarousel slides={SLIDES} />
        </motion.div>
      </div>
    </section>
  );
}
