import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import { KEYS } from "@/lib/config";
import "./globals.css";

const display = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Barber VIP — Mais que um corte. Uma experiência VIP.",
  description:
    "Excelência em cada detalhe. Seu estilo merece uma experiência à altura. Agende seu horário na Barber VIP.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // necessário para respeitar a área segura do iPhone
  themeColor: "#050505",
};

/** Marca a intro como já vista antes da hidratação, evitando "piscar" o preloader. */
const introGuard = `try{if(sessionStorage.getItem("${KEYS.introSeen}"))document.documentElement.dataset.intro="seen"}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: introGuard }} />
        {children}
      </body>
    </html>
  );
}
