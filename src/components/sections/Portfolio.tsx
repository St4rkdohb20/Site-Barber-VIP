import { InteractiveGallery } from "@/components/animations/InteractiveGallery";
import { RevealText } from "@/components/animations/RevealText";
import { GALLERY } from "@/data/content";

export function Portfolio() {
  return (
    <section id="portfolio" className="section" aria-labelledby="portfolio-title">
      <div className="container">
        <p className="eyebrow">Portfólio</p>
        <span id="portfolio-title" className="sr-only">
          Cada detalhe importa
        </span>
        <RevealText
          as="h2"
          className="section__title section__title--xl"
          lines={[
            { text: "CADA DETALHE", tone: "white" },
            { text: "IMPORTA.", tone: "red" },
          ]}
        />
        <InteractiveGallery items={GALLERY} />
      </div>
    </section>
  );
}
