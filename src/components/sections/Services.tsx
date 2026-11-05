import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/data/content";
import { SITE } from "@/lib/config";

/**
 * Serviços: carrossel horizontal com snap no mobile,
 * 2 colunas no tablet e 4 no desktop.
 */
export function Services() {
  return (
    <section id="servicos" className="section" aria-labelledby="servicos-title">
      <div className="container">
        <p className="eyebrow">Serviços</p>
        <h2 id="servicos-title" className="section__title">
          O que fazemos de melhor
        </h2>
      </div>

      <ul className="services" role="list">
        {SERVICES.map((service) => (
          <li key={service.id} className="service-card">
            <div className="service-card__media">
              <Photo
                src={service.image.src}
                alt={service.image.alt}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 78vw"
                placeholderLabel={service.name.toUpperCase()}
              />
            </div>
            <div className="service-card__body">
              <h3 className="service-card__name">{service.name}</h3>
              <p className="service-card__text">{service.description}</p>
              {service.price && <p className="service-card__price">{service.price}</p>}
              <Button href={SITE.appBarberUrl} variant="ghost" className="service-card__btn">
                AGENDAR
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
