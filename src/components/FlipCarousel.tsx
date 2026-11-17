import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

// Carrossel de fotos inspirado no componente pago Lenticular Carousel do
// React Bits Pro (https://pro.reactbits.dev/docs/components/lenticular-carousel)
// — o original usa shaders de "folha metálica"/lente que vira como uma
// figurinha lenticular; é código fechado/pago (sem acesso ao fonte), então
// esta é uma reinterpretação própria com Motion: cartões com leve
// inclinação 3D e brilho diagonal que varre ao passar o mouse/focar,
// navegação por arraste (scroll nativo), setas e indicadores.
export type CarouselSlide = {
  image: string;
  alt: string;
  label: string;
};

export function FlipCarousel({ slides }: { slides: CarouselSlide[] }) {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const cards = Array.from(track.children) as HTMLElement[];
        const center = track.scrollLeft + track.clientWidth / 2;
        let closest = 0;
        let closestDist = Infinity;
        cards.forEach((card, i) => {
          const cardCenter = card.offsetLeft + card.clientWidth / 2;
          const dist = Math.abs(cardCenter - center);
          if (dist < closestDist) {
            closestDist = dist;
            closest = i;
          }
        });
        setActive(closest);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  function goTo(index: number) {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", inline: "center", block: "nearest" });
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-[calc(50%-140px)] pb-4 sm:px-[calc(50%-190px)] lg:px-[calc(50%-230px)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <FlipCard key={slide.image} slide={slide} isActive={i === active} reduceMotion={!!reduceMotion} />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(Math.max(0, active - 1))}
          aria-label="Foto anterior"
          disabled={active === 0}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-creme/30 text-lg text-creme transition-colors hover:bg-creme/10 disabled:opacity-30"
        >
          ‹
        </button>
        <div className="flex gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.image}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir para foto ${i + 1}`}
              aria-current={i === active}
              className={`h-2 w-2 rounded-full transition-colors ${i === active ? "bg-rose" : "bg-creme/30"}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => goTo(Math.min(slides.length - 1, active + 1))}
          aria-label="Próxima foto"
          disabled={active === slides.length - 1}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-creme/30 text-lg text-creme transition-colors hover:bg-creme/10 disabled:opacity-30"
        >
          ›
        </button>
      </div>
    </div>
  );
}

function FlipCard({
  slide,
  isActive,
  reduceMotion,
}: {
  slide: CarouselSlide;
  isActive: boolean;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      animate={{ scale: isActive ? 1 : 0.9, opacity: isActive ? 1 : 0.55 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ perspective: 800 }}
      className="group relative aspect-[3/4] w-[280px] shrink-0 snap-center sm:w-[380px] lg:w-[460px]"
    >
      <motion.div
        tabIndex={0}
        whileHover={reduceMotion ? undefined : { rotateY: 8, rotateX: -4 }}
        whileFocus={reduceMotion ? undefined : { rotateY: 8, rotateX: -4 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative h-full w-full overflow-hidden rounded-2xl shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-rose"
      >
        <img src={slide.image} alt={slide.alt} loading="lazy" className="h-full w-full object-cover" />

        {!reduceMotion && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full group-focus-within:translate-x-full"
          />
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-grafite/80 via-grafite/10 to-transparent"
        />
        <p className="absolute inset-x-0 bottom-0 px-4 py-4 font-heading text-base italic text-creme">
          {slide.label}
        </p>
      </motion.div>
    </motion.div>
  );
}
