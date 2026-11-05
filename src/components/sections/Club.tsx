import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { RevealText } from "@/components/animations/RevealText";
import { Button } from "@/components/ui/Button";
import { CLUB } from "@/data/content";
import { whatsappUrl } from "@/lib/config";

/** Barber VIP Club: planos em cards verticais (carrossel com snap no mobile). */
export function Club() {
  return (
    <section id="club" className="section club" aria-labelledby="club-title">
      <div className="club__bg" aria-hidden="true">
        <ParallaxImage
          src={CLUB.background.src}
          alt={CLUB.background.alt}
          strength={14}
          zoom={0.08}
          sizes="100vw"
          placeholderLabel="FOTO — BARBER VIP CLUB"
        />
        <div className="club__veil" />
      </div>

      <div className="container club__head">
        <p className="eyebrow eyebrow--gold">{CLUB.eyebrow}</p>
        <span id="club-title" className="sr-only">
          Seja VIP. Todos os dias.
        </span>
        <RevealText
          as="h2"
          className="section__title section__title--xl"
          lines={[
            { text: "SEJA VIP.", tone: "white" },
            { text: "TODOS OS DIAS.", tone: "red" },
          ]}
        />
        <p className="club__intro">{CLUB.intro}</p>
      </div>

      <ul className="plans" role="list">
        {CLUB.plans.map((plan) => (
          <li
            key={plan.id}
            className={`plan ${plan.featured ? "plan--featured" : ""}`}
          >
            {plan.featured && <span className="plan__badge">MAIS ESCOLHIDO</span>}
            <h3 className="plan__name">{plan.name}</h3>
            <p className="plan__price">{plan.price ?? "Consulte os valores"}</p>
            <ul className="plan__benefits" role="list">
              {plan.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
            <Button
              href={whatsappUrl(
                `Olá! Conheci a Barber VIP pelo site e quero saber mais sobre o plano ${plan.name} do Barber VIP Club.`,
              )}
              variant={plan.featured ? "gold" : "ghost"}
              className="plan__btn"
            >
              ASSINAR
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}
