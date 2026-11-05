import type { ReactNode } from "react";
import { isExternal } from "@/lib/config";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "gold" | "whatsapp";
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

/** Link com aparência de botão (altura mínima de 48px para toque). */
export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
  ariaLabel,
}: ButtonProps) {
  const external = isExternal(href);
  return (
    <a
      href={href}
      className={`btn btn--${variant} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
