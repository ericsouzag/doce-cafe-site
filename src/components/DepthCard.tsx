import { forwardRef, type PointerEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

// Efeito de "cartão com profundidade" (inclina com o cursor + brilho que
// segue o mouse) inspirado no componente pago Depth Card do React Bits Pro
// (https://pro.reactbits.dev/docs/components/depth-card) — implementação
// própria com Motion, já que o código-fonte do componente original é
// pago/fechado. Desativado em touch/reduced-motion (equivalente estático).
type DepthCardProps = {
  image: string;
  imageAlt: string;
  title: string;
  maxRotation?: number;
  maxTranslation?: number;
  className?: string;
  onClick?: () => void;
};

export const DepthCard = forwardRef<HTMLButtonElement, DepthCardProps>(function DepthCard(
  { image, imageAlt, title, maxRotation = 14, maxTranslation = 10, className = "", onClick },
  forwardedRef,
) {
  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { stiffness: 220, damping: 22, mass: 0.4 };

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [maxRotation, -maxRotation]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-maxRotation, maxRotation]), springConfig);
  const translateX = useSpring(useTransform(mouseX, [0, 1], [-maxTranslation, maxTranslation]), springConfig);
  const translateY = useSpring(useTransform(mouseY, [0, 1], [-maxTranslation, maxTranslation]), springConfig);
  const spotlightX = useTransform(mouseX, [0, 1], ["10%", "90%"]);
  const spotlightY = useTransform(mouseY, [0, 1], ["10%", "90%"]);
  const spotlight = useMotionTemplate`radial-gradient(circle at ${spotlightX} ${spotlightY}, rgba(255,255,255,0.35), transparent 55%)`;

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width);
    mouseY.set((event.clientY - rect.top) / rect.height);
  }

  function handlePointerLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <button
      ref={forwardedRef}
      type="button"
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ perspective: 900 }}
      className={`relative block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-canela focus-visible:ring-offset-2 focus-visible:ring-offset-rose/15 ${className}`}
    >
      <motion.div
        style={
          reduceMotion
            ? undefined
            : { rotateX, rotateY, x: translateX, y: translateY, transformStyle: "preserve-3d" }
        }
        className="relative aspect-square h-full w-full overflow-hidden rounded-2xl shadow-sm transition-shadow hover:shadow-xl"
      >
        <img src={image} alt={imageAlt} loading="lazy" className="h-full w-full object-cover" />
        {!reduceMotion && (
          <motion.div aria-hidden="true" style={{ background: spotlight }} className="absolute inset-0" />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-grafite/75 via-grafite/5 to-transparent"
        />
        <p className="absolute inset-x-0 bottom-0 px-4 py-4 text-center font-heading text-lg italic text-creme">
          {title}
        </p>
      </motion.div>
    </button>
  );
});
