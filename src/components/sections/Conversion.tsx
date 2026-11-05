import { RevealText } from "@/components/animations/RevealText";
import { Button } from "@/components/ui/Button";
import { SITE, whatsappUrl } from "@/lib/config";

/** Fechamento da página: CTA de agendamento + WhatsApp. */
export function Conversion() {
  return (
    <section id="conversao" className="section conversion" aria-labelledby="conversao-title">
      <div className="container conversion__inner">
        <span id="conversao-title" className="sr-only">
          Seu próximo corte começa aqui
        </span>
        <RevealText
          as="h2"
          className="section__title section__title--xl"
          lines={[
            { text: "SEU PRÓXIMO CORTE", tone: "white" },
            { text: "COMEÇA AQUI.", tone: "red" },
          ]}
        />
        <p className="conversion__text">
          Agende seu horário em poucos toques e viva a experiência Barber VIP.
        </p>
        <div className="conversion__ctas">
          <Button href={SITE.appBarberUrl}>AGENDAR HORÁRIO</Button>
          <Button href={whatsappUrl()} variant="whatsapp">
            CHAMAR NO WHATSAPP
          </Button>
        </div>
      </div>
    </section>
  );
}
