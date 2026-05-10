/**
 * gerar-jsons.js
 * Cria a pasta dados/ com todos os slides em JSON
 * Rodar: node gerar-jsons.js
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'pstu-site', 'dados');
fs.mkdirSync(DIR, { recursive: true });

/* ─── helper ─── */
function salvar(nome, obj) {
  fs.writeFileSync(path.join(DIR, nome), JSON.stringify(obj, null, 2), 'utf8');
}

/* ═══════════════════════════════════════════════════════
   SLIDES
═══════════════════════════════════════════════════════ */
const slides = [

/* ── 00 CAPA ── */
{
  arquivo: '00-capa.json',
  dados: {
    tipo: 'capa',
    modulo: '',
    tema: 'escuro',
    eh_secao: true,
    rotulo_secao: 'Início',
    pre_titulo: 'Apresentação · PSTU · LIT-QI',
    titulo: 'PSTU',
    subtitulo: 'Partido Socialista dos Trabalhadores Unificado<br/>Venha conhecer o PSTU. Faça parte!',
    texto: '',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    logos: [
      'https://www.opiniaosocialista.com.br/wp-content/uploads/2024/07/WhatsApp-Image-2024-03-09-at-13.31.25-e1720734646795.jpeg',
      'https://litci.org/pt/wp-content/uploads/2022/07/LIT.jpg'
    ],
    tem_linha_acento: true
  }
},

/* ── 01 BLOCO 1 — ABERTURA ── */
{
  arquivo: '01-b1-abertura.json',
  dados: {
    tipo: 'secao',
    modulo: '',
    tema: 'profundo',
    pre_titulo: 'Bloco 1',
    titulo: 'Romper as Engrenagens do Capitalismo',
    subtitulo: 'Como vivem os trabalhadores, a juventude, mulheres, negros, LGBTIs, indígenas, PCDs, imigrantes?',
    texto: 'Partimos da vida real dos trabalhadores e de todos os oprimidos que o capitalismo quer dividir — pela cor da pele, do gênero e sexualidade, capacidades e origens.',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    numero_gigante: '1',
    tem_linha_acento: true
  }
},

/* ── 02 UM PAÍS RICO ── */
{
  arquivo: '02-b1-pais-rico.json',
  dados: {
    tipo: 'texto',
    modulo: 'Bloco 1 · Romper as Engrenagens',
    tema: 'claro',
    pre_titulo: '',
    titulo: 'Um país <em>rico</em> governado contra seu povo',
    subtitulo: '',
    texto: 'O Brasil é um país rico, mas extremamente desigual. A riqueza produzida pela classe trabalhadora não chega no andar de baixo.',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    itens: [
      '<strong>PARASITAS.</strong> Uma pequena minoria de bilionários se apropria da riqueza. <em>250 grandes empresas</em> controlam a maior parte da economia brasileira.',
      '<strong>ESQUERDA. DIREITA.</strong> Mudam os governos, prometem melhorar — o resultado é um país cada vez mais dependente, desindustrializado.',
      '<strong>UM PAÍS DOMINADO.</strong> O Brasil está preso a um ciclo de dominação imperialista: importa tecnologia, exporta minérios — e a riqueza escoa para fora.'
    ],
    proposta: {
      titulo: 'O que o PSTU diz',
      texto: 'Não é falta de recursos — é uma escolha política consciente de para quem a riqueza vai. Pelo fim da agiotagem da dívida pública!'
    },
    diferencial: 'O PT manteve o capitalismo. O PSTU é oposição de esquerda independente.'
  }
},

/* ── 03 ESCALA 6×1 ── */
{
  arquivo: '03-b1-escala6x1.json',
  dados: {
    tipo: 'texto',
    modulo: 'Bloco 1 · Romper as Engrenagens',
    tema: 'escuro',
    pre_titulo: 'Escala 6×1',
    titulo: 'Vivemos para trabalhar<br/>e não temos tempo de viver',
    subtitulo: '',
    texto: 'A escala 6×1 é a expressão cotidiana da exploração capitalista: não vemos a família, não temos lazer. O adoecimento físico e mental se alastra.',
    imagem_url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200',
    imagem_escurecimento: 0.72,
    imagem_posicao: 'centro',
    texto_borda: true,
    itens: [
      'Redução para <strong>30 horas</strong> sem redução de salário e sem demissões',
      'Aumento geral dos salários rumo ao mínimo do DIEESE (R$ 7.200)',
      'Revogação das reformas Trabalhista e Previdenciária de Temer',
      'Direitos trabalhistas para entregadores de apps (Uber, iFood)'
    ],
    proposta: {
      titulo: 'Proposta do PSTU',
      texto: 'É possível e necessário acabar com a escala 6×1. Basta tirar uma ínfima parte do lucro das grandes empresas.'
    },
    diferencial: 'O PT prometeu acabar com a escala e não cumpriu. O PSTU não negocia vidas por votos.'
  }
},

/* ── 04 FEMINICÍDIOS ── */
{
  arquivo: '04-b1-feminicidios.json',
  dados: {
    tipo: 'texto',
    modulo: 'Bloco 1 · Romper as Engrenagens',
    tema: 'vermelho',
    pre_titulo: '',
    titulo: 'Chega de feminicídios e de violência contra as mulheres',
    subtitulo: '',
    texto: 'As mulheres ganham <em>78% do salário dos homens</em> e ainda sustentam sozinhas o cuidado com filhos, idosos e a casa.',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    itens: [
      'O capitalismo utiliza o machismo para impor superexploração — paga menos, extrai mais.',
      'O governo Lula rifou as pautas das mulheres para costurar acordos com a direita.',
      'O Estado deve fornecer creches, lavanderias e restaurantes públicos.'
    ],
    proposta: {
      titulo: 'Proposta do PSTU',
      texto: 'Pelo fim dos feminicídios e pela legalização do aborto!'
    },
    diferencial: 'PT e centrão trocam vidas de mulheres por votos no Congresso. O PSTU não faz isso.'
  }
},

/* ── 05 OPRESSÕES ── */
{
  arquivo: '05-b1-opressoes.json',
  dados: {
    tipo: 'texto',
    modulo: 'Bloco 1 · Romper as Engrenagens',
    tema: 'claro',
    pre_titulo: 'Combate às Opressões',
    titulo: 'Não pode ser livre quem oprime ou não luta contra a opressão',
    subtitulo: '',
    texto: 'Queremos unir a classe trabalhadora contra o capitalismo — que não existe sem as opressões. As opressões são instrumentais para o capital: ele as utiliza para nos dividir e justificar a superexploração.',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    itens: [
      'O Brasil é o país que <em>mais mata transexuais</em> no mundo.',
      'A juventude negra é empurrada para o trabalho precário, o tráfico ou a morte precoce.',
      'A extrema direita propõe matar e prender mais — mas o Brasil já tem a polícia que mais mata.'
    ],
    proposta: {
      titulo: 'Princípio do PSTU',
      texto: 'A unidade e a emancipação da classe trabalhadora não é possível sem o combate a toda opressão e ao capitalismo.'
    },
    diferencial: ''
  }
},

/* ── 06 JUVENTUDE ── */
{
  arquivo: '06-b1-juventude.json',
  dados: {
    tipo: 'texto',
    modulo: 'Bloco 1 · Romper as Engrenagens',
    tema: 'escuro',
    pre_titulo: 'Juventude',
    titulo: 'Sem futuro sob o capitalismo',
    subtitulo: '',
    texto: '<em>33% dos jovens</em> entre 18 e 29 anos não têm emprego formal nem estão estudando. A juventude negra é a mais atingida.',
    imagem_url: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200',
    imagem_escurecimento: 0.68,
    imagem_posicao: 'centro',
    texto_borda: true,
    itens: [
      '<strong>A falácia da meritocracia:</strong> o sistema diz que o sucesso depende apenas do esforço individual.',
      '<strong>Redes sociais e isolamento:</strong> algoritmos viciantes privilegiam ideologias preconceituosas. Cresce a cultura Redpill.',
      '<strong>Pandemia de depressão:</strong> 1 em cada 8 adolescentes entre 13–17 anos declara não ver sentido na vida.'
    ],
    proposta: {
      titulo: 'Proposta do PSTU',
      texto: 'Emprego, educação de qualidade, cultura, lazer e futuro para a juventude!'
    },
    diferencial: '',
    links: [
      { icone: 'video', texto: 'Hertz Dias fala à juventude', url: 'https://www.instagram.com/reel/DW6W1l9BLUl/' }
    ]
  }
},

/* ── 07 CAPITALISMO SEM VIOLÊNCIA ── */
{
  arquivo: '07-b1-capitalismo-violencia.json',
  dados: {
    tipo: 'texto',
    modulo: 'Bloco 1 · Romper as Engrenagens',
    tema: 'profundo',
    pre_titulo: '',
    titulo: 'O capitalismo não existe sem violência, opressão e destruição',
    subtitulo: '',
    texto: 'A jornada interminável, o feminicídio, o genocídio da juventude negra, a devastação ambiental — não são falhas do sistema. <em>São o sistema.</em>',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    itens: [
      '<strong>TRUMP</strong> é a cara do sistema ameaçado: reage com guerras comerciais e militares.',
      'O capitalismo-imperialismo em decadência pode ir até o fascismo.',
      'No Brasil: desindustrialização e retorno ao papel colonial de exportador de matérias-primas.'
    ],
    proposta: null,
    diferencial: 'Não é falta de vontade política — é o funcionamento estrutural do capitalismo que se aprofunda.'
  }
},

/* ── 08 BRASIL EM NÚMEROS ── */
{
  arquivo: '08-b1-brasil-numeros.json',
  dados: {
    tipo: 'estatisticas',
    modulo: 'Bloco 1 · Romper as Engrenagens',
    tema: 'claro',
    pre_titulo: 'Brasil em números',
    titulo: 'A riqueza que não chega',
    subtitulo: 'Fontes: PENSSAN · BCB · TSE · PSTU',
    texto: '',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    estatisticas: [
      { numero: '54 mi', descricao: 'em insegurança alimentar', fonte: 'Rede PENSSAN, 2023', cor: 'vermelho' },
      { numero: '80 mi', descricao: 'sem emprego ou na informalidade', fonte: 'IBGE, 2024', cor: 'escuro' },
      { numero: '13,5%', descricao: 'do PIB para juros da dívida pública', fonte: 'BCB, 2024', cor: 'vermelho' },
      { numero: 'R$427bi', descricao: 'em dividendos da Petrobras em 5 anos', fonte: 'Manifesto PSTU, 2026', cor: 'escuro' }
    ],
    diferencial: 'Esses números mostram que não há falta de riqueza — há uma escolha política consciente de para quem essa riqueza vai.'
  }
},

/* ── 09 EXTREMA DIREITA E PT ── */
{
  arquivo: '09-b1-extrema-direita-pt.json',
  dados: {
    tipo: 'comparativo',
    modulo: 'Bloco 1 · Romper as Engrenagens',
    tema: 'escuro',
    pre_titulo: 'Análise de conjuntura',
    titulo: 'Distintos regimes, mas o mesmo sistema',
    subtitulo: '',
    texto: '',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    coluna_esquerda: {
      titulo: 'Extrema direita',
      cor: 'cinza',
      itens: [
        { texto: 'Se apresenta como "antissistema" — mas é a parte mais podre do capitalismo.', estilo: 'normal' },
        { texto: 'Tentou um golpe para acabar com as liberdades da classe trabalhadora.', estilo: 'normal' },
        { texto: 'Modelo Milei: destruição de direitos, entrega ao FMI.', estilo: 'destaque' }
      ]
    },
    coluna_direita: {
      titulo: 'Governo Lula (PT)',
      cor: 'cinza',
      itens: [
        { texto: 'Mantém o arcabouço fiscal e a agiotagem da dívida.', estilo: 'normal' },
        { texto: 'Rifa pautas de mulheres, negros e LGBTI por governabilidade com o centrão.', estilo: 'normal' },
        { texto: 'Preserva os lucros dos bilionários e concede subsídios às multinacionais.', estilo: 'destaque' }
      ]
    },
    diferencial: 'O PSTU é oposição de esquerda independente — não apoia o PT nem a direita. Nossa estratégia é a revolução socialista.'
  }
},

/* ── 10 TRUMP ── */
{
  arquivo: '10-b1-trump.json',
  dados: {
    tipo: 'texto',
    modulo: 'Bloco 1 · Romper as Engrenagens',
    tema: 'profundo',
    pre_titulo: 'Conjuntura internacional',
    titulo: 'Brasil: a sanha imperialista de Trump na nossa porta',
    subtitulo: '',
    texto: 'A nova doutrina de Trump para a América Latina tem impacto direto no Brasil. É o imperialismo dos EUA, decadente, mostrando as garras.',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    itens: [
      '<strong>AS TERRAS RARAS:</strong> Lula as trata como moeda de troca. O Brasil fica com o mero extrativismo.',
      '<strong>NARCOTRÁFICO COMO PRETEXTO:</strong> pretexto para ingerência policial e militar dos EUA.',
      '<strong>LULA NÃO ENFRENTA:</strong> disse ter "química com Trump". Pode entregar as terras raras.'
    ],
    proposta: {
      titulo: 'Proposta do PSTU',
      texto: '"As terras raras são nossas! Por uma estatal para exploração e refino das terras raras sob controle dos trabalhadores!"'
    },
    diferencial: ''
  }
},

/* ── 11 POSIÇÕES INTERNACIONAIS ── */
{
  arquivo: '11-b1-posicoes-internacionais.json',
  dados: {
    tipo: 'texto',
    modulo: 'Bloco 1 · Romper as Engrenagens',
    tema: 'claro',
    pre_titulo: 'Posições Internacionais do PSTU',
    titulo: 'Nossa posição no mundo',
    subtitulo: '',
    texto: 'A exploração dos trabalhadores é internacional. A libertação pressupõe a derrota do sistema mundial imperialista.',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    itens: [
      '<strong>PALESTINA:</strong> Por uma Palestina laica e democrática, do rio ao mar. Contra o Estado de Israel e o imperialismo dos EUA.',
      '<strong>UCRÂNIA:</strong> Pela derrota da invasão imperialista russa. Apoio ao povo ucraniano. Contra a subordinação à OTAN.',
      '<strong>VENEZUELA:</strong> Contra a invasão dos EUA. Somos oposição ao chavismo. Venezuela não é nem foi socialista.',
      '<strong>IRÃ:</strong> Fora Trump e Israel. Pelo direito à autodefesa — sem apoio ao regime teocrático.',
      '<strong>ARGENTINA / MILEI:</strong> Viva a resistência dos trabalhadores argentinos!'
    ],
    proposta: null,
    diferencial: ''
  }
},

/* ── 12 BLOCO 2 — ABERTURA ── */
{
  arquivo: '12-b2-abertura.json',
  dados: {
    tipo: 'secao',
    modulo: '',
    tema: 'profundo',
    pre_titulo: 'Bloco 2',
    titulo: 'Quem Somos: 31 Anos na Luta',
    subtitulo: 'Histórico do Partido, identidade da LIT-QI e fundamentação do internacionalismo revolucionário.',
    texto: '',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    numero_gigante: '2',
    tem_linha_acento: true
  }
},

/* ── 13 ORIGENS ── */
{
  arquivo: '13-b2-origens.json',
  dados: {
    tipo: 'timeline',
    modulo: 'Bloco 2 · Quem Somos',
    tema: 'claro',
    pre_titulo: 'Origens e luta contra a ditadura',
    titulo: 'A construção da independência de classe',
    subtitulo: '',
    texto: '',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    itens_timeline: [
      { ano: '1973', texto: 'Jovens trotskistas brasileiros exilados organizam-se após o golpe no Chile em torno da futura LIT, liderada por Nahuel Moreno.' },
      { ano: '1978', texto: 'Lançamento da Convergência Socialista (CS) — uma das primeiras org. trotskistas a atuar abertamente no Brasil.' },
      { ano: '1980', texto: 'CS cofunda o PT, respondendo por ~20% das primeiras 100 mil filiações. 1ª Conferência de Mulheres da CS.' },
      { ano: '1992', texto: 'CS defende o "Fora Collor!". A direção do PT se opõe. Resultado: expulsão da CS.' },
      { ano: '1994', texto: 'Fundação do PSTU em 5 de junho, em São Paulo, como alternativa revolucionária e independente.' }
    ],
    diferencial: 'A expulsão do PT não foi derrota — foi coerência. O PT foi crescendo para dentro do sistema; o PSTU manteve a perspectiva revolucionária.'
  }
},

/* ── 14 LIT-QI ── */
{
  arquivo: '14-b2-lit-qi.json',
  dados: {
    tipo: 'texto',
    modulo: 'Bloco 2 · Quem Somos',
    tema: 'escuro',
    pre_titulo: 'LIT-QI · A Quarta Internacional',
    titulo: 'O capitalismo não tem fronteiras — a revolução também não pode ter',
    subtitulo: '',
    texto: 'Quando um governo tenta mudar de verdade, o imperialismo responde: embargos, sanções, golpes, invasões. Nenhum país consegue se libertar do capitalismo sozinho.',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    itens: [
      'Trotsky demonstrou na <em>Teoria da Revolução Permanente</em> (1929): a revolução começa num país, mas não pode ficar nele.',
      'Stalin decidiu o contrário — "socialismo num só país" — e traiu revoluções inteiras (Espanha 1936, França, etc.).',
      'Diante do pacto Hitler-Stalin, Trotsky fundou a IV Internacional em 1938.',
      'Nahuel Moreno fundou a LIT-QI em 1982. O <strong>PSTU é a seção brasileira</strong>.'
    ],
    proposta: null,
    diferencial: ''
  }
},

/* ── 15 CSP-CONLUTAS ── */
{
  arquivo: '15-b2-csp-conlutas.json',
  dados: {
    tipo: 'texto',
    modulo: 'Bloco 2 · Quem Somos',
    tema: 'claro',
    pre_titulo: 'CSP-Conlutas',
    titulo: 'Central Sindical e Popular classista e independente',
    subtitulo: '',
    texto: 'A CUT tornou-se "correia de transmissão" governamental. O PSTU liderou a saída de sindicatos combativos em 2004, culminando na fundação da Conlutas.',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    itens: [
      'Fundada não apenas como central sindical, mas também <strong>popular</strong> — unificando movimentos de moradia, sem-terra, indígenas.',
      'Democracia operária ampla: todas entidades-membro têm representação na Coordenação Nacional.',
      'Mantém viva a perspectiva da revolução socialista.'
    ],
    proposta: null,
    diferencial: 'CUT e outras centrais: subordinadas ao PT. CSP-Conlutas: autonomia e ação direta.'
  }
},

/* ── 16 REVOLUÇÃO SERÁ NEGRA ── */
{
  arquivo: '16-b2-revolucao-negra.json',
  dados: {
    tipo: 'cards',
    modulo: 'Bloco 2 · Quem Somos',
    tema: 'claro',
    pre_titulo: 'Frentes de massa',
    titulo: 'A revolução será negra, mulher, LGBTI e indígena',
    subtitulo: 'Dentro da CSP-Conlutas, impulsionamos frentes que ligam a luta contra as opressões à luta de classes.',
    texto: '',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    cards: [
      { nome: 'QRC', cargo: 'Quilombo Raça e Classe', texto: 'Luta contra o genocídio da juventude negra e o racismo estrutural.', foto_url: '' },
      { nome: 'MML', cargo: 'Mulheres em Luta', texto: 'Contra o feminicídio, pelo aborto legal. Pelo fim das opressões na luta de classes.', foto_url: '' },
      { nome: 'Revida', cargo: 'Coletivo LGBTI+', texto: 'Combate às opressões que luta pela diversidade e pelo socialismo.', foto_url: '' },
      { nome: 'Rebeldia', cargo: 'Corrente da Juventude', texto: 'Greves estudantis, ocupações e grupos de estudo marxista.', foto_url: '' }
    ]
  }
},

/* ── 17 VERA LÚCIA — CITAÇÃO ── */
{
  arquivo: '17-b2-vera-lucia.json',
  dados: {
    tipo: 'citacao',
    modulo: 'Bloco 2 · Quem Somos',
    tema: 'profundo',
    pre_titulo: '— Vera Lúcia · 30 anos do PSTU · São Paulo, junho de 2024',
    titulo: '"Nesses 30 anos, muitas coisas aconteceram. Nas batalhas que travamos, perdemos companheiros. Outros abandonaram a perspectiva da revolução socialista. Por isso, temos orgulho e festejamos nossos 30 anos. O PSTU não se afastou do propósito para o qual foi criado — permaneceu, de forma incondicional, ao lado da classe trabalhadora na luta pela revolução socialista."',
    subtitulo: 'Esta citação resume o que distingue o PSTU de toda a esquerda que apoiou total ou parcialmente o governo — limitando sua política à democracia burguesa.',
    texto: '',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    tem_linha_acento: true
  }
},

/* ── 18 BLOCO 3 — ABERTURA ── */
{
  arquivo: '18-b3-abertura.json',
  dados: {
    tipo: 'secao',
    modulo: '',
    tema: 'profundo',
    pre_titulo: 'Bloco 3 · Teoria',
    titulo: 'As Engrenagens do Sistema Capitalista',
    subtitulo: 'O marxismo continua sendo a principal base teórica para analisar a realidade e construir o socialismo.',
    texto: '',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    numero_gigante: '3',
    tem_linha_acento: true
  }
},

/* ── 19 PROPRIEDADE PRIVADA ── */
{
  arquivo: '19-b3-propriedade-privada.json',
  dados: {
    tipo: 'texto',
    modulo: 'Bloco 3 · Engrenagens do Capitalismo',
    tema: 'claro',
    pre_titulo: 'A engrenagem principal',
    titulo: 'A propriedade privada dos meios de produção',
    subtitulo: '',
    texto: 'Tudo que existe — fábricas, terras, bancos, aplicativos — pertence a uma pequena minoria. <em>Não por mérito</em>, mas pelo capital que possuem: herança, acúmulo sobre o trabalho alheio.',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    itens: [
      'A classe trabalhadora só tem uma coisa para oferecer: sua <strong>FORÇA DE TRABALHO</strong>. Para sobreviver, é obrigada a vendê-la.',
      'O trabalhador produz a riqueza, mas não é dono dela. O salário é sempre menor do que o valor gerado — Marx chamou isso de <strong>MAIS-VALIA</strong>.',
      'Quanto mais o capitalismo avança, mais riqueza se concentra num polo — e mais miséria se acumula no outro.'
    ],
    proposta: {
      titulo: 'Resultado inevitável',
      texto: 'A desigualdade, as crises e a destruição não são acidentes. São o resultado inevitável do funcionamento do sistema.'
    },
    diferencial: ''
  }
},

/* ── 20 DUAS CONTRADIÇÕES ── */
{
  arquivo: '20-b3-contradicoes.json',
  dados: {
    tipo: 'dividido',
    modulo: 'Bloco 3 · Engrenagens do Capitalismo',
    tema: 'escuro',
    pre_titulo: 'As grandes contradições',
    titulo: 'Por que o capitalismo não tem saída',
    subtitulo: '',
    texto: '',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    itens_esquerda: [
      { titulo: 'Contradição 1', texto: 'Há tecnologia e riqueza para cuidar de toda a humanidade — mas a lógica do capitalismo não é atender necessidades: é gerar lucro.' },
      { titulo: 'Contradição 2', texto: 'A produção é globalizada, mas o capitalismo reforça fronteiras e guerras para dividir trabalhadores. Gaza, Ucrânia, tensão EUA-China.' }
    ],
    proposta: {
      titulo: 'Conclusão',
      texto: 'O capitalismo perdeu qualquer legitimidade. A única saída é a superação do próprio sistema.'
    },
    diferencial: ''
  }
},

/* ── 21 BLOCO 4 — ABERTURA ── */
{
  arquivo: '21-b4-abertura.json',
  dados: {
    tipo: 'secao',
    modulo: '',
    tema: 'profundo',
    pre_titulo: 'Bloco 4 · Teoria',
    titulo: 'O Estado, a Democracia e a Revolução',
    subtitulo: 'O Estado não sempre existiu — ele nasceu com a desigualdade. Para transformar a sociedade, é preciso entendê-lo.',
    texto: '',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    numero_gigante: '4',
    tem_linha_acento: true
  }
},

/* ── 22 O ESTADO ── */
{
  arquivo: '22-b4-estado.json',
  dados: {
    tipo: 'citacao',
    modulo: 'Bloco 4 · O Estado e a Revolução',
    tema: 'escuro',
    pre_titulo: '— Friedrich Engels · A Origem da Família, 1884',
    titulo: '"O Estado não é de modo algum um poder imposto de fora à sociedade. É um produto da sociedade chegada a um certo grau de desenvolvimento."',
    subtitulo: 'O Estado surgiu quando a sociedade se dividiu em classes. Surge para manter determinado funcionamento social — mas o faz defendendo privilégios e a propriedade. A ideologia dominante diz que o Estado é neutro. Infelizmente, a maioria da esquerda repete este erro.',
    texto: '',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    tem_linha_acento: true
  }
},

/* ── 23 REPRESSÃO E LEGITIMAÇÃO ── */
{
  arquivo: '23-b4-repressao-legitimacao.json',
  dados: {
    tipo: 'comparativo',
    modulo: 'Bloco 4 · O Estado e a Revolução',
    tema: 'claro',
    pre_titulo: 'Os dois braços do mesmo Estado',
    titulo: 'Repressão e legitimação',
    subtitulo: '',
    texto: '',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    coluna_esquerda: {
      titulo: 'Braço repressivo',
      cor: 'vermelho',
      itens: [
        { texto: 'Polícia, exército, prisões, juízes.', estilo: 'normal' },
        { texto: 'Entram em cena em greves, ocupações, manifestações.', estilo: 'normal' },
        { texto: 'Intimidação permanente das comunidades pobres — especialmente negros.', estilo: 'destaque' }
      ]
    },
    coluna_direita: {
      titulo: 'Braço da legitimação',
      cor: 'escuro',
      itens: [
        { texto: 'Eleições, parlamento, escola, imprensa, igrejas.', estilo: 'normal' },
        { texto: 'Convencem os de baixo de que o sistema é justo.', estilo: 'normal' },
        { texto: 'Que as coisas podem mudar pelo voto.', estilo: 'destaque' }
      ]
    },
    diferencial: 'No Brasil: a polícia que mata jovens negros na periferia é o mesmo Estado que realiza eleições de quatro em quatro anos.'
  }
},

/* ── 24 DEMOCRACIA ── */
{
  arquivo: '24-b4-democracia.json',
  dados: {
    tipo: 'comparativo',
    modulo: 'Bloco 4 · O Estado e a Revolução',
    tema: 'claro',
    pre_titulo: 'Democracia não é neutra',
    titulo: 'Democracia burguesa × Democracia operária',
    subtitulo: '',
    texto: '<strong>Não somos contra a democracia — somos contra essa democracia</strong>, que é democracia para os ricos.',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    coluna_esquerda: {
      titulo: 'Democracia burguesa',
      cor: 'cinza',
      itens: [
        { texto: 'Voto a cada 2–4 anos — mas maioria dos eleitos é pró-burguesia.', estilo: 'normal' },
        { texto: 'Financiamento milionário de campanhas eleitorais.', estilo: 'normal' },
        { texto: 'Afastamento das decisões do dia a dia dos trabalhadores.', estilo: 'normal' }
      ]
    },
    coluna_direita: {
      titulo: 'Democracia operária',
      cor: 'vermelho',
      itens: [
        { texto: 'Mandatos revogáveis a qualquer momento.', estilo: 'normal' },
        { texto: 'Dirigentes com o mesmo salário de um trabalhador.', estilo: 'normal' },
        { texto: 'Conselhos de fábrica, de bairro, de escola decidindo de verdade.', estilo: 'destaque' }
      ]
    },
    diferencial: 'Defender a democracia contra golpistas não deve ser confundido com defender as formas da democracia burguesa.'
  }
},

/* ── 25 REVOLUÇÃO ── */
{
  arquivo: '25-b4-revolucao.json',
  dados: {
    tipo: 'texto',
    modulo: 'Bloco 4 · O Estado e a Revolução',
    tema: 'escuro',
    pre_titulo: 'O que significa revolução',
    titulo: 'Na prática',
    subtitulo: '"O proletariado usará a sua supremacia política para arrancar pouco a pouco todo o capital à burguesia." — Marx e Engels, Manifesto Comunista, 1848',
    texto: 'Revolução é um processo em que a classe trabalhadora muda a correlação de forças a seu favor. Não é um golpe ou ação militar de minorias.',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    itens: [
      'Greves gerais que paralisam a economia.',
      'Ocupações de fábricas e terras.',
      'Conselhos de trabalhadores que começam a gerir a produção.',
      'Mobilização de massa que torna impossível a continuidade do governo burguês.'
    ],
    proposta: null,
    diferencial: ''
  }
},

/* ── 26 SOCIALISMO ── */
{
  arquivo: '26-b4-socialismo.json',
  dados: {
    tipo: 'texto',
    modulo: 'Bloco 4 · O Estado e a Revolução',
    tema: 'vermelho',
    pre_titulo: 'O que é o Socialismo?',
    titulo: 'Romper com as engrenagens que impedem a humanidade de decidir seus próprios rumos',
    subtitulo: '',
    texto: 'O marxismo não tem um modelo pronto de sociedade futura. O que propõe é superar as estruturas da exploração.',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    itens: [
      '<strong>Propriedade coletiva</strong> dos meios de produção — fábricas, bancos, terras deixam de ser de poucos.',
      '<strong>Planificação democrática</strong> da economia — produzir para as necessidades, não para o lucro.',
      '<strong>Governo dos trabalhadores</strong> — o poder gerido pelos de baixo.',
      '<strong>Fim das opressões</strong> — igualdade real entre mulheres e homens, negros e brancos, LGBTQIA+.',
      '<strong>Internacionalismo</strong> — a revolução não tem fronteiras.'
    ],
    proposta: null,
    diferencial: 'A URSS não foi socialismo — foi deformada pela burocracia stalinista, que traiu as origens da Revolução de 1917.'
  }
},

/* ── 27 PARTIDO REVOLUCIONÁRIO ── */
{
  arquivo: '27-b4-partido-revolucionario.json',
  dados: {
    tipo: 'texto',
    modulo: 'Bloco 4 · O Partido Revolucionário',
    tema: 'claro',
    pre_titulo: 'O partido leninista',
    titulo: 'O papel do partido revolucionário',
    subtitulo: '',
    texto: 'O partido deve buscar estar no centro das lutas. Mas espontaneamente a classe trabalhadora não tem como objetivo tomar o poder. Por isso, o partido revolucionário é decisivo.',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    itens: [
      '<strong>Centralismo democrático:</strong> maioria operária na base e na direção. Debate livre e decisão coletiva; disciplina na execução.',
      '<strong>Programa revolucionário:</strong> independência de classe total, baseado na realidade concreta — não na conciliação de classes.',
      '<strong>Formação política permanente:</strong> unir estudo do marxismo e da realidade com a prática militante.',
      '<strong>Internacionalismo:</strong> parte de um Partido Mundial. A vitória da revolução só se consolida com a derrota do imperialismo.'
    ],
    proposta: null,
    diferencial: 'Um partido que pretende apenas reformas organiza-se como partido eleitoral: subordina seu programa às alianças com a burguesia.'
  }
},

/* ── 28 STALINISMO E REFORMISMO ── */
{
  arquivo: '28-b4-stalinismo-reformismo.json',
  dados: {
    tipo: 'comparativo',
    modulo: 'Bloco 4 · O Partido Revolucionário',
    tema: 'escuro',
    pre_titulo: 'Opostos ao PSTU',
    titulo: 'Stalinismo e Reformismo',
    subtitulo: '',
    texto: '',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    coluna_esquerda: {
      titulo: 'Reformismo (PT, socialdemocracia)',
      cor: 'cinza',
      itens: [
        { texto: 'Nasceu como instrumento de luta operária — mas foi digerido pela democracia burguesa.', estilo: 'normal' },
        { texto: 'Priorizou vitórias eleitorais e abandonou a independência de classe.', estilo: 'normal' },
        { texto: 'O socialismo virou discurso de festa — prometido para um futuro indefinido.', estilo: 'destaque' }
      ]
    },
    coluna_direita: {
      titulo: 'Stalinismo (PCB e similares)',
      cor: 'cinza',
      itens: [
        { texto: 'Teoria das "etapas": primeiro revolução democrática, só depois a socialista.', estilo: 'normal' },
        { texto: 'Aliança com setores burgueses "progressistas" — frente popular que traiu revoluções.', estilo: 'normal' },
        { texto: 'A independência de classe virou ficção, meramente ritual.', estilo: 'destaque' }
      ]
    },
    diferencial: 'O PSTU: independência de classe total, revolução socialista como estratégia presente — não futura —, e centralismo democrático real.'
  }
},

/* ── 29 BLOCO 5 — ABERTURA ── */
{
  arquivo: '29-b5-abertura.json',
  dados: {
    tipo: 'secao',
    modulo: '',
    tema: 'vermelho',
    pre_titulo: 'Bloco 5',
    titulo: 'PSTU nas Eleições 2026',
    subtitulo: 'Por que os revolucionários participam das eleições burguesas? Usar as eleições para fortalecer o partido e a consciência revolucionária da classe!',
    texto: '',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    numero_gigante: '5',
    tem_linha_acento: true
  }
},

/* ── 30 TRÊS TAREFAS ── */
{
  arquivo: '30-b5-tres-tarefas.json',
  dados: {
    tipo: 'texto',
    modulo: 'Bloco 5 · PSTU nas Eleições 2026',
    tema: 'claro',
    pre_titulo: 'O PSTU na eleição de 2026',
    titulo: 'Três tarefas centrais',
    subtitulo: '',
    texto: '',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    itens: [
      '<strong>Agitação e propaganda qualificada:</strong> elaboração programática combinada com inserção real nas lutas. Construir influencers, potencializar redes e debates.',
      '<strong>Construir nossas figuras públicas:</strong> candidatos ligados às lutas reais, que traduzam nossa política de forma acessível. Construir tribunos populares.',
      '<strong>Organizar mais gente:</strong> comunidade de ativistas, apoiadores, leitores do jornal, filiados, grupos nas redes sociais.'
    ],
    proposta: null,
    diferencial: 'Por muito tempo, ser "o partido das lutas" foi insuficiente — faltava o aspecto programático e ideológico.'
  }
},

/* ── 31 CANDIDATOS ── */
{
  arquivo: '31-b5-candidatos.json',
  dados: {
    tipo: 'cards',
    modulo: 'Bloco 5 · PSTU nas Eleições 2026',
    tema: 'claro',
    pre_titulo: 'Candidaturas operárias e independentes',
    titulo: 'Os candidatos do PSTU para 2026',
    subtitulo: 'A classe trabalhadora representando a si mesma',
    texto: '',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    cards: [
      { nome: 'Zé Maria', cargo: 'Presidente Nacional · ex-candidato à presidência', texto: 'Ex-metalúrgico do ABC. Presidente do PSTU desde 1998. Preso junto a Lula na greve histórica de 1980. Símbolo de 31 anos de independência de classe.', foto_url: '' },
      { nome: 'Vera Lúcia', cargo: 'Candidata ao governo de SP em 2026', texto: 'Operária, negra, nordestina. Primeira mulher negra a disputar a presidência por um partido de esquerda (2018 e 2022).', foto_url: '' },
      { nome: 'Hertz Dias', cargo: 'Pré-candidato à presidência em 2026', texto: 'Rapper do Gíria Vermelha. Fundador do Quilombo Urbano no Maranhão. Professor de História da rede pública. Ativista do movimento negro.', foto_url: '' }
    ]
  }
},

/* ── 32 HERTZ DIAS ── */
{
  arquivo: '32-b5-hertz-dias.json',
  dados: {
    tipo: 'texto',
    modulo: 'Bloco 5 · PSTU nas Eleições 2026',
    tema: 'escuro',
    pre_titulo: 'Hertz Dias 2026',
    titulo: 'Uma candidatura a serviço da construção socialista',
    subtitulo: '',
    texto: 'Não se trata de um projeto eleitoreiro — é uma ferramenta para fortalecer a construção de uma alternativa socialista e revolucionária, <em>independente dos patrões, dos bilionários e do imperialismo</em>.',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'direita',
    texto_borda: false,
    itens: [
      'Luta unificada com negros, mulheres, LGBTI+, povos originários e juventude.',
      'Contra todos os imperialismos — pela Segunda Independência da América Latina.',
      'Por um governo dos trabalhadores sem capitalistas.',
      'Por uma revolução socialista protagonizada pela própria classe trabalhadora.'
    ],
    proposta: {
      titulo: 'Programa da candidatura',
      texto: 'Só uma candidatura independente dos patrões pode defender com legitimidade um programa de ruptura com o sistema capitalista. PT e PSOL fazem alianças de classe — o PSTU não.'
    },
    diferencial: '',
    links: [
      { icone: 'video', texto: 'Programa da candidatura', url: 'https://pstu.org.br' },
      { icone: 'artigo', texto: 'Manifesto Eleitoral 2026', url: 'https://pstu.org.br' }
    ]
  }
},

/* ── 33 BLOCO 6 — ABERTURA ── */
{
  arquivo: '33-b6-abertura.json',
  dados: {
    tipo: 'secao',
    modulo: '',
    tema: 'profundo',
    pre_titulo: 'Bloco 6',
    titulo: 'Ser Militante',
    subtitulo: 'Ser membro do PSTU é um projeto de vida, não uma adesão sazonal. Venha fazer parte da luta pela revolução e o socialismo!',
    texto: '',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    numero_gigante: '6',
    tem_linha_acento: true
  }
},

/* ── 34 SER MILITANTE ── */
{
  arquivo: '34-b6-ser-militante.json',
  dados: {
    tipo: 'texto',
    modulo: 'Bloco 6 · Ser Militante',
    tema: 'claro',
    pre_titulo: '',
    titulo: 'Ser militante',
    subtitulo: '',
    texto: '<strong>SER MEMBRO do PSTU é um projeto de vida</strong>, não uma adesão sazonal. De acordo com as possibilidades de cada um:',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    itens: [
      'Atua nos movimentos de massa',
      'Defende a política partidária em todos os espaços — no trabalho, no bairro, nas redes sociais',
      'Participa dos debates em algum organismo do partido',
      'Contribui financeiramente',
      'Divulga a imprensa do partido',
      'Participa das formações políticas baseadas no marxismo',
      'Exerce o direito de voz e voto, de divergir, e de eleger e ser eleito dirigente',
      'Passa um período como aspirante (3 meses se operário; 6 meses nos demais casos)'
    ],
    proposta: {
      titulo: 'Apoiadores e simpatizantes',
      texto: 'O partido considera aderentes — mesmo não fazendo parte da estrutura orgânica — a todos que o apoiam política ou financeiramente ou atuam em conjunto conosco.'
    },
    diferencial: ''
  }
},

/* ── 35 SUSTENTAÇÃO FINANCEIRA ── */
{
  arquivo: '35-b6-sustentacao.json',
  dados: {
    tipo: 'texto',
    modulo: 'Bloco 6 · Ser Militante',
    tema: 'escuro',
    pre_titulo: 'Independência financeira',
    titulo: '"Quem paga a banda escolhe a música"',
    subtitulo: '',
    texto: 'Partidos financiados por grandes empresas ou pelo fundo estatal tornam-se, inevitavelmente, reféns desses interesses.',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    itens: [
      'Lenin sempre enfatizou que o partido deveria ter uma estrutura financeira sólida alimentada pela base.',
      'Os operários russos destinavam partes significativas de seus salários para manter a imprensa partidária.',
      'O ato de contribuir financeiramente era visto como um ato de militância.'
    ],
    proposta: {
      titulo: 'O modelo do PSTU',
      texto: 'O PSTU só tem direito ao fundo eleitoral. O dia a dia do Partido é sustentado <strong>exclusivamente</strong> por contribuições e campanhas junto à classe trabalhadora e seus militantes.'
    },
    diferencial: ''
  }
},

/* ── 36 ENCERRAMENTO ── */
{
  arquivo: '36-encerramento.json',
  dados: {
    tipo: 'capa',
    modulo: '',
    tema: 'vermelho',
    eh_secao: true,
    rotulo_secao: 'Fim',
    pre_titulo: 'Venha fazer parte da luta!',
    titulo: 'Pela revolução<br/>e o socialismo',
    subtitulo: 'facaparte.pstu.org.br',
    texto: '',
    imagem_url: '',
    imagem_escurecimento: 0,
    imagem_posicao: 'centro',
    texto_borda: false,
    logos: [],
    tem_linha_acento: true,
    links: [
      { icone: 'link', texto: 'pstu.org.br', url: 'https://pstu.org.br' },
      { icone: 'link', texto: 'opiniaosocialista.com.br', url: 'https://opiniaosocialista.com.br' },
      { icone: 'link', texto: 'litci.org/pt/', url: 'https://litci.org/pt/' }
    ]
  }
}

];

/* ── salvar JSONs ── */
slides.forEach(s => salvar(s.arquivo, s.dados));

/* ── salvar indice.json ── */
const indice = slides.map(s => s.arquivo);
salvar('indice.json', indice);

console.log(`✓ ${slides.length} arquivos JSON gerados em pstu-site/dados/`);
console.log('✓ indice.json gerado');
