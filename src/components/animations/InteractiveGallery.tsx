"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type PanInfo, type Variants } from "framer-motion";
import { EASE } from "@/lib/motion";
import { Photo } from "@/components/ui/Photo";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { useCanHover, usePrefersReducedMotion } from "@/hooks/useViewport";
import type { GalleryItem } from "@/data/content";

type InteractiveGalleryProps = { items: GalleryItem[] };

const SWIPE_DISTANCE = 70;
const SWIPE_VELOCITY = 450;

function ZoomIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 21 21M10.5 8v5M8 10.5h5" />
    </svg>
  );
}

/**
 * Animação 04 — galeria assimétrica com image reveal e modal.
 * - Desktop (hover): zoom suave, overlay, linha vermelha, legenda, ícone de ampliação.
 * - Touch: ícone de ampliação sempre visível, toque abre tela cheia, arrastar troca de foto.
 * - Modal: fecha por botão, ESC ou clique fora; setas/teclado para navegar.
 */
export function InteractiveGallery({ items }: InteractiveGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const canHover = useCanHover();
  const reduced = usePrefersReducedMotion();
  const lastTrigger = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const isOpen = openIndex !== null;
  const count = items.length;

  const open = (index: number, trigger: HTMLElement) => {
    lastTrigger.current = trigger;
    setDirection(1);
    setOpenIndex(index);
  };

  const close = useCallback(() => {
    setOpenIndex(null);
    lastTrigger.current?.focus();
  }, []);

  const go = useCallback(
    (step: 1 | -1) => {
      setDirection(step);
      setOpenIndex((current) =>
        current === null ? current : (current + step + count) % count,
      );
    },
    [count],
  );

  // Teclado, trava de rolagem e foco do modal.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.dataset.modal = "open";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowRight") go(1);
      else if (event.key === "ArrowLeft") go(-1);
      else if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      delete document.documentElement.dataset.modal;
    };
  }, [isOpen, close, go]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) go(1);
    else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) go(-1);
  };

  const t = (duration: number) => ({ duration: reduced ? 0.01 : duration, ease: EASE });

  const tileVariants: Variants = {
    rest: {},
    hover: {},
  };
  const imageVariants: Variants = {
    rest: { scale: 1, transition: t(0.8) },
    hover: { scale: 1.06, transition: t(0.8) },
  };
  const overlayVariants: Variants = {
    rest: { opacity: 0, transition: t(0.4) },
    hover: { opacity: 1, transition: t(0.4) },
  };
  const lineVariants: Variants = {
    rest: { scaleX: 0, transition: t(0.5) },
    hover: { scaleX: 1, transition: t(0.6) },
  };
  const captionVariants: Variants = {
    rest: { opacity: 0, y: 8, transition: t(0.3) },
    hover: { opacity: 1, y: 0, transition: { ...t(0.5), delay: 0.08 } },
  };
  const iconVariants: Variants = {
    rest: { opacity: canHover ? 0 : 1, scale: canHover ? 0.8 : 1, transition: t(0.3) },
    hover: { opacity: 1, scale: 1, transition: t(0.4) },
  };

  const slide: Variants = {
    enter: (dir: number) => ({ x: reduced ? 0 : dir * 60, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: t(0.5) },
    exit: (dir: number) => ({ x: reduced ? 0 : dir * -60, opacity: 0, transition: t(0.3) }),
  };

  const current = openIndex !== null ? items[openIndex] : null;

  return (
    <>
      <ul className="gallery" role="list">
        {items.map((item, index) => (
          <li key={item.id} className="gallery__cell">
            <motion.button
              type="button"
              className="gallery__tile"
              aria-label={`Ampliar foto: ${item.caption}`}
              initial="rest"
              animate="rest"
              whileHover={canHover ? "hover" : undefined}
              whileTap={canHover ? undefined : { scale: 0.985 }}
              variants={tileVariants}
              onClick={(event) => open(index, event.currentTarget)}
            >
              <motion.div className="gallery__media" variants={imageVariants}>
                <ParallaxImage
                  src={item.src}
                  alt={item.alt}
                  strength={7}
                  zoom={0.04}
                  sizes="(min-width: 1024px) 40vw, 50vw"
                  placeholderLabel={item.caption.toUpperCase()}
                />
              </motion.div>

              <motion.span className="gallery__overlay" variants={overlayVariants} />
              <motion.span className="gallery__line" variants={lineVariants} />
              <motion.span className="gallery__caption" variants={captionVariants}>
                {item.caption}
              </motion.span>
              <motion.span className="gallery__icon" variants={iconVariants}>
                <ZoomIcon />
              </motion.span>
            </motion.button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {current && (
          <motion.div
            key="lightbox"
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`Galeria: ${current.caption}`}
            ref={dialogRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: t(0.35) }}
            exit={{ opacity: 0, transition: t(0.3) }}
            onClick={close}
          >
            <button
              ref={closeRef}
              type="button"
              className="lightbox__close"
              aria-label="Fechar galeria"
              onClick={(event) => {
                event.stopPropagation();
                close();
              }}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M5 5l14 14M19 5 5 19" />
              </svg>
            </button>

            <div className="lightbox__counter" aria-live="polite">
              {String((openIndex ?? 0) + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </div>

            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.figure
                key={current.id}
                className="lightbox__figure"
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                drag={canHover ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={onDragEnd}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="lightbox__image">
                  <Photo
                    src={current.src}
                    alt={current.alt}
                    sizes="100vw"
                    priority
                    placeholderLabel={current.caption.toUpperCase()}
                  />
                </div>
                <figcaption className="lightbox__caption">
                  <span className="lightbox__caption-line" />
                  {current.caption}
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            {count > 1 && (
              <>
                <button
                  type="button"
                  className="lightbox__nav lightbox__nav--prev"
                  aria-label="Foto anterior"
                  onClick={(event) => {
                    event.stopPropagation();
                    go(-1);
                  }}
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m15 5-7 7 7 7" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="lightbox__nav lightbox__nav--next"
                  aria-label="Próxima foto"
                  onClick={(event) => {
                    event.stopPropagation();
                    go(1);
                  }}
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m9 5 7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
