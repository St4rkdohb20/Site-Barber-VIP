"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { NAV } from "@/data/content";
import { SITE } from "@/lib/config";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/useViewport";

/**
 * Header fixo (preto translúcido + blur).
 * Mobile/tablet: logo à esquerda + hambúrguer à direita, menu em tela cheia.
 * Desktop (≥1024px): navegação horizontal + CTA.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const reduced = usePrefersReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.dataset.menu = "open";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    // Se a tela for ampliada para desktop com o menu aberto, fecha.
    const mql = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mql.matches && setOpen(false);

    window.addEventListener("keydown", onKey);
    mql.addEventListener("change", onChange);
    return () => {
      document.body.style.overflow = previousOverflow;
      delete document.documentElement.dataset.menu;
      window.removeEventListener("keydown", onKey);
      mql.removeEventListener("change", onChange);
    };
  }, [open, close]);

  const duration = reduced ? 0.01 : 0.5;

  return (
    <header className="header">
      <div className="header__bar">
        <a href="#inicio" className="header__logo" aria-label="Barber VIP — início">
          <Logo />
        </a>

        <nav className="header__nav" aria-label="Principal">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="header__link">
              {item.label}
            </a>
          ))}
        </nav>

        <Button href={SITE.appBarberUrl} className="header__cta">
          AGENDAR HORÁRIO
        </Button>

        <button
          ref={toggleRef}
          type="button"
          className="header__burger"
          aria-label="Abrir menu"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            initial={{ x: "100%" }}
            animate={{ x: 0, transition: { duration, ease: EASE } }}
            exit={{ x: "100%", transition: { duration: reduced ? 0.01 : 0.4, ease: EASE } }}
          >
            <div className="menu__top">
              <Logo />
              <button
                ref={closeRef}
                type="button"
                className="menu__close"
                aria-label="Fechar menu"
                onClick={close}
              >
                <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M5 5l14 14M19 5 5 19" />
                </svg>
              </button>
            </div>

            <nav className="menu__nav" aria-label="Menu mobile">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="menu__link"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: reduced ? 0 : 0.15 + i * 0.06, duration: reduced ? 0.01 : 0.5, ease: EASE },
                  }}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="menu__cta"
              initial={{ opacity: 0, y: 18 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: reduced ? 0 : 0.5, duration: reduced ? 0.01 : 0.5, ease: EASE },
              }}
            >
              <Button href={SITE.appBarberUrl} onClick={() => setOpen(false)}>
                AGENDAR HORÁRIO
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
