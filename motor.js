/**
 * motor.js — Motor de renderização compartilhado
 * Lido por retrato.html e paisagem.html
 */

/* ═══════════════════════════════════════════
   ÍCONES SVG INLINE
═══════════════════════════════════════════ */
const IC = {
  video:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  artigo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  link:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>`,
  audio:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>`,
};

/* ═══════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════ */
function esc(s) { return s || ''; }

function imgBg(d) {
  if (!d.imagem_url) return '';
  const dim = d.imagem_escurecimento || 0;
  const pos = { centro:'center center', topo:'center top', baixo:'center bottom',
                esquerda:'left center', direita:'right center' }[d.imagem_posicao] || 'center center';
  return `
    <div class="slide-bg-img" style="background-image:url('${d.imagem_url}');background-position:${pos}"></div>
    ${dim > 0 ? `<div class="slide-bg-dim" style="opacity:${dim}"></div>` : ''}`;
}

function temaClasses(tema) {
  return `tema-${tema || 'claro'}`;
}

function bordaTexto(d) {
  return d.texto_borda ? 'texto-borda' : '';
}

function renderProposta(p) {
  if (!p) return '';
  return `<div class="bloco-proposta">
    <div class="proposta-titulo">${esc(p.titulo)}</div>
    <div class="proposta-texto">${esc(p.texto)}</div>
  </div>`;
}

function renderDiferencial(txt) {
  if (!txt) return '';
  return `<div class="bloco-diff"><span class="diff-simbolo">≠</span>${esc(txt)}</div>`;
}

function renderItens(itens) {
  if (!itens || !itens.length) return '';
  return `<ul class="bloco-lista">${itens.map(i => `<li>${i}</li>`).join('')}</ul>`;
}

function renderLinks(links) {
  if (!links || !links.length) return '';
  const btns = links.map(l =>
    `<a class="link-btn" href="${l.url}" target="_blank" rel="noopener">
      <span class="link-icon">${IC[l.icone] || IC.link}</span>
      ${l.texto}
    </a>`
  ).join('');
  return `<div class="bloco-links"><div class="links-label">Aprofunde:</div><div class="links-wrap">${btns}</div></div>`;
}

function renderColunaItens(itens) {
  return (itens || []).map(it =>
    `<div class="col-item ${it.estilo === 'destaque' ? 'col-item-destaque' : ''}">${it.texto}</div>`
  ).join('');
}

/* ═══════════════════════════════════════════
   RENDERIZADORES POR TIPO
═══════════════════════════════════════════ */
const RENDER = {

  /* ── CAPA ── */
  capa(d) {
    const logos = (d.logos || []).map(url =>
      `<img class="capa-logo-img" src="${url}" alt="" loading="lazy">`
    ).join('');
    const linksHtml = renderLinks(d.links);
    return `
      ${imgBg(d)}
      <div class="slide-content ${bordaTexto(d)}">
        <div class="capa-pretitulo">${esc(d.pre_titulo)}</div>
        ${d.tem_linha_acento ? '<div class="linha-acento"></div>' : ''}
        <h1 class="capa-titulo">${esc(d.titulo)}</h1>
        <p class="capa-subtitulo">${esc(d.subtitulo)}</p>
        ${logos ? `<div class="capa-logos">${logos}</div>` : ''}
        ${linksHtml}
        <div class="capa-nav-hint">← deslize para navegar →</div>
      </div>`;
  },

  /* ── SEÇÃO ── */
  secao(d) {
    return `
      ${imgBg(d)}
      <div class="slide-content secao-content ${bordaTexto(d)}">
        ${d.numero_gigante ? `<div class="secao-num">${d.numero_gigante}</div>` : ''}
        <div class="secao-pretitulo">${esc(d.pre_titulo)}</div>
        ${d.tem_linha_acento ? '<div class="linha-acento"></div>' : ''}
        <h2 class="secao-titulo">${esc(d.titulo)}</h2>
        <p class="secao-subtitulo">${esc(d.subtitulo)}</p>
        ${d.texto ? `<p class="secao-texto">${esc(d.texto)}</p>` : ''}
      </div>`;
  },

  /* ── TEXTO ── */
  texto(d) {
    return `
      ${imgBg(d)}
      <div class="slide-content ${bordaTexto(d)}">
        ${d.modulo ? `<div class="slide-modulo">${esc(d.modulo)}</div>` : ''}
        ${d.pre_titulo ? `<div class="slide-pretitulo">${esc(d.pre_titulo)}</div>` : ''}
        <h2 class="slide-titulo">${esc(d.titulo)}</h2>
        ${d.subtitulo ? `<p class="slide-subtitulo">${esc(d.subtitulo)}</p>` : ''}
        ${d.texto ? `<p class="slide-texto">${esc(d.texto)}</p>` : ''}
        ${renderItens(d.itens)}
        ${renderProposta(d.proposta)}
        ${renderDiferencial(d.diferencial)}
        ${renderLinks(d.links)}
      </div>`;
  },

  /* ── DIVIDIDO ── */
  dividido(d) {
    const esq = (d.itens_esquerda || []).map(it =>
      `<div class="div-item"><strong>${it.titulo}</strong><p>${it.texto}</p></div>`
    ).join('');
    return `
      ${imgBg(d)}
      <div class="slide-content ${bordaTexto(d)}">
        ${d.modulo ? `<div class="slide-modulo">${esc(d.modulo)}</div>` : ''}
        ${d.pre_titulo ? `<div class="slide-pretitulo">${esc(d.pre_titulo)}</div>` : ''}
        <h2 class="slide-titulo">${esc(d.titulo)}</h2>
        <div class="div-grid">${esq}</div>
        ${renderProposta(d.proposta)}
        ${renderDiferencial(d.diferencial)}
      </div>`;
  },

  /* ── COMPARATIVO ── */
  comparativo(d) {
    const esq = d.coluna_esquerda || {};
    const dir = d.coluna_direita  || {};
    return `
      ${imgBg(d)}
      <div class="slide-content ${bordaTexto(d)}">
        ${d.modulo ? `<div class="slide-modulo">${esc(d.modulo)}</div>` : ''}
        ${d.pre_titulo ? `<div class="slide-pretitulo">${esc(d.pre_titulo)}</div>` : ''}
        <h2 class="slide-titulo">${esc(d.titulo)}</h2>
        ${d.texto ? `<p class="slide-texto">${esc(d.texto)}</p>` : ''}
        <div class="comp-grid">
          <div class="comp-col cor-${esq.cor || 'escuro'}">
            <div class="comp-col-titulo">${esc(esq.titulo)}</div>
            ${renderColunaItens(esq.itens)}
          </div>
          <div class="comp-col cor-${dir.cor || 'escuro'}">
            <div class="comp-col-titulo">${esc(dir.titulo)}</div>
            ${renderColunaItens(dir.itens)}
          </div>
        </div>
        ${renderDiferencial(d.diferencial)}
      </div>`;
  },

  /* ── ESTATÍSTICAS ── */
  estatisticas(d) {
    const stats = (d.estatisticas || []).map(s =>
      `<div class="stat-card cor-${s.cor || 'escuro'}">
        <div class="stat-num">${s.numero}</div>
        <div class="stat-desc">${s.descricao}</div>
        <div class="stat-fonte">${s.fonte}</div>
      </div>`
    ).join('');
    return `
      ${imgBg(d)}
      <div class="slide-content ${bordaTexto(d)}">
        ${d.modulo ? `<div class="slide-modulo">${esc(d.modulo)}</div>` : ''}
        ${d.pre_titulo ? `<div class="slide-pretitulo">${esc(d.pre_titulo)}</div>` : ''}
        <h2 class="slide-titulo">${esc(d.titulo)}</h2>
        ${d.subtitulo ? `<p class="slide-subtitulo">${esc(d.subtitulo)}</p>` : ''}
        <div class="stats-grid">${stats}</div>
        ${renderDiferencial(d.diferencial)}
      </div>`;
  },

  /* ── CITAÇÃO ── */
  citacao(d) {
    return `
      ${imgBg(d)}
      <div class="slide-content citacao-content ${bordaTexto(d)}">
        ${d.modulo ? `<div class="slide-modulo">${esc(d.modulo)}</div>` : ''}
        ${d.tem_linha_acento ? '<div class="linha-acento"></div>' : ''}
        <blockquote class="cit-texto">${esc(d.titulo)}</blockquote>
        <div class="cit-fonte">${esc(d.pre_titulo)}</div>
        ${d.subtitulo ? `<p class="cit-nota">${esc(d.subtitulo)}</p>` : ''}
      </div>`;
  },

  /* ── TIMELINE ── */
  timeline(d) {
    const itens = (d.itens_timeline || []).map(it =>
      `<div class="tl-item">
        <div class="tl-ano">${it.ano}</div>
        <div class="tl-texto">${it.texto}</div>
      </div>`
    ).join('');
    return `
      ${imgBg(d)}
      <div class="slide-content ${bordaTexto(d)}">
        ${d.modulo ? `<div class="slide-modulo">${esc(d.modulo)}</div>` : ''}
        ${d.pre_titulo ? `<div class="slide-pretitulo">${esc(d.pre_titulo)}</div>` : ''}
        <h2 class="slide-titulo">${esc(d.titulo)}</h2>
        <div class="tl-wrap">${itens}</div>
        ${renderDiferencial(d.diferencial)}
      </div>`;
  },

  /* ── CARDS ── */
  cards(d) {
    const cardsHtml = (d.cards || []).map(c => {
      const foto = c.foto_url
        ? `<div class="card-foto" style="background-image:url('${c.foto_url}')"></div>`
        : `<div class="card-foto card-foto-vazia"><span>${c.nome.charAt(0)}</span></div>`;
      return `<div class="card-item">
        ${foto}
        <div class="card-body">
          <div class="card-nome">${c.nome}</div>
          <div class="card-cargo">${c.cargo}</div>
          <div class="card-texto">${c.texto}</div>
        </div>
      </div>`;
    }).join('');
    return `
      ${imgBg(d)}
      <div class="slide-content ${bordaTexto(d)}">
        ${d.modulo ? `<div class="slide-modulo">${esc(d.modulo)}</div>` : ''}
        ${d.pre_titulo ? `<div class="slide-pretitulo">${esc(d.pre_titulo)}</div>` : ''}
        <h2 class="slide-titulo">${esc(d.titulo)}</h2>
        ${d.subtitulo ? `<p class="slide-subtitulo">${esc(d.subtitulo)}</p>` : ''}
        <div class="cards-grid">${cardsHtml}</div>
      </div>`;
  },

  /* ── DISCUSSÃO ── */
  discussao(d) {
    return `
      ${imgBg(d)}
      <div class="slide-content discussao-content ${bordaTexto(d)}">
        ${d.modulo ? `<div class="slide-modulo">${esc(d.modulo)}</div>` : ''}
        <div class="disc-icone">?</div>
        <h2 class="disc-pergunta">${esc(d.titulo)}</h2>
        ${d.subtitulo ? `<p class="disc-dica">${esc(d.subtitulo)}</p>` : ''}
      </div>`;
  },

  /* ── VÍDEO ── */
  video(d) {
    return `
      ${imgBg(d)}
      <div class="slide-content ${bordaTexto(d)}">
        ${d.modulo ? `<div class="slide-modulo">${esc(d.modulo)}</div>` : ''}
        <div class="video-play">${IC.video}</div>
        <h2 class="slide-titulo">${esc(d.titulo)}</h2>
        ${d.texto ? `<p class="slide-texto">${esc(d.texto)}</p>` : ''}
        ${d.subtitulo ? `<a class="video-link" href="${esc(d.subtitulo)}" target="_blank">${esc(d.subtitulo)}</a>` : ''}
      </div>`;
  },
};

/* ═══════════════════════════════════════════
   MOTOR PRINCIPAL
═══════════════════════════════════════════ */
window.Motor = {

  slides: [],       // dados dos JSONs
  el: null,         // #slides-wrap
  atual: 0,
  total: 0,
  _tx: 0, _ty: 0,  // touch

  async init(slidesWrapId) {
    this.el = document.getElementById(slidesWrapId);
    await this._carregarSlides();
    this._renderTodos();
    this._ativar(0);
    this._bindEventos();
  },

  async _carregarSlides() {
    let indice;
    try {
      const r = await fetch('dados/indice.json');
      indice = await r.json();
    } catch(e) {
      console.error('Erro ao carregar indice.json — use um servidor local (python3 -m http.server)', e);
      this.slides = [{ tipo: 'texto', titulo: 'Erro', texto: 'Abra via servidor local: python3 -m http.server 8000', tema: 'vermelho' }];
      return;
    }
    const promessas = indice.map(arq =>
      fetch(`dados/${arq}`).then(r => r.json()).catch(() => ({
        tipo: 'texto', titulo: `Erro: ${arq}`, texto: 'Arquivo não encontrado.', tema: 'vermelho'
      }))
    );
    this.slides = await Promise.all(promessas);
    this.total = this.slides.length;
  },

  _renderTodos() {
    this.el.innerHTML = '';
    this.slides.forEach((d, i) => {
      const div = document.createElement('div');
      div.className = `slide ${temaClasses(d.tema)}`;
      div.dataset.index = i;
      const fn = RENDER[d.tipo] || RENDER.texto;
      div.innerHTML = fn(d);
      this.el.appendChild(div);
    });
  },

  _ativar(n) {
    if (n < 0 || n >= this.total) return;
    const todos = this.el.querySelectorAll('.slide');
    const ant = this.atual;
    todos[ant].classList.remove('ativo');
    todos[ant].classList.add(n > ant ? 'sair-esq' : 'sair-dir');
    this.atual = n;
    todos[n].classList.add('ativo');
    todos[n].classList.remove('sair-esq', 'sair-dir');
    todos[n].scrollTop = 0;
    setTimeout(() => todos[ant].classList.remove('sair-esq', 'sair-dir'), 300);
    this._atualizarUI();
  },

  ir(n) { this._ativar(n); },
  avancar() { this._ativar(this.atual + 1); },
  voltar()  { this._ativar(this.atual - 1); },

  _atualizarUI() {
    const pct = this.total > 1 ? (this.atual / (this.total - 1)) * 100 : 100;
    const pbar = document.getElementById('barra-progresso');
    if (pbar) pbar.style.width = pct + '%';
    const cnt = document.getElementById('contador');
    if (cnt) cnt.textContent = `${this.atual + 1} / ${this.total}`;
    const bp = document.getElementById('btn-prev');
    const bn = document.getElementById('btn-next');
    if (bp) bp.disabled = this.atual === 0;
    if (bn) bn.disabled = this.atual === this.total - 1;
  },

  _bindEventos() {
    document.getElementById('btn-prev')?.addEventListener('click', () => this.voltar());
    document.getElementById('btn-next')?.addEventListener('click', () => this.avancar());

    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown')  this.avancar();
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')    this.voltar();
    });

    const w = this.el;
    w.addEventListener('touchstart', e => {
      this._tx = e.touches[0].clientX;
      this._ty = e.touches[0].clientY;
    }, { passive: true });
    w.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - this._tx;
      const dy = e.changedTouches[0].clientY - this._ty;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 38)
        dx < 0 ? this.avancar() : this.voltar();
    }, { passive: true });
  },
};
