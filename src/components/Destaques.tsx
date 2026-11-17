import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import fotoCappuccino from "../assets/fotos-vitrine/bebida-gelada-chantininho.webp";
import fotoTorta from "../assets/fotos-vitrine/torta-limao.webp";
import fotoEspresso from "../assets/fotos-vitrine/cafe-crumble.webp";
import fotoLatteArt from "../assets/fotos-vitrine/cafe-caramelo.webp";

// Padrão diferente das outras seções (menu "vitrine interativa": lista +
// foto em destaque que troca ao passar o mouse/focar/tocar), a pedido do
// cliente — pesquisado em referências de sites de café/padaria
// (sitebuilderreport.com/inspiration/cafe-coffee-shop-websites, Dribbble
// "cafe menu website"). Itens de exemplo (ilustrativos) — nomes, descrições
// e preços fictícios, só para compor o layout. O cardápio e os preços
// reais da cliente ainda não foram validados (ver
// Doce-Cafe-Plano-do-Site.md, seção 2). Todas as fotos são reais, enviadas
// pela cliente.
const ITENS = [
  {
    nome: "Cappuccino da casa (exemplo)",
    descricao: "Espresso, leite cremoso e um toque de canela.",
    preco: "a confirmar",
    foto: fotoCappuccino,
    alt: "Bebida gelada com chantili do Doce Café",
  },
  {
    nome: "Torta do dia (exemplo)",
    descricao: "Receita de confeitaria, sempre fresca.",
    preco: "a confirmar",
    foto: fotoTorta,
    alt: "Torta de limão do Doce Café",
  },
  {
    nome: "Café especial (exemplo)",
    descricao: "Grãos selecionados, torra média.",
    preco: "a confirmar",
    foto: fotoEspresso,
    alt: "Café especial com calda e farofa crocante do Doce Café",
  },
  {
    nome: "Latte com arte (exemplo)",
    descricao: "Cremosidade e visual pra fotografar.",
    preco: "a confirmar",
    foto: fotoLatteArt,
    alt: "Café com leite e calda de caramelo do Doce Café",
  },
];

export function Destaques() {
  const reduceMotion = useReducedMotion();
  const [ativo, setAtivo] = useState(0);
  const item = ITENS[ativo];

  return (
    <section
      id="destaques"
      aria-labelledby="destaques-titulo"
      className="bg-creme px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-canela uppercase">
            04 — Destaques
          </p>
          <h2
            id="destaques-titulo"
            className="font-heading text-3xl italic leading-tight text-cafe sm:text-4xl"
          >
            Alguns favoritos da casa.
          </h2>
          <p className="mt-4 text-sm italic text-grafite/70">
            Itens ilustrativos — cardápio e preços reais em validação com a
            proprietária.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-cafe sm:aspect-[5/4] lg:aspect-[4/5]">
            <AnimatePresence mode="wait">
              <motion.img
                key={item.nome}
                src={item.foto}
                alt={item.alt}
                loading="lazy"
                initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-grafite/85 via-grafite/10 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="font-heading text-2xl italic text-creme">{item.nome}</p>
              <p className="mt-1 text-sm font-semibold text-rose">{item.preco}</p>
            </div>
          </div>

          <ul className="divide-y divide-canela/15">
            {ITENS.map((it, i) => (
              <li key={it.nome}>
                <button
                  type="button"
                  onMouseEnter={() => setAtivo(i)}
                  onFocus={() => setAtivo(i)}
                  onClick={() => setAtivo(i)}
                  aria-current={i === ativo}
                  className={`flex w-full items-center justify-between gap-4 py-5 text-left transition-colors first:pt-0 ${
                    i === ativo ? "text-canela" : "text-grafite"
                  }`}
                >
                  <span>
                    <span className="block font-heading text-xl italic">{it.nome}</span>
                    <span className="mt-1 block text-sm text-grafite/70">{it.descricao}</span>
                  </span>
                  <span className="shrink-0 text-sm font-semibold">{it.preco}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
