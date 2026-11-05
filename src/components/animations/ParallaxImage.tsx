"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Photo } from "@/components/ui/Photo";
import {
  useLowPower,
  usePrefersReducedMotion,
  useViewport,
} from "@/hooks/useViewport";

type ParallaxImageProps = {
  src?: string;
  alt: string;
  /** Deslocamento vertical máximo em % (desktop). Mantenha entre 6 e 16. */
  strength?: number;
  /** Zoom progressivo extra ao longo da rolagem (0.08 = 8%). */
  zoom?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  objectPosition?: string;
  placeholderLabel?: string;
};

/**
 * Animação 02 — parallax cinematográfico.
 * - Desktop: efeito completo. Tablet: moderado. Mobile: extremamente discreto.
 * - Desativado com prefers-reduced-motion ou em dispositivos/conexões limitados.
 * - Usa apenas transform (y/scale), sem layout thrashing.
 */
export function ParallaxImage({
  src,
  alt,
  strength = 12,
  zoom = 0.08,
  sizes,
  priority,
  className = "",
  objectPosition,
  placeholderLabel,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const viewport = useViewport();
  const reduced = usePrefersReducedMotion();
  const lowPower = useLowPower();

  const factor =
    reduced || lowPower ? 0 : viewport === "mobile" ? 0.35 : viewport === "tablet" ? 0.65 : 1;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const s = strength * factor;
  // Quanto a camada precisa "sobrar" para o movimento nunca mostrar borda.
  const extra = s / (1 - s / 50);

  const y = useTransform(scrollYProgress, [0, 1], [`${-s}%`, `${s}%`]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 + zoom * factor]);

  const active = factor > 0;

  return (
    <div ref={ref} className={`parallax ${className}`}>
      <motion.div
        className="parallax__layer"
        style={
          active
            ? { y, scale, top: `${-extra}%`, bottom: `${-extra}%` }
            : { top: 0, bottom: 0 }
        }
      >
        <Photo
          src={src}
          alt={alt}
          sizes={sizes}
          priority={priority}
          objectPosition={objectPosition}
          placeholderLabel={placeholderLabel}
        />
      </motion.div>
    </div>
  );
}
