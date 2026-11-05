import { SITE } from "@/lib/config";

type LogoProps = { className?: string };

/**
 * Logotipo da marca. Com `SITE.logoSrc` definido usa o arquivo original;
 * caso contrário, exibe um wordmark provisório em texto.
 */
export function Logo({ className = "" }: LogoProps) {
  if (SITE.logoSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={SITE.logoSrc} alt={SITE.name} className={`logo-img ${className}`} />
    );
  }
  return (
    <span className={`wordmark ${className}`} aria-label={SITE.name}>
      BARBER <b>VIP</b>
    </span>
  );
}
