import { Logo } from "@/components/ui/Logo";
import { NAV } from "@/data/content";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <Logo />
        <nav className="footer__nav" aria-label="Rodapé">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <p className="footer__copy">
          © {new Date().getFullYear()} Barber VIP. Excelência em cada detalhe.
        </p>
      </div>
    </footer>
  );
}
