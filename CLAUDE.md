# Doce Café — Documentação da marca

Guia de referência para qualquer trabalho neste projeto. Antes de escrever copy, código ou escolher um asset, confira aqui.

**Como ler:** 🟢 Confirmado (decisão fechada) · 🟡 Proposto (direção recomendada, não validada com a cliente) · 🔴 Pendente (falta material/decisão antes de publicar).

## Identidade

- **Nome:** Doce Café
- **Local:** São Gonçalo do Pará, MG — R. Platina, 548, Nossa Senhora Aparecida 🟢
- **Posicionamento:** Café · Afeto · Experiências 🟢
- **Tagline atual:** "Pequenos momentos, grandes prazeres." 🟡 (conceito provisório, não validado)
- **Desenvolvido por:** Zag (crédito no rodapé) 🟢

## Contato e redes

- Telefone/ligação: `tel:+5537998417340` 🟢
- WhatsApp: mesmo número? 🔴 (confirmar se é WhatsApp Business antes de publicar link)
- Instagram: [@docecafesgp](https://instagram.com/docecafesgp) 🟢
- Facebook: oficial, ativo 🟢
- Horários de funcionamento: 🔴 (os encontrados em diretório externo não são oficiais — exibir sempre como "em confirmação", nunca como fato até a proprietária confirmar)

## Tom de voz

🔴 **Ainda não definido.** Decisões a tomar com a cliente/você (ver perguntas abertas abaixo): grau de informalidade, se usa primeira pessoa ("nós") ou impessoal, se incorpora expressões regionais.

## Identidade visual

**Paleta** 🟢 (já em uso no código, `src/index.css`)
| Token | Hex | Uso |
|---|---|---|
| `creme` | `#f4efe6` | fundo claro, texto sobre fundo escuro |
| `rose` | `#c9afa5` | destaque secundário, eyebrow text |
| `canela` | `#805b4b` | destaque primário, foco |
| `cafe` | `#49342d` | fundo escuro (hero), texto sobre creme |
| `grafite` | `#282522` | texto principal, rodapé |

**Tipografia** 🟢
- Heading: Playfair Display / Cormorant Garamond (serif, itálico) — títulos de seção
- Corpo: Manrope / DM Sans — texto corrido

**Logo** 🔴 Pendente — só vimos a aplicação numa foto de produto, sem o arquivo original em alta resolução (SVG/PNG transparente). Até chegar, o header usa o texto "doce café." e o favicon é o padrão do Vite.

## Regra de fotografia (inegociável — pedido explícito da cliente)

Nunca ilustração ou ícone estilizado para produto, ambiente ou pessoas, e nunca foto de banco de imagens público (Pexels ou equivalente) — só foto real do Doce Café, nesta ordem de preferência:

1. **Foto profissional contratada**, alta resolução, com autorização de uso — o objetivo final de toda seção.
2. **Foto real da cliente** (Instagram @docecafesgp, ou enviada diretamente — ver `imagens-vitrine/`) — aceitável como provisória mesmo em baixa/média resolução, mas sempre comentada no código como "provisória, trocar antes de publicar".

Atualmente (16/11/2026) todas as fotos do site são reais da cliente, organizadas em `src/assets/fotos-cliente/` (Instagram) e `src/assets/fotos-vitrine/` (fotos enviadas diretamente, categorizadas em `imagens-vitrine/` por tipo: bolos/doces, lanches/salgados, cafés, bebidas, ambiente). Nenhuma foto de banco público restante.

## Regras de animação

- Biblioteca padrão: [Motion](https://motion.dev/docs). GSAP só se uma seção exigir timeline complexa que o Motion não resolve.
- `prefers-reduced-motion` sempre respeitado, com equivalente estático funcional.
- Sem scroll sequestrado, sem autoplay com áudio, sem carrossel sem controles.
- Animação de entrada dispara uma vez por elemento (não repete a cada scroll para cima/baixo).
- Universo usa um "cartão com profundidade" (`src/components/DepthCard.tsx`, inclina com o cursor + brilho que segue o mouse) e Experiência um carrossel com inclinação 3D + brilho diagonal (`src/components/FlipCarousel.tsx`) — ambos inspirados em componentes pagos do React Bits Pro (Depth Card / Lenticular Carousel), mas reimplementados do zero com Motion porque o código-fonte original é fechado/pago. Ambos caem para estático em `prefers-reduced-motion`.

## Conteúdo e integridade de dados

Regra de ouro deste projeto: **nenhuma informação não confirmada é publicada como fato.** Horários, WhatsApp, nomes de categoria de cardápio, preços e depoimentos — tudo isso ou vem confirmado diretamente da proprietária, ou aparece marcado na tela como "em confirmação"/"(exemplo)". Nunca usar nota ou dado de diretório externo (Google, Restaurant Guru etc.) como se fosse oficial.

## Stack técnico

Vite + React + TypeScript + Tailwind v4 + Motion. Lint: oxlint. Ver `README.md` para comandos.

## Status das seções (ver histórico completo em `../Doce-Cafe-Secoes-Animacoes.md` e `AUDITORIA-2026-11-15.md`)

Todas as 10 seções construídas e navegáveis. Pendências antes de publicar:

- [ ] Logotipo original (SVG/PNG transparente)
- [ ] Fotos profissionais em alta resolução, autorizadas (produtos, ambiente, fachada)
- [ ] Texto de história da marca (entrevista com a proprietária)
- [ ] Cardápio/categorias e preços validados
- [ ] Horários e canal de WhatsApp confirmados
- [ ] Depoimento(s) reais e autorizados (ou remover a seção "Prova social")
- [ ] Tom de voz definido (ver abaixo)

## Perguntas abertas para a cliente/você decidir agora
