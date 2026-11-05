"use client";

import { motion } from "framer-motion";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { RevealText, type RevealLine } from "@/components/animations/RevealText";
import { Button } from "@/components/ui/Button";
import { HERO } from "@/data/content";
import { SITE } from "@/lib/config";
import { EASE } from "@/lib/motion";
import { useIntroReady } from "@/hooks/useIntroReady";
import { usePrefersReducedMotion, useViewport } from "@/hooks/useViewport";

export function Hero() {
  const ready = useIntroReady();
  const reduced = usePrefersReducedMotion();
  const viewport = useViewport();

  // Mobile: quebra planejada em 3 linhas. Tablet/desktop: 2 linhas.
  const titleLines: RevealLine[] =
    viewport === "mobile"
      ? [
          { text: "MAIS QUE UM", tone: "white" },
          { text: "CORTE.", tone: "white" },
          { text: "UMA EXPERIÊNCIA VIP.", tone: "red" },
        ]
      : [
          { text: "MAIS QUE UM CORTE.", tone: "white" },
          { text: "UMA EXPERIÊNCIA VIP.", tone: "red" },
        ];

  const fade = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 16 },
    animate: ready || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    transition: { duration: 0.8, delay: reduced ? 0 : delay, ease: EASE },
  });

  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden="false">
        {/* Foto vertical no mobile (prioridade de carregamento) */}
        <ParallaxImage
          className="hero__img hero__img--mobile"
          src={HERO.mobile.src}
          alt={HERO.mobile.alt}
          strength={8}
          zoom={0.05}
          sizes="100vw"
          priority
          objectPosition="50% 30%"
          placeholderLabel="FOTO VERTICAL — BARBEIRO TRABALHANDO"
        />
        {/* Foto horizontal ampla no tablet/desktop */}
        <ParallaxImage
          className="hero__img hero__img--desktop"
          src={HERO.desktop.src}
          alt={HERO.desktop.alt}
          strength={14}
          zoom={0.1}
          sizes="100vw"
          placeholderLabel="FOTO HORIZONTAL — HERO"
        />
        <div className="hero__overlay" />
      </div>

      <div className="container hero__content">
        <span id="hero-title" className="sr-only">
          Barber VIP — Mais que um corte. Uma experiência VIP.
        </span>
        <RevealText
          as="h1"
          className="hero__title"
          waitForIntro
          lines={titleLines}
        />

        <motion.p className="hero__subtitle" {...fade(0.9)}>
          Excelência em cada detalhe. Seu estilo merece uma experiência à altura.
        </motion.p>

        <motion.div className="hero__ctas" {...fade(1.1)}>
          <Button href={SITE.appBarberUrl}>AGENDAR HORÁRIO</Button>
          <Button href="#club" variant="ghost">
            CONHEÇA O VIP CLUB
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
