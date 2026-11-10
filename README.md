# CK Club — Website

Protótipo front-end responsivo do website oficial da CK Club, em HTML, CSS e JavaScript puro.

## Como visualizar
1. Extraia o arquivo ZIP.
2. Abra `index.html` em um navegador moderno.
3. Para desenvolvimento local, também pode usar a extensão Live Server do VS Code.

Não há processo de build ou dependências npm.

## O que já está implementado
- Layout responsivo com abordagem mobile-first.
- Header sticky e menu mobile funcional.
- Navegação por âncoras.
- Seções institucionais, clube, serviços, galeria, localização e FAQ.
- FAQ expansível.
- Estados de interação e animações leves de entrada.
- Respeito a `prefers-reduced-motion`.
- SEO básico, description e Open Graph.
- Link de rota para Google Maps baseado no endereço fornecido.

## Importante: o que ainda NÃO está conectado
Este pacote é a primeira implementação visual e front-end. Não deve ser publicado como sistema de reservas pronto.

- O bloco de agendamento está intencionalmente desativado até a integração com uma agenda real.
- Não existe backend, banco de dados, autenticação, gestão de disponibilidade ou prevenção de conflitos.
- WhatsApp e Instagram oficiais ainda não foram informados.
- Logo original, fotos e vídeos reais ainda não foram fornecidos. Os elementos CK e os blocos visuais são recursos tipográficos/conceituais, não substituem o logotipo nem fotografias oficiais.
- Serviços, profissionais, preços, planos, avaliações, políticas e regras comerciais permanecem sem dados para evitar informações inventadas.
- O mapa atual é uma composição visual com link para abrir a busca do endereço no Google Maps, não um mapa incorporado nem uma validação de geolocalização.

## Próxima etapa para transformar em site oficial
1. Substituir a assinatura tipográfica provisória pelo arquivo oficial do monograma CK.
2. Receber fotos e vídeos autorizados da barbearia, equipe, serviços e resultados.
3. Inserir catálogo oficial de serviços, duração e preços.
4. Inserir profissionais e regras de atendimento.
5. Definir WhatsApp, Instagram e canal de contato.
6. Escolher a plataforma de agendamento ou implementar backend próprio com banco de dados e bloqueio transacional de horários.
7. Completar política de privacidade, termos, consentimentos e revisão LGPD.
8. Testar em dispositivos reais e publicar em domínio com HTTPS.

## Estrutura
- `index.html` — conteúdo e estrutura semântica.
- `styles.css` — identidade visual, layout e responsividade.
- `script.js` — menu, FAQ e interações.
- `assets/` — pasta reservada para os arquivos oficiais de marca e mídia.
