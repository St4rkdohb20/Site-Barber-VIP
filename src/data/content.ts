/**
 * Conteúdo do site.
 *
 * IMPORTANTE:
 * - Todas as imagens abaixo estão vazias de propósito. Coloque as fotografias REAIS
 *   da Barber VIP em /public/images e preencha o campo `src` (ex.: "/images/hero-mobile.jpg").
 *   Enquanto `src` estiver vazio, o site mostra um bloco provisório identificado.
 * - Não use fotos de terceiros como se fossem trabalhos da barbearia.
 * - Textos de serviços, planos e equipe são PROVISÓRIOS: revise com o cliente.
 * - Preços só aparecem quando o campo `price` for preenchido (apenas valores confirmados).
 */

export type ImageRef = { src?: string; alt: string };

export const NAV = [
  { label: "Serviços", href: "#servicos" },
  { label: "Nossa Essência", href: "#essencia" },
  { label: "VIP Club", href: "#club" },
  { label: "Equipe", href: "#equipe" },
  { label: "Portfólio", href: "#portfolio" },
] as const;

export const HERO = {
  mobile: {
    src: "", // foto vertical de um barbeiro trabalhando
    alt: "Barbeiro da Barber VIP realizando um corte",
  },
  desktop: {
    src: "", // foto horizontal ampla
    alt: "Ambiente e barbeiros da Barber VIP",
  },
} as const;

export type Service = {
  id: string;
  name: string;
  description: string;
  price?: string; // ex.: "R$ 60" — somente quando confirmado
  image: ImageRef;
};

export const SERVICES: Service[] = [
  {
    id: "corte",
    name: "Corte Masculino",
    description: "Corte sob medida para o seu estilo, com acabamento impecável.",
    image: { alt: "Corte masculino na Barber VIP" },
  },
  {
    id: "degrade",
    name: "Degradê",
    description: "Transições precisas e limpas, do clássico ao moderno.",
    image: { alt: "Degradê feito na Barber VIP" },
  },
  {
    id: "barba",
    name: "Barba",
    description: "Modelagem, toalha quente e cuidado em cada detalhe.",
    image: { alt: "Barba feita na Barber VIP" },
  },
  {
    id: "acabamento",
    name: "Acabamento",
    description: "Contornos e finalização que elevam o resultado do corte.",
    image: { alt: "Acabamento feito na Barber VIP" },
  },
];

export const ESSENCE = {
  eyebrow: "Nossa Essência",
  text: [
    "Na Barber VIP, cada atendimento é pensado para valorizar quem você é. Técnica, atenção e um ambiente à altura para você sair daqui confiante.",
    "Não entregamos apenas um corte: entregamos uma experiência cuidadosa, do primeiro ao último detalhe.",
  ],
  photoMain: { alt: "Interior da Barber VIP" } as ImageRef,
  photoSecondary: { alt: "Barbeiro da Barber VIP em atendimento" } as ImageRef,
};

export type ClubPlan = {
  id: string;
  name: string;
  benefits: string[];
  price?: string; // ex.: "R$ 99/mês" — somente quando confirmado
  featured?: boolean;
};

export const CLUB = {
  eyebrow: "Barber VIP Club",
  intro:
    "Assinatura para quem quer estar sempre em dia com o visual, com prioridade e benefícios exclusivos.",
  background: { alt: "Atendimento na Barber VIP" } as ImageRef,
  plans: [
    {
      id: "essencial",
      name: "VIP Essencial",
      benefits: ["Cortes mensais", "Horário prioritário", "Condições especiais"],
    },
    {
      id: "premium",
      name: "VIP Premium",
      featured: true,
      benefits: ["Corte + barba", "Prioridade na agenda", "Benefícios exclusivos"],
    },
    {
      id: "black",
      name: "VIP Black",
      benefits: ["Atendimento completo", "Prioridade máxima", "Vantagens do Club"],
    },
  ] as ClubPlan[],
};

export type TeamMember = { id: string; name: string; role: string; image: ImageRef };

export const TEAM: TeamMember[] = [
  { id: "b1", name: "Barbeiro 01", role: "Barbeiro", image: { alt: "Barbeiro da equipe Barber VIP" } },
  { id: "b2", name: "Barbeiro 02", role: "Barbeiro", image: { alt: "Barbeiro da equipe Barber VIP" } },
  { id: "b3", name: "Barbeiro 03", role: "Barbeiro", image: { alt: "Barbeiro da equipe Barber VIP" } },
];

export type GalleryItem = {
  id: string;
  src?: string;
  alt: string;
  caption: string;
};

/**
 * O layout assimétrico do desktop se repete a cada 7 fotos
 * (use múltiplos de 7 para fechar a grade sem espaços vazios).
 */
export const GALLERY: GalleryItem[] = [
  { id: "g1", alt: "Degradê feito na Barber VIP", caption: "Degradê" },
  { id: "g2", alt: "Corte masculino feito na Barber VIP", caption: "Corte masculino" },
  { id: "g3", alt: "Barba feita na Barber VIP", caption: "Barba" },
  { id: "g4", alt: "Acabamento feito na Barber VIP", caption: "Acabamento" },
  { id: "g5", alt: "Barbeiro da Barber VIP trabalhando", caption: "Profissionais em ação" },
  { id: "g6", alt: "Ambiente da Barber VIP", caption: "Nosso ambiente" },
  { id: "g7", alt: "Equipe Barber VIP", caption: "Equipe Barber VIP" },
];
