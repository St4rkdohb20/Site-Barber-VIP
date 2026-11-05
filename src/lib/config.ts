/**
 * Configuração central da Barber VIP.
 * Tudo que o cliente precisa trocar (links, logo, número) fica aqui.
 */
export const SITE = {
  name: "Barber VIP",

  /**
   * Link oficial da plataforma AppBarber.
   * Defina NEXT_PUBLIC_APPBARBER_URL no arquivo .env.local.
   * Enquanto não estiver definido, o botão rola até a seção de conversão
   * (nunca fica "morto").
   */
  appBarberUrl: process.env.NEXT_PUBLIC_APPBARBER_URL ?? "#conversao",

  whatsappNumber: "5531985943246",
  whatsappMessage:
    "Olá! Conheci a Barber VIP pelo site e gostaria de agendar um horário.",

  /**
   * Caminho do logotipo original (PNG/SVG com fundo transparente),
   * por exemplo "/images/logo.png". Vazio = usa um wordmark de texto provisório.
   */
  logoSrc: "",
} as const;

export const KEYS = {
  introSeen: "bvip:intro-seen",
  introDoneEvent: "bvip:intro-done",
} as const;

export function whatsappUrl(message: string = SITE.whatsappMessage): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function isExternal(url: string): boolean {
  return /^https?:\/\//i.test(url);
}
