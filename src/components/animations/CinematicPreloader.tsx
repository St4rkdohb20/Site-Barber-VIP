"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { KEYS, SITE } from "@/lib/config";
import { Logo } from "@/components/ui/Logo";

type Mode = "pending" | "mobile" | "desktop" | "off";

/** Tempos (s). Desktop ≈ 1,7s até a saída; mobile ≈ 1s. */
const TIMING = {
  desktop: { logo: 0.1, shine: 0.6, line: 0.7, tagline: 1.0, exitAt: 1.7 },
  mobile: { logo: 0.05, shine: 0.35, line: 0.4, tagline: 0.5, exitAt: 1.0 },
} as const;

/**
 * Animação 01 — intro cinematográfica.
 * - Aparece uma vez por sessão (sessionStorage).
 * - Fica por cima do conteúdo, que já está carregando por baixo (não bloqueia).
 * - Respeita prefers-reduced-motion (não exibe).
 * - Toque/clique em qualquer lugar pula a intro.
 */
export function CinematicPreloader() {
  const [mode, setMode] = useState<Mode>("pending");
  const [visible, setVisible] = useState(true);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(KEYS.introSeen, "1");
    } catch {
      /* armazenamento indisponível: segue sem lembrar */
    }
    document.documentElement.dataset.intro = "seen";
    window.dispatchEvent(new Event(KEYS.introDoneEvent));
    setVisible(false);
  }, []);

  // Decide o modo uma única vez, no mount.
  useEffect(() => {
    if (document.documentElement.dataset.intro === "seen") {
      setMode("off");
      setVisible(false);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMode("off");
      finish();
      return;
    }
    setMode(window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop");
  }, [finish]);

  // Agenda a saída quando o modo já é conhecido.
  useEffect(() => {
    if (mode !== "mobile" && mode !== "desktop") return;
    const timer = window.setTimeout(finish, TIMING[mode].exitAt * 1000);
    return () => window.clearTimeout(timer);
  }, [mode, finish]);

  if (mode === "off") return null;

  const t = mode === "mobile" ? TIMING.mobile : TIMING.desktop;
  const running = mode !== "pending";
  const logoDuration = mode === "mobile" ? 0.45 : 0.7;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="preloader"
          role="presentation"
          aria-hidden="true"
          onClick={finish}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: mode === "mobile" ? 0.6 : 0.85, ease: EASE },
          }}
        >
          <div className="preloader__inner">
            <motion.div
              className="preloader__logo"
              style={
                {
                  "--shine-delay": `${t.shine}s`,
                  "--shine-dur": mode === "mobile" ? "0.5s" : "0.8s",
                } as CSSProperties
              }
              initial={{ opacity: 0, scale: 0.96 }}
              animate={running ? { opacity: 1, scale: 1 } : undefined}
              transition={{ duration: logoDuration, delay: t.logo, ease: EASE }}
            >
              <Logo className={SITE.logoSrc ? "" : "wordmark--shine"} />
              {SITE.logoSrc && (
                <motion.span
                  className="preloader__shine"
                  style={{
                    WebkitMaskImage: `url(${SITE.logoSrc})`,
                    maskImage: `url(${SITE.logoSrc})`,
                  }}
                  initial={{ x: "-120%" }}
                  animate={running ? { x: "120%" } : undefined}
                  transition={{
                    duration: mode === "mobile" ? 0.5 : 0.8,
                    delay: t.shine,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.div>

            <motion.span
              className="preloader__line"
              initial={{ scaleX: 0 }}
              animate={running ? { scaleX: 1 } : undefined}
              transition={{ duration: mode === "mobile" ? 0.45 : 0.7, delay: t.line, ease: EASE }}
            />

            <motion.p
              className="preloader__tagline"
              initial={{ opacity: 0, y: 8 }}
              animate={running ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.55, delay: t.tagline, ease: EASE }}
            >
              EXCELÊNCIA EM CADA DETALHE.
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
