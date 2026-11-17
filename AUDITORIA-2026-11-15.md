# Auditoria — Doce Café (doce-cafe-site) — 15/11/2026

## Veredito

**Pronto com ressalvas.** A base técnica (código, acessibilidade, segurança) está sólida e os bugs reais encontrados já foram corrigidos nesta sessão. O que falta para publicar não é código: são materiais da cliente (logo, fotos, cardápio, horários confirmados).

## Placar

| Área | Nota (0–10) | Críticos | Importantes |
|---|---|---|---|
| Segurança | 9 | 0 | 0 |
| Permissões por perfil | N/A | — | — |
| Bugs | 9 | 0 (3 corrigidos nesta sessão) | 0 |
| Boas práticas (a11y, perf, mobile, LGPD) | 8 | 0 (2 corrigidos nesta sessão) | 2 |

*Permissões por perfil é N/A: o site é institucional, sem login, conta ou dado de usuário — só existe o perfil "visitante", igual para todos.*

## 🔴 Corrigidos nesta sessão (bloqueavam publicação)

**A1 — Build de produção quebrado.**
`npm run build` falhava com erro de TypeScript em 4 arquivos (`Essencia.tsx:22`, `Experiencia.tsx:63`, `Hero.tsx:47`, `Universo.tsx:66`): o array `ease: [0.22, 1, 0.36, 1]` era inferido como `number[]` em vez da tupla exata que a biblioteca Motion exige para curvas de animação.
Impacto: o site não gerava uma versão de produção — rodava só no servidor de desenvolvimento.
Correção: adicionado `as const` nos arrays de easing. `npm run build` passa limpo agora.

**A2 — Contraste de texto insuficiente (Visite-nos).**
"Horários de funcionamento: em confirmação com a proprietária." usava `text-grafite/60` sobre fundo creme → contraste calculado de **3,94:1** (abaixo do mínimo de 4,5:1 do WCAG AA para texto normal).
Correção: opacidade ajustada para `/70` → contraste agora ≈ 5,3:1.

**A3 — Contraste de texto insuficiente (Rodapé).**
A linha de copyright/crédito ("© 2026 Doce Café...", "Desenvolvido por Zag") usava `text-creme/50` sobre fundo grafite → contraste de **4,44:1**, abaixo do mínimo.
Correção: opacidade ajustada para `/65` → contraste agora ≈ 6,5:1.

## 🟠 Corrigidos nesta sessão (não bloqueavam, mas eram o padrão errado)

**B1 — Hooks de detecção de hover/viewport usando `useEffect` + `setState`.**
`useCanHover` (Universo.tsx) e `useParallaxEnabled` (Experiencia.tsx) sincronizavam com `window.matchMedia` via `useEffect` chamando `setState` diretamente — padrão que o React recomenda evitar (pode gerar renders em cascata) e que o lint (`oxlint`) sinalizou.
Correção: reescritos com `useSyncExternalStore`, a forma correta do React para assinar APIs externas do navegador. Comportamento confirmado idêntico (testado hover no desktop e pulso no mobile).

**B2 — `new Date().getFullYear()` chamado durante a renderização (Footer).**
Função impura dentro do componente — inofensivo numa SPA sem SSR, mas o lint aponta corretamente o padrão. Movido para constante de módulo (`ANO_ATUAL`), calculado uma vez.

## 🟡 Melhorias (não bloqueiam, registrar para depois)

1. **Favicon ainda é o padrão do Vite.** Trocar pelo ícone real da marca assim que o logo chegar.
2. **Sem CSP configurado.** Definir ao escolher hospedagem (meta tag se for GitHub Pages; headers se for Vercel/Netlify) — ver seção "Deploy" de `boas-praticas-web`.
3. **Terceiros no site:** Google Maps (iframe) e Google Fonts podem definir cookies/registrar IP. Como não há coleta própria de dados, isso não exige banner de consentimento hoje, mas vale uma nota de privacidade simples quando o site for ao ar.
4. **Checklist para quando as fotos reais chegarem:** formato moderno (WebP/AVIF), `width`/`height` declarados, `loading="lazy"` abaixo da dobra, `alt` descritivo em cada imagem (hoje são só gradientes decorativos com `aria-hidden`, não precisam de `alt` ainda).
5. **`robots.txt`/`sitemap.xml`/URL canônica:** ainda não se aplicam (site não publicado), mas entram no checklist antes do lançamento.

## ✅ Pontos fortes

- HTML semântico correto; um único `<h1>`, hierarquia de headings sem saltos.
- `prefers-reduced-motion` respeitado em todas as animações (Hero, Essência, Universo, Experiência, Contato).
- Navegação por teclado funcional: skip link, foco visível (`:focus-visible` global), menu mobile fecha com `Esc` e devolve o foco ao botão que o abriu.
- Alvos de toque ≥44px no menu mobile.
- `npm audit`: 0 vulnerabilidades. Nenhum segredo/chave exposta (não há `.env` nem variáveis sensíveis). Nenhum uso de `innerHTML`/`eval`/`dangerouslySetInnerHTML`.
- Nenhuma informação não confirmada publicada como fato (horários, WhatsApp) — cumpre a própria diretriz do `Doce-Cafe-Plano-do-Site.md`.
- Responsivo testado em 375px, 768px e 1280px sem rolagem horizontal ou quebra de layout.
- Links externos (Instagram, Facebook) com `rel="noopener noreferrer"` e aviso de "abre em nova aba" para leitores de tela.

## Ações que só a cliente/você pode fazer

- Confirmar horários de funcionamento e se o telefone atende por WhatsApp.
- Enviar logo original (SVG/PNG transparente), fotos autorizadas e cardápio validado.
- Decidir domínio e hospedagem (define CSP, SEO final e o favicon).

## O que não foi verificado e por quê

- **Leitor de tela (NVDA/VoiceOver):** não testado manualmente nesta sessão — recomendo antes do lançamento.
- **Core Web Vitals reais (Lighthouse):** não medidos, porque o conteúdo visual final (fotos) ainda não existe — a métrica mudaria assim que as imagens reais entrarem.
- **Seções opcionais (Destaques, Prova social):** ainda não foram construídas, então não entraram nesta auditoria.

## Plano de correção

1. ~~Lote 1 — críticos: build quebrado, contraste de texto, padrão de hook incorreto.~~ **Concluído nesta sessão.**
2. Lote 2 — quando a cliente enviar os materiais: trocar favicon/logo, inserir fotos reais (com `alt` e otimização), revisar a paleta final contra o logo oficial.
3. Lote 3 — pré-publicação: configurar CSP/headers, `robots.txt`, rodar Lighthouse, teste com leitor de tela.
