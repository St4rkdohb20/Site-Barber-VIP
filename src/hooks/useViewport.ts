"use client";

import { useEffect, useState } from "react";

export type Viewport = "mobile" | "tablet" | "desktop";

function useMediaQuery(query: string, initial: boolean): boolean {
  const [matches, setMatches] = useState(initial);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** Mobile first: no primeiro render assumimos "mobile". */
export function useViewport(): Viewport {
  const isDesktop = useMediaQuery("(min-width: 1024px)", false);
  const isTablet = useMediaQuery("(min-width: 768px)", false);
  if (isDesktop) return "desktop";
  if (isTablet) return "tablet";
  return "mobile";
}

/** true quando o dispositivo tem mouse/hover de verdade. */
export function useCanHover(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)", false);
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)", false);
}

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

/** Dispositivo/conexão limitados: desativa efeitos caros (parallax). */
export function useLowPower(): boolean {
  const [low, setLow] = useState(false);

  useEffect(() => {
    const nav = navigator as NavigatorWithHints;
    const fewCores =
      typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 2;
    const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2;
    const saveData = nav.connection?.saveData === true;
    setLow(fewCores || lowMemory || saveData);
  }, []);

  return low;
}
