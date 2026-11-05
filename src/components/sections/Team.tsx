import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { TEAM } from "@/data/content";

/** Equipe: fotos verticais; carrossel com snap no mobile, grade no desktop. */
export function Team() {
  return (
    <section id="equipe" className="section" aria-labelledby="equipe-title">
      <div className="container">
        <p className="eyebrow">Equipe</p>
        <h2 id="equipe-title" className="section__title">
          Quem cuida do seu estilo
        </h2>
      </div>

      <ul className="team" role="list">
        {TEAM.map((member) => (
          <li key={member.id} className="team-card">
            <div className="team-card__photo">
              <ParallaxImage
                src={member.image.src}
                alt={member.image.alt}
                strength={8}
                zoom={0.05}
                sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 72vw"
                placeholderLabel={member.name.toUpperCase()}
              />
            </div>
            <div className="team-card__info">
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
