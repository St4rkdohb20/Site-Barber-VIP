"use client";

import { Fragment } from "react";
import { motion, type Variants } from "framer-motion";
import { EASE } from "@/lib/motion";
import { useIntroReady } from "@/hooks/useIntroReady";
import { usePrefersReducedMotion, useViewport } from "@/hooks/useViewport";

export type RevealTone = "white" | "red" | "gold";
export type RevealLine = { text: string; tone?: RevealTone };

type RevealTextProps = {
  lines: RevealLine[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Espera o fim da intro (use no HERO) em vez de esperar entrar na tela. */
  waitForIntro?: boolean;
  /** Atraso extra (s) antes de iniciar a sequência. */
  delay?: number;
};

/**
 * Animação 03 — tipografia cinematográfica.
 * - Cada linha sobe de baixo para cima, revelada por uma máscara (overflow hidden).
 * - Desktop: palavra por palavra. Mobile: por linha (mais rápido, deslocamento curto).
 * - Linhas vermelhas/douradas entram depois das brancas.
 * - Dispara ao entrar na área visível (uma vez). Sem animação com prefers-reduced-motion.
 */
export function RevealText({
  lines,
  as = "h2",
  className = "",
  waitForIntro = false,
  delay = 0,
}: RevealTextProps) {
  const viewport = useViewport();
  const reduced = usePrefersReducedMotion();
  const introReady = useIntroReady();

  const byWord = viewport !== "mobile";
  const label = lines.map((l) => l.text).join(" ");
  const MotionTag = motion[as];
  const StaticTag = as;

  if (reduced) {
    return (
      <StaticTag className={`reveal ${className}`}>
        {lines.map((line, i) => (
          <span key={i} className={`reveal__line reveal__line--${line.tone ?? "white"}`}>
            {line.text}{" "}
          </span>
        ))}
      </StaticTag>
    );
  }

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.16, delayChildren: delay } },
  };

  const lineVariants = (tone: RevealTone): Variants => ({
    hidden: {},
    show: {
      transition: {
        staggerChildren: byWord ? 0.07 : 0,
        // Textos coloridos surgem depois dos brancos.
        delayChildren: tone === "white" ? 0 : 0.22,
      },
    },
  });

  const unit: Variants = {
    hidden: { y: viewport === "mobile" ? "70%" : "110%", opacity: 0 },
    show: {
      y: "0%",
      opacity: 1,
      transition: { duration: viewport === "mobile" ? 0.7 : 0.95, ease: EASE },
    },
  };

  const trigger = waitForIntro
    ? { animate: introReady ? "show" : "hidden" }
    : { whileInView: "show", viewport: { once: true, amount: 0.5 } };

  return (
    <MotionTag
      className={`reveal ${className}`}
      aria-label={label}
      variants={container}
      initial="hidden"
      {...trigger}
    >
      {lines.map((line, i) => {
        const tone = line.tone ?? "white";
        const pieces = byWord ? line.text.split(" ") : [line.text];
        return (
          <motion.span
            key={i}
            aria-hidden="true"
            className={`reveal__line reveal__line--${tone}`}
            variants={lineVariants(tone)}
          >
            {pieces.map((piece, j) => (
              <Fragment key={j}>
                <span className="reveal__mask">
                  <motion.span className="reveal__unit" variants={unit}>
                    {piece}
                  </motion.span>
                </span>
                {j < pieces.length - 1 ? " " : null}
              </Fragment>
            ))}
          </motion.span>
        );
      })}
    </MotionTag>
  );
}
