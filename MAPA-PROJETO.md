# Mapa do projeto — Apresentação PSTU 2026

> Gerado para dar contexto rápido a uma nova sessão do Claude Code. Cole este
> arquivo (ou aponte para ele) no início de um novo chat.

## Visão geral

Este mapa cobre três pastas — as únicas relevantes para este projeto dentro
de `D:\Projetos\VersionadosGIT`. **Outras pastas do mesmo diretório
(outros projetos Delphi do usuário) não fazem parte deste escopo e não
devem ser tocadas, lidas ou mencionadas** a menos que explicitamente pedido.

1. **ApresentacaoPSTU** — site estático (HTML/CSS/JS puro, sem build) que
   roda uma apresentação de slides no navegador. Publicado no GitHub Pages.
2. **EditScriptsSlides** — editor visual em Delphi (VCL) para criar e editar
   os slides sem mexer em JSON na mão, com prévia ao vivo via WebView2.
3. **Global** — pacote/biblioteca Delphi de units utilitárias compartilhadas
   do usuário (grids, parsers, exportação Excel/CSV, PDF, etc.). Hoje **não é
   referenciada pelo `EditScriptsSlides.dproj`** (sem `uses` cruzado
   confirmado) — está no mapa porque o usuário pediu que ficasse disponível
   como contexto, não porque haja dependência ativa. Ver seção própria abaixo.

O "motor" de renderização (HTML/CSS/JS que transforma um JSON de slide em
tela) existe **duplicado em dois lugares** (item 1 e 2) que precisam ficar
sincronizados manualmente (ver seção "Duplicação intencional" abaixo).

## Os dois repositórios git (importante!)

| | ApresentacaoPSTU | VersionadosGIT (contém EditScriptsSlides **e** Global) |
|---|---|---|
| Caminho | `D:\Projetos\VersionadosGIT\ApresentacaoPSTU` | `D:\Projetos\VersionadosGIT` |
| Remoto | `github.com/deniormachado/ApresentacaoPSTU` | `github.com/deniormachado/VersionadosGIT` |
| Branch | `master` | `main` |
| É um repo git **aninhado** dentro do outro (pasta dentro de pasta), mas são históricos **independentes**. | | |
| `.gitignore` da raiz de VersionadosGIT usa estratégia *whitelist*: ignora tudo, libera só fontes Delphi (`.pas .dfm .dpr .dproj .dpk` etc.) + `EditScriptsSlides/preview/*.css` e `*.js` (exceção explícita, ver `.gitignore`). | | |
| Publicado via **GitHub Pages** em `https://deniormachado.github.io/ApresentacaoPSTU/` | | Não publicado — uso interno. |

**Escopo dentro de VersionadosGIT**: este mapa e o trabalho da IA aqui cobrem
**só** `EditScriptsSlides/` e `Global/`. O repositório tem outras pastas de
outros projetos Delphi do usuário — **fora de escopo, não mencionar nem
tocar** a menos que pedido explicitamente.

**Scripts de commit rápido** (duplo clique no Explorer):
- `commit-delphi.bat` (raiz de VersionadosGIT) → commit + push para `main`
  — **cuidado**: esse script comita o repo inteiro, então ao usá-lo revisar
  o `git status` antes para não misturar mudanças de fora do escopo.
- `ApresentacaoPSTU/commit-apresentacao.bat` → commit + push para `master`,
  mostra o link do site (atualiza em ~1 min após o push)

Se o `.git` da ApresentacaoPSTU sumir (já aconteceu uma vez), reconectar com:
`git init && git remote add origin <url> && git fetch && git reset origin/master`
(nunca `--hard`, para preservar trabalho local antes de resetar).

**Se preferir escopar o commit do Delphi manualmente** (mais seguro que o
`.bat`, que faz `git add` amplo): `git add EditScriptsSlides/ Global/
.gitignore` e então commit/push — assim fica garantido que nada de fora do
escopo entra no commit.

## Estrutura de arquivos

```
VersionadosGIT/                          (repo Delphi, branch main — outras pastas fora de escopo)
├── commit-delphi.bat                    (cuidado: git add -A, ver aviso acima)
├── .gitignore                           (whitelist Delphi + exceções preview/)
├── EditScriptsSlides/                   (editor visual dos slides)
│   ├── EditScriptsSlides.dpr/.dproj
│   ├── uMain.pas/.dfm                   (janela principal: lista de slides)
│   ├── uSlideEditor.pas/.dfm            (formulário de edição de um slide)
│   ├── uSlidePreview.pas/.dfm           (frame com WebView2 = prévia ao vivo)
│   ├── uArrayEditor.pas/.dfm            (editor genérico de arrays JSON)
│   ├── uTipos.pas                       (I/O de JSON, modelos por tipo de slide)
│   ├── WebView2Loader.dll               (necessária ao lado do .exe)
│   └── preview/
│       ├── estilo.css                   (CÓPIA do <style> de index.html)
│       └── motor.js                     (CÓPIA da lógica JS de index.html)
│
├── Global/                              (pacote Delphi de units utilitárias compartilhadas)
│   ├── Global.dpk/.dproj                (package — requires rtl, vclx, vcl, ...)
│   ├── UExtrato.pas, UParser.pas        (leitura/parse de arquivos delimitados;
│   │                                     UParser é camada de conveniência sobre TExtrato)
│   ├── UParser_Documentacao.md          (doc da classe TParser)
│   └── U*.pas (dezenas)                 (grids, Excel/CSV, PDF, componentes VCL diversos)
│
└── ApresentacaoPSTU/                    (repo separado, branch master)
    ├── commit-apresentacao.bat
    ├── .gitignore                       (exclui PDF/PPTX/backup/.claude — ver arquivo, muda com frequência)
    ├── .claude/launch.json              (preview_start "ApresentacaoPSTU" → :8080)
    ├── MAPA-PROJETO.md                  (este arquivo)
    ├── index.html                       (TUDO: HTML + <style> + <script>, ~750 linhas)
    ├── manifest.json, serve.py          (PWA manifest / servidor local simples)
    ├── Instruções/COMO-EDITAR.md        (documentação do formato JSON p/ humanos)
    ├── PSTU_2026.pdf, PSTU_2026.pptx    (materiais, não versionados)
    └── dados/
        ├── indice.json                  (array ordenado de nomes de arquivo — 41 slides)
        ├── NN-bloco-nome.json           (um arquivo por slide)
        └── *.png/*.jpg                  (imagens locais referenciadas como "dados/arquivo.png")
```

## Como rodar/testar

- **Site**: `preview_start` com `name: "ApresentacaoPSTU"` (usa `.claude/launch.json`,
  `python -m http.server 8080`). Nunca abrir `index.html` direto via `file://`
  — o `fetch()` dos JSONs é bloqueado por CORS local.
- **Editor Delphi**: abrir `EditScriptsSlides.dproj` na IDE, compilar com F9.
  **Não é possível compilar via CLI nesta máquina** (dcc32/msbuild bloqueados)
  — sempre pedir para o usuário compilar e reportar erros de volta.

## O motor de renderização (coração do sistema)

Cada slide é um objeto JSON com um campo `"tipo"`. `index.html` tem um objeto
`R = { capa, secao, texto, dividido, comparativo, estatisticas, citacao,
timeline, cards, encerramento }` — uma função por tipo, que recebe o JSON do
slide e devolve uma string HTML.

### Campos comuns a todo slide
`tipo, bloco (1-6, ver "Acento por bloco" abaixo; 0/ausente = sem bloco,
usa --red), modulo, tema (claro/escuro/profundo/vermelho), pre_titulo,
titulo, subtitulo, texto, texto_borda (contorno escuro no texto),
quadros_opacos`

### Acento por bloco (identidade de cor)
`--acento` é uma CSS var por slide (`.slide{--acento:var(--red)}`, sobrescrita
por `.slide.bloco-N{--acento:#hex}`, N=2..6 — bloco 1 usa a própria `--red`).
Controla FUNDOS CHEIOS com texto branco em cima: `.proposta-selo`,
`.card-foto-vazia`, hover do `.link-btn` — aí o contraste com branco já é
bom (~5.7-6:1) e não precisa de ajuste por tema.
Cores: bloco2 `#137164`, bloco3 `#7B4FB5`, bloco4 `#B8306E`, bloco5
`#925808`, bloco6 `#346F34`. O campo `bloco` de cada slide é atribuído
manualmente (não há inferência automática a partir de `modulo`, que às vezes
vem vazio)

`--acento-legivel` é a variante pra TEXTO/BORDA FININHA sobre o próprio
fundo do slide: módulo, marcadores de lista, borda da citação, cabeçalho de
coluna do comparativo, ano da timeline, título/borda do item do dividido,
cargo do card, linha de acento, marcador do diferencial. Em `tema-claro`/
`tema-vermelho` é igual a `--acento` (~4.3:1, já era assim desde sempre);
em `tema-escuro`/`tema-profundo` clareia via `color-mix(acento 65%, branco
35%)` — sem isso ficava em ~2.4-3.2:1 contra o fundo escuro (medido no
navegador, auditoria de contraste elemento a elemento), ilegível. **Regra
geral: qualquer seletor novo que use `--acento` como COR DE TEXTO ou BORDA
FININHA deve usar `--acento-legivel`; só fundo cheio com texto branco em
cima usa `--acento` puro.**
Elementos de CHROME fixo (barra de progresso, botões de nav/sidebar)
continuam em `--red` fixo, propositalmente, por ficarem fora de `.slide`.
`tema` continua livre por slide dentro do bloco (pacing/contraste não
mudou) — só a cor de acento passou a ser consistente dentro de cada bloco.
— ao criar um slide novo, definir `bloco` de acordo com a vizinhança em
`indice.json`.

### Os três tipos de imagem (decisão de design importante)
1. **Imagem de fundo** (`imagem_url` + `imagem_posicao` + `imagem_escurecimento`
   + `imagem_clareamento` + `veu_apenas_texto`) — cobre o slide inteiro atrás
   do texto.
   - `imagem_escurecimento`: 0/ausente = usa `ESCURECIMENTO_PADRAO` (0.55,
     constante no topo do `<script>`); `-1` = sem véu; outro valor = explícito.
   - `imagem_clareamento`: véu **branco** (para letras escuras sobre fundo
     claro); se > 0, tem prioridade sobre o escurecimento.
   - `veu_apenas_texto: true` → o véu cobre só a área do conteúdo (medida via
     JS, com folga de 12px), não a imagem inteira — resto da foto fica vivo.
   - **Tipo `citacao` NUNCA usa imagem de fundo** — `imagem_url` é ignorada
     nesse tipo (decisão explícita, ver commit `d2f035e`).
2. **Imagem em quadro** (`imagem_quadro: {url, legenda, altura, posicao, coluna}`)
   — figura com moldura, sombra e legenda opcional. Suportada em quase todos
   os tipos, inclusive `citacao`.
3. **Imagem pequena** (`imagem_pequena: {url, largura, altura, alinhamento,
   coluna}`) — para caber dentro de colunas/quadros. No tipo `comparativo`,
   cada coluna também aceita seu próprio `imagem: {url, largura}`.

### `quadros_opacos`
`true` → proposta, diferencial, colunas do comparativo, itens do dividido,
cards, cartões de estatística, itens da timeline e botões de link ganham
fundo sólido (via `color-mix`) para tapar a imagem de fundo. `false`/ausente
= transparente (padrão).

### Campos específicos por tipo (resumo)
- `comparativo`: `coluna_esquerda`/`coluna_direita` (`titulo, cor, itens[],
  imagem?`), `tamanho_titulo_colunas` (px, opcional, padrão 12),
  `imagem_rodape` (imagem que ocupa as duas colunas — ver abaixo).
- `texto`: `itens_col1[]` (coluna 1), `itens[]` (coluna 2), `proposta {titulo,
  texto}` (renderiza como cartão levantado com cantos redondos; se `titulo`
  vier preenchido, aparece como selo/pill na cor de acento do bloco flutuando
  acima do cartão — se vazio, só o cartão com `texto`), `diferencial`,
  `imagem_rodape {url, coluna, altura_bg}` (fundo parcial de coluna), `links[]`.
- `estatisticas`: `estatisticas[]` (`numero, descricao, fonte, cor,
  imagem_url, imagem_modo`).
- `timeline`: `itens_timeline[]` (`ano, texto`).
- `cards`: `cards[]` (`nome, cargo, texto, foto_url`), `citacao_embutida
  {texto, fonte}` (opcional — bloco de citação embutido dentro do slide,
  via helper `citEmbutida()` no motor JS, mesmo padrão de `imgQuadro`/
  `imgPequena`; hoje só ligado em `cards`, mas o helper é genérico e pode
  ser chamado de qualquer `R[tipo]`).
- `citacao`: `titulo` (texto da citação), `pre_titulo` (autor), `subtitulo`
  (nota opcional) + imagem em quadro/pequena. Tipo dedicado (slide inteiro);
  `citacao_embutida` acima é a versão "encaixável" dentro de outro tipo.
- `secao`/`encerramento`: `tem_linha_acento`, `logos[]`, `links[]`,
  `numero_gigante` (só seção). `encerramento` usa o layout ANTIGO de capa
  (`capa-pretitulo`/`capa-titulo`/`capa-subtitulo`/`capa-logos`/`capa-hint`,
  grid de 2 colunas em paisagem) — não foi tocado no redesenho abaixo.
- `capa`: layout "hero" agitprop (só a capa, não o encerramento) — fundo em
  gradiente vermelho (`.capa-hero`, sem foto), sem `imgBg`. Campos: `titulo`
  (sigla, vira selo/badge pequeno) + `titulo_extenso` (nome por extenso, ao
  lado do selo), `pre_titulo` (badge no canto oposto), `subtitulo` (agora é
  a MANCHETE grande — aceita HTML embutido tipo `<span class="capa-destaque">`
  pra destacar um trecho na cor `--capa-dourado`, local a este layout), `texto`
  (caixa escura de apoio, com borda esquerda dourada), `logos[]` (índice 0/1
  aparecem pequenos no rodapé, ao lado de `rodape_esquerda`/`rodape_direita`
  respectivamente — novos campos, texto institucional do rodapé),
  `tem_linha_acento`, `links[]`. `imagem_url`/`imagem_escurecimento` continuam
  aceitos no código (`imgBg` ainda é chamado) mas ficam vazios/inertes nessa
  proposta — se quiser voltar a usar foto de fundo, precisa reforçar o
  z-index/opacidade de `.capa-hero` (hoje o gradiente cobre tudo).

### `imagem_rodape` no comparativo — "imagem de duas colunas"
Renderizada como `<img>` de proporção natural (não mais `background-size:cover`),
com `max-height` = `altura` (px) e centralizada horizontalmente — **igual em
retrato e paisagem** (antes cortava diferente em cada orientação; corrigido
no commit `a8fe381`).

### Ajuste anti-truncamento (paisagem)
Função `ajustarEscala(slideEl)`: em modo paisagem, se o conteúdo não cabe na
altura do slide, aplica `zoom` decrescente até `ZOOM_MINIMO` (constante no
topo do `<script>`, hoje **0.84** — era 0.68, subido porque abaixo disso a
letra fica ilegível num telão; `.sc` já tem `overflow-y:auto` como rede de
segurança, então bater no piso vira scroll residual em vez de continuar
encolhendo). Chamada ao trocar de slide, no resize, na mudança de orientação
e no `onload` de imagens carregadas depois (como a de duas colunas). No
retrato o slide simplesmente rola (`overflow` normal). Hoje só o slide
`17-b2-vera-lucia.json` (citação longa + foto) bate no piso, com ~35px de
scroll residual — os outros 6 slides que precisam de zoom ficam ≥0.84.

## Duplicação intencional: site vs. prévia do editor

`EditScriptsSlides/preview/{estilo.css,motor.js}` são **cópias funcionais**
do `<style>` e da lógica JS de `ApresentacaoPSTU/index.html`, usadas pelo
`TEdgeBrowser` (WebView2) em `uSlidePreview.pas` para mostrar uma prévia
fiel do slide sendo editado, sem depender de rede.

**Toda mudança no motor de `index.html` deve ser replicada manualmente nesses
dois arquivos** — não existe build/sync automático. `uSlidePreview.pas`
também reescreve URLs `dados/...` para um host virtual (`slide.local`) via
`SetVirtualHostNameToFolderMapping`, para carregar imagens locais na prévia.

## O editor Delphi (EditScriptsSlides) por dentro

- **uMain.pas**: janela principal — grid de slides (arquivo + título),
  botões Novo/Editar/Excluir/Subir/Descer/Salvar índice, painel de prévia.
- **uSlideEditor.pas**: formulário modal de edição. Aba "Geral" (campos
  comuns + imagem de fundo + véu de contraste) e aba "Conteúdo específico do
  tipo" (grupos que aparecem/somem conforme `cbTipo`, ver `AtualizarVisibilidade`).
  Debounce de 300ms (`TimerPreview`) atualiza a prévia a cada mudança de campo.
- **uSlidePreview.pas**: frame reutilizável com `TEdgeBrowser`, monta um HTML
  standalone (`estilo.css` + `motor.js` + `renderSlide(json)`) e recarrega a
  cada mudança.
- **uArrayEditor.pas**: editor de grade genérico para campos tipo array de
  objetos (itens da timeline, cards, links, colunas do dividido/comparativo).
- **uTipos.pas**: `CarregarIndice/SalvarIndice`, `CarregarJSON/SalvarJSON`,
  `GerarModeloPorTipo` (JSON inicial de cada tipo de slide novo).

### Véu de contraste (imagem de fundo) no editor
`TTrackBar` de -100 a 100: negativo = clarear (`imagem_clareamento`), positivo
= escurecer (`imagem_escurecimento`), 0 = padrão do site. Checkbox "Sem véu".
Botão **"Testar contraste ▶"** varre o slider automaticamente (passo 10 a
cada 450ms) renderizando a prévia a cada passo, para visualizar o ponto de
melhor legibilidade; clicar de novo para parar (`■ Parar no valor atual`).

## Global — pacote de units compartilhadas

Biblioteca Delphi de uso geral do usuário (não específica deste projeto):
grids/frames padrão (`UfrmPadrao`, `UfrmPadraoDB`), exportação Excel/CSV
(`UExcelFile`, `UArquivoXLSX`, `UExcelToCSV`), leitura de arquivo delimitado
(`UExtrato` → `UParser`, camada de conveniência com navegação por registro,
leitura de campo por nome/posição, busca por texto — ver
`UParser_Documentacao.md`), PDF (`PdfiumCore`/`PdfiumCtrl`), entre outras.

**Estado em 04/08/2026**: `Global.dpk` e `UExtrato.pas` modificados,
`UParser.pas` novo — **nenhum desses commitados ainda**. Não foram tocados
nesta sessão; se for pedido para mexer em `Global`, checar `git status
Global/` primeiro para não perder ou misturar esse trabalho em progresso.

Hoje **`EditScriptsSlides.dproj` não referencia `Global`** — são projetos
Delphi independentes que compartilham o repositório. Se uma tarefa futura
pedir para o editor de slides usar algo de `Global` (ex.: exportar dados,
ler CSV), essa é a pasta a olhar primeiro antes de reinventar.

## Armadilhas conhecidas / decisões não óbvias

- **`TMemo.Lines[]` vs `TMemo.Text`**: com `WordWrap=True`, `Lines[]` devolve
  linhas **visuais** (soft-wrap do controle), quebrando um item em vários no
  JSON. `MemoParaArray` usa `Memo.Text` (quebras reais) — nunca reverter isso.
  `Text` é `TCaption`, então precisa copiar para `string` antes de usar
  `Replace`/`Split` (string helpers não valem em `TCaption` direto).
- **Arquivos `.pas` têm BOM UTF-8** — preservar ao editar (acentos quebram
  sem ele). Já os JSON de `dados/` **não** têm BOM (só `indice.json` tem) —
  e a quebra de linha varia arquivo a arquivo (LF ou CRLF, sem padrão) —
  então editar em lote precisa checar bytes, não só decodificar como texto.
- **`uSlideEditor.pas`'s `MontarJSONAtual` reconstrói o JSON do zero** a
  partir dos controles da tela — não faz merge com o que foi carregado.
  Qualquer campo novo no JSON que ainda não tenha controle próprio na tela
  (ex.: `citacao_embutida`, `bloco`) **é apagado ao salvar pelo editor
  Delphi**, a menos que `MontarJSONAtual` tenha uma linha explícita de
  passthrough (`FJSON.TryGetValue(...)` + `Result.AddPair(...)`) pra esse
  campo — ver os dois exemplos já feitos nessa função como modelo. Ao
  adicionar QUALQUER campo novo ao motor, checar se precisa desse
  passthrough antes de considerar a tarefa concluída no lado Delphi.
- **Campo novo com URL de imagem local (`dados/...`) precisa de MAIS um
  lugar**, além do passthrough acima: `ReescreverImagensLocais`, em
  `uSlidePreview.pas`, é quem reescreve `dados/arquivo.png` para
  `https://slide.local/arquivo.png` (o host virtual mapeado pro WebView2
  achar a imagem, já que a prévia roda de um `NavigateToString` sem URL
  real por trás). Um campo de imagem que não passa por essa função funciona
  normalmente no site (servido por HTTP de verdade) mas fica **invisível,
  sem erro nenhum, só na prévia do editor Delphi** — background-image
  quebrada não tem `onerror` pra disfarçar, só some (aconteceu com
  `imagem_degrade`, corrigido faltando um `ReescreverObjImagem(Obj,
  'imagem_degrade')`). Ao adicionar um campo `{url, ...}` novo, adicionar
  também uma chamada `ReescreverObjImagem` (objeto único) ou
  `ReescreverCampoDe` dentro de um loop (array, como `estatisticas`/`cards`)
  pra esse campo.
- **`--dourado:#FFD200`** é um token global agora (`:root`, junto de `--red`
  etc.) — dourado da própria bandeira do PSTU. Usado na capa (selos,
  destaque na manchete) e em `.bloco-diff`/`.diff-s` nos temas escuros
  (escuro/profundo/vermelho): o fundo desses boxes é sempre ~7% mais claro
  que o próprio tema, e o texto em `--fg2` (já esmaecido) somava dois
  esmaecimentos e não destacava nada — virou a cor de "isso é a conclusão"
  ao em vez da cor de acento do bloco. No `tema-claro` continua cinza
  discreto (`--gray`) + acento, sem mudança.
- **Contorno de texto (`--contorno`) não é mais uniforme entre os temas
  escuros**: `tema-escuro`/`tema-profundo` mantêm o contorno dura original
  (4 sombras ±1px + glow) em todo texto. `tema-vermelho` é tratado à parte
  desde 04/08/2026 — fundo vibrante + traçado duro "borra" a tipografia
  (feedback do usuário) — lá o texto corrido e rótulos pequenos ficam SEM
  sombra nenhuma (branco puro já contrasta bem), e só o título principal
  (`--contorno-titulo`) leva uma sombra suave (um blur só, sem traçado
  duro). Ao adicionar um elemento de texto novo, decidir explicitamente em
  qual dos dois grupos ele entra — não existe mais um `--contorno` único
  pra todo mundo.
- **`color-mix()` em `.qo .link-btn`**: a `transition: background` original
  trava a interpolação `rgba` ↔ `color-mix` no Chromium — foi restrita a
  `transition: color, border-color` só nesse seletor.
- **GitHub Pages cacheia ~10 min** (CDN + navegador) — depois de um push,
  conteúdo antigo/404 residual pode aparecer por alguns minutos. `index.html`
  já mitiga isso: fetch de `dados/*.json` com `?cb=<timestamp>` e
  `cache: 'no-store'`, com até 3 tentativas antes de mostrar slide de erro.
  Se algo parecer "diferente entre local e servidor", suspeitar de cache
  antes de qualquer outra coisa — sempre comparar os bytes dos JSONs primeiro.
- **`dcc32`/`msbuild` não compilam nesta máquina** — qualquer mudança em
  `.pas` precisa ser compilada pelo usuário na IDE; nunca reportar "testado"
  sem isso.
- **`preview/estilo.css`/`preview/motor.js` são relidos do disco a cada
  render** (`Renderizar`, em `uSlidePreview.pas`, chama `CarregarAssets` no
  início — corrigido numa sessão em 04/08/2026; antes só lia uma vez, no
  `Preparar`, e ficava em memória pro resto da execução). Motivo de ter
  existido esse bug: a janela principal (`uMain.SlidePreview`) e o editor
  modal (`TfrmSlideEditor`, criado com `.Create(nil)` a cada "Editar") são
  DOIS `TFrameSlidePreview` diferentes — fechar só o editor modal não
  recriava o painel da janela principal, então "fechar e abrir o programa"
  tinha que ser o app inteiro, não só o diálogo, e mesmo assim exigia
  lembrar disso toda vez. Com a correção, edições em `preview/*` aparecem
  na prévia assim que você seleciona/edita qualquer slide, sem precisar
  reiniciar nada — só recompilar (F9) essa mudança em si, uma vez.
- **Editar um `.pas` por fora enquanto a IDE do Delphi está aberta com o
  projeto carregado nem sempre é pego pelo Build seguinte**: se o arquivo
  já estava aberto numa aba do editor (mesmo em background) desde antes da
  edição externa, a IDE pode compilar a partir do buffer antigo em memória
  em vez de reler o disco — build dá "Success" e o `.exe` sai com timestamp
  novo, mas sem a mudança de verdade (aconteceu com `uSlidePreview.pas`
  numa sessão em 04/08/2026: passei uma tarde inteira descartando "processo
  antigo rodando" até perceber que era isso). Sinal de alerta: build "some
  sucesso" e o `.exe` tem timestamp novo, mas o comportamento não muda nem
  um pouco. Solução: fechar o projeto inteiro na IDE (não só a aba) e
  reabrir antes do próximo build, sempre que eu tiver editado `.pas` que
  pode estar aberto na IDE do usuário.
- Pasta `dados (backup)/`, `PSTU_2026.pdf`, `*.pptx`, `todo.txt`, `*.save`,
  `SUGESTOES-VISUAL.md`, `.claude/`, `_claude_*`, `deepseek_python_*.py`
  ficam **fora do git** de propósito (`.gitignore` da ApresentacaoPSTU muda
  com frequência — conferir o arquivo em vez de confiar nesta lista).
- **Sempre checar `git log origin/<branch>..HEAD` (commits locais não
  enviados) além de `git status`** antes de dizer "está tudo salvo" — já
  aconteceu de haver commits feitos numa sessão anterior que nunca foram
  `push`ados (ficam invisíveis num `git status` limpo).

## Histórico recente relevante (mais novo primeiro)

**Estado em 04/08/2026**: sessão em andamento adicionou `citacao_embutida`
(cards), slide `40-b3-superacao.json` (citação de encerramento do bloco 3),
`ZOOM_MINIMO` (0.68→0.84), campo `bloco` em todos os 44 slides + sistema de
`--acento`/`--acento-legivel` por bloco, redesenho de `.bloco-proposta`
(cartão com selo), redesenho da capa (`.capa-hero`, campos `titulo_extenso`/
`rodape_esquerda`/`rodape_direita`) — tudo já descrito nas seções acima, mas
**nenhum commit feito ainda** (nem em
ApresentacaoPSTU nem em `EditScriptsSlides/`) — os campos/decisões abaixo
ficam desatualizados até isso ser commitado. Ver `git status` antes de supor
que o histórico abaixo reflete o estado atual dos arquivos.

Commits do repositório **ApresentacaoPSTU** (motor em `index.html`):

| Commit | O quê |
|---|---|
| `045b5a6` | Imagens de slides atualizadas + este mapa |
| `d2f035e` | Citação usa imagem em quadro, não de fundo |
| `4793052` | `tamanho_titulo_colunas` (fonte dos títulos do comparativo) |
| `a8fe381` | Imagem de duas colunas: inteira, centrada, igual nas orientações |
| `6752869` | Cache-busting + retry no carregamento dos JSONs |
| `ede49be` | `quadros_opacos` |
| `7c279e9` | `veu_apenas_texto` |
| `d50cb1c` | `imagem_clareamento` (véu branco) |
| `fe8368c` | `ESCURECIMENTO_PADRAO`, anti-truncamento em paisagem, `imagem_quadro`/`imagem_pequena` |

Commits do repositório **VersionadosGIT**, pasta `EditScriptsSlides/` (motor
espelhado em `preview/` + controles em `uSlideEditor.pas`):

| Commit | O quê |
|---|---|
| `6decd3f` | Sincroniza `preview/estilo.css`: contorno padrão e acentos do tema vermelho |
| `5c28d2c` | Sincroniza `preview/estilo.css` com o motor da apresentação (caixa de proposta, `.tb`, folha sobre foto) |
| `b3e2759` | Véu de contraste + spin de teste, `quadros_opacos`, imagem em quadro/pequena, correção `TMemo.Text`, tipo citação |

Cada mudança no motor de `index.html` deve gerar um commit equivalente em
`EditScriptsSlides/preview/` — e, quando adiciona campo editável, também em
`uSlideEditor.pas` (aí precisa recompilar na IDE).

## Perguntas que uma nova sessão provavelmente vai precisar responder

- "Isso é pra mudar o site, o editor Delphi, ou os dois?" — a resposta quase
  sempre é **os dois**, mantendo `index.html` e `preview/{estilo.css,motor.js}`
  em sincronia.
- Antes de mexer no editor Delphi, avisar que a compilação precisa ser feita
  pelo usuário (F9 na IDE) — este ambiente não compila Delphi.
- Antes de reportar um "bug visual" como resolvido, verificar se não é cache
  do GitHub Pages/navegador primeiro.
