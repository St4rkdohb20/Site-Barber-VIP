"use client";

import { useEffect, useState } from "react";
import { KEYS } from "@/lib/config";

/**
 * Fica `true` quando a intro terminou (ou não será exibida).
 * Usado para sincronizar o texto do HERO com a saída do preloader.
 */
export function useIntroReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset.intro === "seen") {
      setReady(true);
      return;
    }
    const onDone = () => setReady(true);
    window.addEventListener(KEYS.introDoneEvent, onDone);
    // Garantia: nunca deixa o conteúdo escondido caso o evento não chegue.
    const fallback = window.setTimeout(onDone, 3500);
    return () => {
      window.removeEventListener(KEYS.introDoneEvent, onDone);
      window.clearTimeout(fallback);
    };
  }, []);

  return ready;
}
