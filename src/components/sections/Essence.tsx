import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { RevealText } from "@/components/animations/RevealText";
import { ESSENCE } from "@/data/content";

/** Nossa Essência: duas fotos em profundidades diferentes + texto. */
export function Essence() {
  return (
    <section id="essencia" className="section essence" aria-labelledby="essencia-title">
      <div className="container essence__grid">
        <div className="essence__text">
          <p className="eyebrow">{ESSENCE.eyebrow}</p>
          <span id="essencia-title" className="sr-only">
            Seu estilo é sua identidade
          </span>
          <RevealText
            as="h2"
            className="section__title section__title--xl"
            lines={[
              { text: "SEU ESTILO", tone: "white" },
              { text: "É SUA IDENTIDADE.", tone: "red" },
            ]}
          />
          {ESSENCE.text.map((paragraph) => (
            <p key={paragraph} className="essence__p">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="essence__photos">
          <ParallaxImage
            className="essence__photo essence__photo--main"
            src={ESSENCE.photoMain.src}
            alt={ESSENCE.photoMain.alt}
            strength={12}
            zoom={0.08}
            sizes="(min-width: 1024px) 40vw, 90vw"
            placeholderLabel="FOTO — AMBIENTE"
          />
          <ParallaxImage
            className="essence__photo essence__photo--second"
            src={ESSENCE.photoSecondary.src}
            alt={ESSENCE.photoSecondary.alt}
            strength={18}
            zoom={0.06}
            sizes="(min-width: 1024px) 22vw, 50vw"
            placeholderLabel="FOTO — DETALHE"
          />
        </div>
      </div>
    </section>
  );
}
