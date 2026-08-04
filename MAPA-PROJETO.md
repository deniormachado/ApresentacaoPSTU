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
`tipo, modulo, tema (claro/escuro/profundo/vermelho), pre_titulo, titulo,
subtitulo, texto, texto_borda (contorno escuro no texto), quadros_opacos`

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
  texto}`, `diferencial`, `imagem_rodape {url, coluna, altura_bg}` (fundo
  parcial de coluna), `links[]`.
- `estatisticas`: `estatisticas[]` (`numero, descricao, fonte, cor,
  imagem_url, imagem_modo`).
- `timeline`: `itens_timeline[]` (`ano, texto`).
- `cards`: `cards[]` (`nome, cargo, texto, foto_url`).
- `citacao`: `titulo` (texto da citação), `pre_titulo` (autor), `subtitulo`
  (nota opcional) + imagem em quadro/pequena.
- `capa`/`secao`/`encerramento`: `tem_linha_acento`, `logos[]`, `links[]`,
  `numero_gigante` (só seção).

### `imagem_rodape` no comparativo — "imagem de duas colunas"
Renderizada como `<img>` de proporção natural (não mais `background-size:cover`),
com `max-height` = `altura` (px) e centralizada horizontalmente — **igual em
retrato e paisagem** (antes cortava diferente em cada orientação; corrigido
no commit `a8fe381`).

### Ajuste anti-truncamento (paisagem)
Função `ajustarEscala(slideEl)`: em modo paisagem, se o conteúdo não cabe na
altura do slide, aplica `zoom` decrescente (até 0.68) até caber. Chamada ao
trocar de slide, no resize, na mudança de orientação e no `onload` de imagens
carregadas depois (como a de duas colunas). No retrato o slide simplesmente
rola (`overflow` normal).

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
  sem ele).
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
- Pasta `dados (backup)/`, `PSTU_2026.pdf`, `*.pptx`, `todo.txt`, `*.save`,
  `SUGESTOES-VISUAL.md`, `.claude/`, `_claude_*`, `deepseek_python_*.py`
  ficam **fora do git** de propósito (`.gitignore` da ApresentacaoPSTU muda
  com frequência — conferir o arquivo em vez de confiar nesta lista).
- **Sempre checar `git log origin/<branch>..HEAD` (commits locais não
  enviados) além de `git status`** antes de dizer "está tudo salvo" — já
  aconteceu de haver commits feitos numa sessão anterior que nunca foram
  `push`ados (ficam invisíveis num `git status` limpo).

## Histórico recente relevante (mais novo primeiro)

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
