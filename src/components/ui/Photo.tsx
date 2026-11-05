import Image from "next/image";

type PhotoProps = {
  src?: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  objectPosition?: string;
  /** Texto do bloco provisório quando ainda não há foto real. */
  placeholderLabel?: string;
};

/**
 * Foto otimizada (next/image, lazy por padrão).
 * Sem `src`, mostra um bloco provisório claramente identificado —
 * nunca uma foto de terceiros.
 */
export function Photo({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  className = "",
  objectPosition = "center",
  placeholderLabel = "FOTO REAL DA BARBER VIP",
}: PhotoProps) {
  if (!src) {
    return (
      <div
        className={`photo-placeholder ${className}`}
        role="img"
        aria-label={`${alt} (foto provisória)`}
      >
        <span>{placeholderLabel}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={className}
      style={{ objectFit: "cover", objectPosition }}
    />
  );
}
