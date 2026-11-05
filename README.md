# Barber VIP — Site (Next.js + Framer Motion)

Implementação das seções **8 (Animações Premium)**, **9 (Diretrizes das animações)** e **10 (Responsividade Mobile First)** do briefing.

## Como rodar

```bash
npm install
cp .env.example .env.local   # preencha o link do AppBarber
npm run dev                  # http://localhost:3000
npm run build && npm start   # produção
```

> Este projeto foi gerado sem acesso à internet para instalar pacotes, então **ainda não foi compilado nem testado em navegador**. Rode `npm install`, `npm run typecheck` e `npm run build` antes de publicar e teste em um iPhone, um Android e um desktop.

## O que você precisa preencher

| O quê | Onde |
|---|---|
| Link oficial do AppBarber | `.env.local` → `NEXT_PUBLIC_APPBARBER_URL` (enquanto vazio, os botões AGENDAR rolam até a seção final) |
| Logotipo original | colocar em `public/images/` e definir `SITE.logoSrc` em `src/lib/config.ts` (enquanto vazio, aparece um wordmark provisório em texto) |
| Fotos reais da Barber VIP | `public/images/` e campo `src` em `src/data/content.ts` (hero vertical e horizontal, serviços, essência, club, equipe, galeria) |
| Preços, planos, equipe, textos | `src/data/content.ts` (os textos atuais são **provisórios**; preço só aparece se `price` for preenchido) |

Sem `src`, cada foto mostra um bloco provisório identificado. Nenhuma foto de terceiros é usada.

O WhatsApp (`5531985943246`) e a mensagem do briefing já estão em `src/lib/config.ts`.

## Componentes reutilizáveis (`src/components/animations`)

- **CinematicPreloader** — tela preta, logo com fade/escala, brilho metálico, linha vermelha e frase "EXCELÊNCIA EM CADA DETALHE.". ≈1,7 s no desktop e ≈1 s no mobile, uma vez por sessão (`sessionStorage`), por cima do conteúdo (não bloqueia o carregamento), pula com um toque e não aparece com `prefers-reduced-motion`.
- **ParallaxImage** — `useScroll` + `useTransform` (só `transform`). Movimento vertical sutil e zoom discreto. Intensidade: desktop 100%, tablet 65%, mobile 35%. Desligado com `prefers-reduced-motion` e em aparelhos/conexões limitados (poucos núcleos, pouca memória, economia de dados).
- **RevealText** — linhas que sobem com máscara, `staggerChildren`, linhas vermelhas depois das brancas, disparo ao entrar na tela. Palavra por palavra no desktop/tablet e por linha no mobile. No HERO espera o fim da intro.
- **InteractiveGallery** — grade assimétrica (padrão de 7 fotos em 12 colunas no desktop; 3 colunas no tablet; 2 no mobile). Hover: zoom, overlay, linha vermelha, legenda e ícone de lupa. Toque: lupa sempre visível e toque abre tela cheia com gesto de deslizar. Modal fecha por botão, ESC ou clique fora, e navega por setas/teclado.

## Responsividade

Mobile first, com breakpoints em 360 / 768 / 1024 / 1440 px. Header mobile com menu em tela cheia (fecha ao escolher uma seção), hero vertical com CTAs de 48 px, serviços/planos/equipe em carrossel com snap no mobile, e **barra fixa inferior** (AGENDAR + WHATSAPP) só em smartphones, com área segura do iPhone, oculta quando o menu ou o modal estão abertos.

## Checklist de testes (seção 12 do briefing)

- [ ] Sem rolagem horizontal em 320, 360, 390, 430, 768, 1024 e 1440 px
- [ ] Menu mobile abre, fecha e some a barra inferior
- [ ] AGENDAR abre o AppBarber; WHATSAPP abre a conversa com a mensagem certa
- [ ] Galeria: ESC, clique fora, setas, swipe no celular
- [ ] Com "reduzir movimento" ativado no sistema: sem intro, sem parallax, textos estáticos
- [ ] Lighthouse mobile (Core Web Vitals) depois de colocar as fotos reais (use JPG/WebP otimizados)
