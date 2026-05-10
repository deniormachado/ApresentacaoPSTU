# Apresentação PSTU 2026

Apresentação interativa do PSTU para 2026, em formato web.

## Arquivos

| Arquivo | Descrição |
|---|---|
| `index.html` | **Principal** — apresentação completa, autocontida, troca retrato/paisagem automaticamente |
| `gerar-jsons.js` | Gera a pasta `dados/` com os slides em JSON (para edição avançada) |
| `motor.js` | Motor compartilhado (usado por retrato.html e paisagem.html) |
| `retrato.html` | Versão retrato separada (requer pasta `dados/` + servidor local) |
| `paisagem.html` | Versão paisagem separada (requer pasta `dados/` + servidor local) |

## Como usar

### Opção 1 — Simples (recomendado)
Abra `index.html` diretamente no navegador. Funciona sem servidor.

### Opção 2 — Com JSONs editáveis
```bash
node gerar-jsons.js        # cria a pasta dados/
python3 -m http.server 8000
# abra http://localhost:8000/retrato.html
```

## Publicar online (GitHub Pages)

1. Vá em Settings → Pages no repositório
2. Source: `Deploy from a branch`
3. Branch: `main` / pasta `/ (root)`
4. O site ficará em: `https://SEU-USUARIO.github.io/ApresentacaoPSTU/`

## Navegação

- **Setas do teclado** ← →
- **Swipe** no celular (deslizar para os lados)
- **Botões** Anterior / Próximo
- **Rotação automática**: gira o celular e o layout adapta sozinho

## Editar conteúdo

Edite `gerar-jsons.js`, rode `node gerar-jsons.js` e recarregue o navegador.

Para editar o `index.html` diretamente: os dados estão na constante `SLIDES` no `<script>`, no formato JSON.

---

Fontes: pstu.org.br · opiniaosocialista.com.br · litci.org/pt/
