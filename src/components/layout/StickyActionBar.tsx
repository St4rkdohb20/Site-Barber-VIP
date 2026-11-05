import { Button } from "@/components/ui/Button";
import { SITE, whatsappUrl } from "@/lib/config";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.2-1.4A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.08.82.82-3-.2-.31a8.2 8.2 0 1 1 6.96 3.82Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.22-.09-.39-.12-.55.12-.16.25-.63.8-.78.96-.14.17-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.7-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03 0 1.2.87 2.35 1 2.51.12.17 1.71 2.6 4.14 3.65.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.46-.6 1.66-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}

/**
 * Barra de ação fixa exclusiva para smartphones.
 * (A visibilidade por breakpoint, a área segura do iPhone e o ocultamento
 *  quando um menu/modal está aberto ficam em globals.css.)
 */
export function StickyActionBar() {
  return (
    <div className="action-bar" role="region" aria-label="Ações rápidas">
      <Button href={SITE.appBarberUrl} className="action-bar__main">
        AGENDAR
      </Button>
      <Button
        href={whatsappUrl()}
        variant="whatsapp"
        className="action-bar__wa"
        ariaLabel="Chamar no WhatsApp"
      >
        <WhatsAppIcon />
        WHATSAPP
      </Button>
    </div>
  );
}
