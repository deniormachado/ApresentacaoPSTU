# COMO EDITAR O CONTEÚDO DA APRESENTAÇÃO

## Visão geral

A apresentação é composta por **62 slides**, cada um salvo como um arquivo `.json` individual na pasta `dados/`. Você pode editar qualquer texto da apresentação alterando esses arquivos — **sem nunca precisar abrir o HTML, CSS ou JavaScript**.

## Estrutura de arquivos

```
pstu-site/
├── index.html          ← Página principal (NÃO editar)
├── estilo.css          ← Estilos visuais (NÃO editar)
├── motor.js            ← Motor de renderização (NÃO editar)
├── COMO-EDITAR.md      ← Este arquivo
└── dados/
    ├── indice.json     ← Lista ordenada dos slides
    ├── 00-geral-pstu.json
    ├── 01-conj-romper-as...json
    ├── 02-conj-um-pais-rico...json
    └── ... (62 arquivos ao total)
```

## Como editar um slide

1. Abra o arquivo `.json` do slide que quer alterar (use qualquer editor de texto)
2. Altere o texto desejado entre as aspas `""`
3. Salve o arquivo
4. Recarregue a página no navegador

### Exemplo prático

Abra `02-conj-um-pais-ricogovernado-contrase.json`:

```json
{
  "tipo": "texto",
  "titulo": "Um país <em>rico</em><br/>governado contra<br/>seu povo",
  "texto": "O Brasil é um país rico, mas extremamente desigual..."
}
```

Para mudar o título, edite o valor de `"titulo"`. Para mudar o texto, edite `"texto"`.

## Campos obrigatórios (presentes em TODO slide)

| Campo | Descrição | Exemplo |
|---|---|---|
| `tipo` | Tipo visual do slide | `"texto"`, `"secao"`, `"dividido"` |
| `modulo` | Nome do módulo (aparece no badge) | `"Módulo 1 · Por que Socialistas?"` |
| `tema` | Cor de fundo | `"escuro"`, `"profundo"`, `"vermelho"` |
| `pre_titulo` | Texto menor acima do título | `"Apresentação · Manifesto PSTU 2026"` |
| `titulo` | Título principal do slide | `"O trabalho criou o próprio homem"` |
| `subtitulo` | Texto de apoio ou descrição | `"A origem da desigualdade..."` |
| `texto` | Corpo de texto principal | `"O Brasil é um país rico..."` |
| `imagem_url` | URL de uma imagem (se houver) | `"https://exemplo.com/foto.jpg"` |

## Formatação especial dentro do texto

Você pode usar estas tags HTML simples dentro dos textos:

| Tag | O que faz | Exemplo |
|---|---|---|
| `<em>palavra</em>` | Deixa o texto em **vermelho** (destaque) | `"O <em>capitalismo</em> em crise"` |
| `<strong>palavra</strong>` | Deixa o texto em **branco negrito** | `"são <strong>250 empresas</strong>"` |
| `<br/>` | Quebra de linha | `"Linha 1<br/>Linha 2"` |

### IMPORTANTE
- **NÃO** remova as aspas `""` ao redor dos valores
- **NÃO** remova as vírgulas `,` entre os campos
- **NÃO** altere o campo `"tipo"` (a menos que saiba o que está fazendo)
- Se o texto contém aspas, use `\"` (aspas escapadas)

## Imagens — os três tipos

### 1. Imagem de fundo (`imagem_url`)
Cobre o slide inteiro, atrás do texto. Campos relacionados:

```json
"imagem_url": "https://exemplo.com/foto.jpg",
"imagem_posicao": "centro",
"imagem_escurecimento": 0
```

- `imagem_posicao`: `"centro"`, `"topo"`, `"baixo"`, `"esquerda"`, `"direita"`
- `imagem_escurecimento`: véu escuro sobre a imagem para o texto ficar legível.
  - `0` ou ausente → usa o **padrão global** (0.55, definido em `ESCURECIMENTO_PADRAO` no topo do `<script>` do `index.html`)
  - `0.3` → mais claro que o padrão; `0.8` → mais escuro
  - `-1` → imagem totalmente viva, sem véu nenhum
- `imagem_clareamento`: véu **branco** (0 a 1), para quando as letras sobre o
  fundo são **escuras** (tema claro). Quando presente e maior que zero,
  substitui o escurecimento.
- `veu_apenas_texto`: onde o véu é aplicado.
  - `false` ou ausente → véu na **imagem inteira**
  - `true` → véu **só atrás do quadro de texto** (a área ocupada pelo
    conteúdo, com folga e cantos arredondados); o resto da imagem fica vivo
- **Dica:** o editor Delphi (EditScriptsSlides) tem um controle deslizante de
  "véu de contraste" e o botão **Testar contraste ▶**, que varre do clarear ao
  escurecer mostrando a prévia ao vivo — pare no ponto em que o texto ficar
  mais legível.

### 2. Imagem em quadro (`imagem_quadro`)
Figura com moldura, sombra e legenda opcional, dentro do conteúdo:

```json
"imagem_quadro": {
    "url": "dados/foto.png",
    "legenda": "Texto da legenda (opcional)",
    "altura": 140,
    "posicao": "center top",
    "coluna": 2
}
```

- `altura` em pixels (opcional; sem ela a imagem usa a proporção natural)
- `coluna`: `1` (esquerda) ou `2` (direita) — só vale para slides `"tipo": "texto"`
- Funciona nos tipos: `texto`, `dividido`, `comparativo`, `estatisticas`, `timeline`, `cards`

### 3. Imagem pequena (`imagem_pequena`)
Imagem menor, colocada **dentro de quadros de texto ou colunas**:

```json
"imagem_pequena": {
    "url": "dados/foto.jpg",
    "largura": 120,
    "altura": 90,
    "alinhamento": "centro",
    "coluna": 1
}
```

- `largura` em pixels (padrão 120); `altura` opcional
- `alinhamento`: `"esquerda"` (padrão), `"centro"` ou `"direita"`
- Nos slides `"tipo": "comparativo"`, cada coluna também aceita uma imagem própria:

```json
"coluna_esquerda": {
    "titulo": "...",
    "itens": [...],
    "imagem": { "url": "dados/foto.jpg", "largura": 100, "alinhamento": "centro" }
}
```

## Quadros de texto: fundo opaco ou transparente

Todo slide aceita o campo `"quadros_opacos"`:

- `false` ou ausente → quadros de texto **transparentes** (a imagem de fundo
  aparece através deles — comportamento padrão)
- `true` → quadros de texto com **fundo sólido** que tapa a imagem de fundo,
  garantindo a leitura (vale para proposta, diferencial, colunas do
  comparativo, itens do dividido, cards, estatísticas, timeline e botões
  de link)

No editor Delphi há um checkbox na aba Geral: "Quadros de texto com fundo
OPACO".

## Ajuste automático em paisagem

No modo paisagem (tela deitada), se o conteúdo não couber na altura do slide,
ele é reduzido automaticamente (até 68%) para nada ficar cortado no fundo.
No modo retrato o slide rola normalmente.

## Tipos de slide

### `"tipo": "texto"` — Slide de texto simples
Campos usados: `titulo`, `texto`, `palavra_de_ordem`, `diferenciais`

### `"tipo": "secao"` — Abertura de módulo
Campos usados: `pre_titulo`, `titulo`, `subtitulo`, `numero_gigante`

### `"tipo": "dividido"` — Duas colunas (esquerda + direita)
Campos usados: `titulo`, `texto`, `palavra_de_ordem`, `items_direita`

Cada item da direita tem: `titulo`, `texto`, `nota`

### `"tipo": "comparativo"` — Duas colunas de comparação
Campos usados: `coluna_esquerda`, `coluna_direita`

Cada coluna tem: `titulo`, `items` (array com `texto` e `estilo`)

### `"tipo": "estatisticas"` — Grid de números
Campo usado: `estatisticas` (array de 4 objetos)

Cada estatística tem: `numero`, `descricao`, `fonte`, `cor`

### `"tipo": "citacao"` — Citação de autor
Campos usados: `titulo` (texto da citação), `pre_titulo` (autor)

### `"tipo": "timeline"` — Linha do tempo
Campos usados: `titulo`, `itens_timeline` (array de `ano` + `texto`)

### `"tipo": "video"` — Indicação de vídeo
Campos usados: `titulo`, `texto` (descrição), `subtitulo` (link)

### `"tipo": "discussao"` — Pergunta para debate
Campos usados: `titulo` (pergunta), `subtitulo` (dica)

### `"tipo": "cards"` — Cartões de pessoas
Campo usado: `cards` (array de `nome`, `cargo`, `texto`, `foto_url`)

## Como adicionar um novo slide

1. Crie um novo arquivo `.json` na pasta `dados/` (copie um existente como base)
2. Edite o conteúdo
3. Abra `dados/indice.json` e adicione o nome do novo arquivo na posição desejada
4. Recarregue a página

## Como remover um slide

1. Abra `dados/indice.json`
2. Remova a linha com o nome do arquivo que quer excluir
3. Recarregue a página (o arquivo JSON pode ficar na pasta, só não será carregado)

## Como reordenar slides

1. Abra `dados/indice.json`
2. Mude a ordem das linhas (cada linha é um arquivo de slide)
3. Recarregue a página

## Como abrir no navegador

**⚠ IMPORTANTE:** A apresentação usa Fetch API para carregar os JSONs. Por segurança, navegadores bloqueiam isso quando você abre o arquivo diretamente (`file://`). Você precisa de um servidor local:

### Opção 1: Python (mais fácil)
```bash
cd pstu-site
python3 -m http.server 8000
```
Depois abra: `http://localhost:8000`

### Opção 2: Node.js
```bash
npx serve pstu-site
```

### Opção 3: VS Code
Instale a extensão "Live Server" e clique em "Go Live"

## Dúvidas frequentes

**P: Mexi no JSON e a página ficou em branco.**
R: Provavelmente há um erro de sintaxe no JSON (aspas faltando, vírgula a mais no último item, etc.). Use um validador: https://jsonlint.com/

**P: Como mudo as cores do site?**
R: Abra `estilo.css` e altere as variáveis em `:root` no topo do arquivo.

**P: Como mudo as fontes?**
R: Altere as `font-family` em `estilo.css` e o link do Google Fonts em `index.html`.
