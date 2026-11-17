import { useRef, useState } from "react";
import { motion } from "motion/react";
import { DepthCard } from "./DepthCard";
import { CategoryModal, type CategoryItem } from "./CategoryModal";
import fotoBolo from "../assets/fotos-cliente/bolo-frutas.jpg";
import fotoCroquete from "../assets/fotos-cliente/croquete-salgado.jpg";
import fotoCafe from "../assets/fotos-vitrine/cafe-caramelo.webp";
import fotoCafeCrumble from "../assets/fotos-vitrine/cafe-crumble.webp";
import fotoBebidas from "../assets/fotos-vitrine/bebidas-especiais-trio.webp";
import fotoBebidaGelada from "../assets/fotos-vitrine/bebida-gelada-chantininho.webp";
import fotoNakedCake from "../assets/fotos-vitrine/naked-cake-morango.webp";
import fotoTacaMarca from "../assets/fotos-vitrine/taca-doce-marca.webp";
import fotoTortaLimao from "../assets/fotos-vitrine/torta-limao.webp";
import fotoMorangosTaca from "../assets/fotos-vitrine/morangos-chocolate-taca.webp";
import fotoBrownie from "../assets/fotos-vitrine/brownie-sanduiche.webp";
import fotoMousse from "../assets/fotos-vitrine/mousse-chocolate.webp";
import fotoTorradaQueijo from "../assets/fotos-vitrine/torrada-ovo-queijo.webp";
import fotoTorradaAlecrim from "../assets/fotos-vitrine/torrada-ovo-alecrim.webp";
import fotoTorradaTomate from "../assets/fotos-vitrine/torrada-tomate-mussarela.webp";
import fotoSanduiche from "../assets/fotos-vitrine/sanduiche-carne.webp";

// Todas as fotos (cartão e modal) são reais da cliente — nenhuma foto de
// banco público nesta seção. Itens dentro de cada modal são exemplos
// ilustrativos (nomes fictícios) para mostrar o layout; cardápio e preços
// reais ainda não foram validados com a proprietária (ver
// Doce-Cafe-Plano-do-Site.md, seção 2).
const CATEGORIAS: {
  nome: string;
  foto: string;
  alt: string;
  itens: CategoryItem[];
}[] = [
  {
    nome: "Cafés",
    foto: fotoCafe,
    alt: "Café com leite e calda de caramelo do Doce Café",
    itens: [
      { nome: "Café com caramelo (exemplo)", foto: fotoCafe, alt: "Café com leite e calda de caramelo" },
      { nome: "Café com farofa crocante (exemplo)", foto: fotoCafeCrumble, alt: "Café com calda e farofa crocante" },
    ],
  },
  {
    nome: "Doces & Confeitaria",
    foto: fotoBolo,
    alt: "Bolo do Doce Café",
    itens: [
      { nome: "Bolo de gotas de chocolate (exemplo)", foto: fotoBolo, alt: "Bolo de gotas de chocolate" },
      { nome: "Naked cake de morango (exemplo)", foto: fotoNakedCake, alt: "Naked cake de morango com chocolate" },
      { nome: "Taça da casa (exemplo)", foto: fotoTacaMarca, alt: "Taça de doce com morangos" },
      { nome: "Torta de limão (exemplo)", foto: fotoTortaLimao, alt: "Torta de limão" },
      { nome: "Morangos com chocolate (exemplo)", foto: fotoMorangosTaca, alt: "Morangos com chocolate em taça" },
      { nome: "Brownie recheado (exemplo)", foto: fotoBrownie, alt: "Brownies recheados em camadas" },
      { nome: "Mousse de chocolate (exemplo)", foto: fotoMousse, alt: "Mousse de chocolate" },
    ],
  },
  {
    nome: "Acompanhamentos",
    foto: fotoCroquete,
    alt: "Salgado do Doce Café",
    itens: [
      { nome: "Salgado recheado (exemplo)", foto: fotoCroquete, alt: "Salgado recheado com carne" },
      { nome: "Torrada com ovo e queijo (exemplo)", foto: fotoTorradaQueijo, alt: "Torrada com ovo e queijo" },
      { nome: "Torrada com ovo e alecrim (exemplo)", foto: fotoTorradaAlecrim, alt: "Torrada com ovo e alecrim" },
      { nome: "Torrada de tomate e mussarela (exemplo)", foto: fotoTorradaTomate, alt: "Torrada com tomate e mussarela" },
      { nome: "Sanduíche de carne (exemplo)", foto: fotoSanduiche, alt: "Sanduíche de carne desfiada" },
    ],
  },
  {
    nome: "Bebidas especiais",
    foto: fotoBebidas,
    alt: "Bebidas especiais do Doce Café",
    itens: [
      { nome: "Trio de bebidas especiais (exemplo)", foto: fotoBebidas, alt: "Três bebidas especiais geladas" },
      { nome: "Bebida gelada com chantili (exemplo)", foto: fotoBebidaGelada, alt: "Bebida gelada com chantili" },
    ],
  },
];

export function Universo() {
  const [ativo, setAtivo] = useState<number | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const card = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section
      id="universo"
      aria-labelledby="universo-titulo"
      className="bg-rose/15 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-canela uppercase">
            02 — Nosso Universo
          </p>
          <h2
            id="universo-titulo"
            className="font-heading text-3xl italic leading-tight text-cafe sm:text-4xl"
          >
            Feito para despertar os sentidos.
          </h2>
          <p className="mt-4 text-sm text-grafite/60">
            Clique num cartão para ver as variações dessa categoria.
          </p>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CATEGORIAS.map((categoria, i) => (
            <motion.li key={categoria.nome} variants={card}>
              <DepthCard
                ref={(el) => {
                  triggerRefs.current[i] = el;
                }}
                image={categoria.foto}
                imageAlt={categoria.alt}
                title={categoria.nome}
                onClick={() => {
                  activeTriggerRef.current = triggerRefs.current[i];
                  setAtivo(i);
                }}
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {ativo !== null && (
        <CategoryModal
          titulo={CATEGORIAS[ativo].nome}
          itens={CATEGORIAS[ativo].itens}
          triggerRef={activeTriggerRef}
          onClose={() => setAtivo(null)}
        />
      )}
    </section>
  );
}
