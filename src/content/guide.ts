/**
 * Plain-language explanations, in English and Brazilian Portuguese.
 *
 * Written for someone who has never read a birth chart. Two rules throughout:
 * say what a thing *is* before saying what it means, and never let a neutral
 * fact (an empty house, a retrograde planet, a tense angle) read as bad news.
 */

import { Bilingual } from '../astro/constants';

type Guide = Record<string, Bilingual>;

export const GUIDE = {
  // --- the wheel ---------------------------------------------------------
  chartWhat: {
    en: 'What am I looking at?',
    pt: 'O que é isto que estou vendo?',
  },
  chartBody: {
    en: 'This circle is the sky over Filderstadt at 12:45 on the day Anton was born, flattened onto paper. The outer ring is the twelve zodiac signs. The symbols inside are the Sun, the Moon and the planets, each sitting where it actually stood in the sky at that minute. The faint lines across the middle join planets that were at meaningful angles to each other.',
    pt: 'Este círculo é o céu sobre Filderstadt às 12h45 do dia em que Anton nasceu, achatado no papel. O anel de fora são os doze signos. Os símbolos de dentro são o Sol, a Lua e os planetas, cada um no lugar onde realmente estava naquele minuto. As linhas finas no meio ligam planetas que formavam ângulos significativos entre si.',
  },
  degreesWhat: {
    en: 'Why "17° 56′ Libra"?',
    pt: 'Por que "17° 56′ Libra"?',
  },
  degreesBody: {
    en: 'Each sign is a 30-degree slice of the circle, so a position is given as how far into its sign something is. "17° 56′ Libra" means almost eighteen degrees into Libra. The minutes (′) are sixtieths of a degree, like minutes on a clock.',
    pt: 'Cada signo é uma fatia de 30 graus do círculo, então a posição diz o quanto algo avançou dentro do seu signo. "17° 56′ Libra" significa quase dezoito graus dentro de Libra. Os minutos (′) são sessenta avos de grau, como os minutos do relógio.',
  },
  bigThreeWhat: {
    en: 'Why these three?',
    pt: 'Por que estes três?',
  },
  bigThreeBody: {
    en: 'Of everything in a chart, these three carry the most. The Sun is the character at the core. The Moon is the inner weather — what he feels and what settles him. The Rising sign is the doorway: the part people meet first. If you only ever remember three words about this chart, remember these.',
    pt: 'De tudo o que há num mapa, estes três carregam mais peso. O Sol é o caráter no centro. A Lua é o clima interno — o que ele sente e o que o acalma. O Ascendente é a porta de entrada: a parte que as pessoas encontram primeiro. Se você só guardar três palavras deste mapa, guarde estas.',
  },
  balanceWhat: {
    en: 'Elements and modalities',
    pt: 'Elementos e modalidades',
  },
  balanceBody: {
    en: 'Every sign belongs to an element — Fire, Earth, Air or Water — and to a modality: cardinal signs start things, fixed signs hold them, mutable signs change them. Counting them up gives a rough temperature of the chart. There is no right balance to have, and a low count is not a deficiency; it just means that flavour is quieter in him.',
    pt: 'Todo signo pertence a um elemento — Fogo, Terra, Ar ou Água — e a uma modalidade: signos cardinais começam as coisas, fixos sustentam, mutáveis transformam. Somar tudo dá a temperatura geral do mapa. Não existe equilíbrio "certo", e um número baixo não é falta de nada; só quer dizer que esse sabor é mais discreto nele.',
  },

  // --- houses ------------------------------------------------------------
  housesWhat: {
    en: 'What is a house?',
    pt: 'O que é uma casa?',
  },
  housesBody: {
    en: 'The signs say how someone does things. The houses say where — which area of life it shows up in. They come from the spinning of the Earth rather than the planets, which is why the exact minute of birth matters: the whole set turns about one degree every four minutes. The first house begins at the eastern horizon, and the other eleven follow around the circle.',
    pt: 'Os signos dizem como alguém faz as coisas. As casas dizem onde — em que área da vida aquilo aparece. Elas vêm da rotação da Terra, e não dos planetas, e é por isso que o minuto exato do nascimento importa: o conjunto todo gira cerca de um grau a cada quatro minutos. A primeira casa começa no horizonte leste, e as outras onze seguem pelo círculo.',
  },
  emptyHouseWhat: {
    en: 'An empty house is normal',
    pt: 'Casa vazia é normal',
  },
  emptyHouseBody: {
    en: 'There are twelve houses and only ten planets, so at least two houses are always empty — in most charts it is five or six. An empty house is not a missing piece of a life, and it is not something lacking. It simply means that area tends to run without much drama, and that Anton will meet it through the sign on its edge rather than through a planet camped inside it.',
    pt: 'São doze casas e apenas dez planetas, então pelo menos duas casas ficam sempre vazias — na maioria dos mapas são cinco ou seis. Casa vazia não é um pedaço faltando na vida, nem sinal de carência. Significa apenas que aquela área costuma correr sem muito drama, e que Anton vai vivê-la pelo signo que está na borda dela, e não por um planeta acampado lá dentro.',
  },
  emptyHouseShort: {
    en: 'No planets here — which is the normal case, and a quiet area rather than an empty one.',
    pt: 'Sem planetas aqui — o que é o caso normal, e significa uma área tranquila, não uma área vazia.',
  },
  rulerNote: {
    en: 'Read it through its ruler instead:',
    pt: 'Leia pelo regente dela:',
  },
  rulerWhat: {
    en: 'What is a ruler?',
    pt: 'O que é um regente?',
  },
  rulerHint: {
    en: 'Every sign has a planet that looks after it. To read a house with no planets in it, you follow that planet to wherever it is sitting — that is where this part of life gets handled from.',
    pt: 'Todo signo tem um planeta que cuida dele. Para ler uma casa sem planetas, você segue esse planeta até onde ele está — é de lá que essa parte da vida é conduzida.',
  },
  angularWhat: {
    en: 'The four marked houses',
    pt: 'As quatro casas marcadas',
  },
  angularBody: {
    en: 'Houses 1, 4, 7 and 10 begin at the four corners of the chart — the horizon and the meridian. They are the most visible parts of a chart, which is why they are tinted here. ASC is the eastern horizon, IC the point below, DSC the western horizon, MC the highest point overhead.',
    pt: 'As casas 1, 4, 7 e 10 começam nos quatro cantos do mapa — o horizonte e o meridiano. São as partes mais visíveis de um mapa, e por isso aparecem com um fundo diferente aqui. ASC é o horizonte leste, IC o ponto abaixo, DSC o horizonte oeste, MC o ponto mais alto do céu.',
  },

  // --- the sky list ------------------------------------------------------
  skyWhat: {
    en: 'How to read this list',
    pt: 'Como ler esta lista',
  },
  skyBody: {
    en: 'Each line is one body: what it governs, the sign it was in, and the house it fell in. Read it as a sentence — "Mercury, thinking and speaking, in Cancer, in the 9th house" becomes: he thinks in a tender, roundabout, feeling way, and does it about far places and big questions.',
    pt: 'Cada linha é um corpo celeste: o que ele rege, o signo em que estava e a casa em que caiu. Leia como uma frase — "Mercúrio, pensar e falar, em Câncer, na casa 9" vira: ele pensa de um jeito terno, indireto, sentimental, e faz isso sobre lugares distantes e perguntas grandes.',
  },
  retrogradeWhat: {
    en: 'What does retrograde mean?',
    pt: 'O que quer dizer retrógrado?',
  },
  retrogradeBody: {
    en: 'Planets do not really go backwards. As Earth overtakes them in its own orbit, they appear to drift backwards against the stars for a while, the way a slower car seems to slide backwards when you pass it. Astrologically it is read as a planet turned inward rather than outward — and it is very common. It is not a fault or a warning.',
    pt: 'Os planetas não andam de verdade para trás. Quando a Terra os ultrapassa na própria órbita, eles parecem recuar em relação às estrelas por um tempo — como um carro mais lento que parece deslizar para trás quando você o ultrapassa. Na astrologia isso é lido como um planeta voltado para dentro em vez de para fora. É muito comum, e não é defeito nem aviso.',
  },
  stationaryWhat: {
    en: 'What does standing still mean?',
    pt: 'O que quer dizer estacionário?',
  },
  stationaryBody: {
    en: 'A planet about to change direction slows almost to a stop first, the way a swing pauses at the top. Being born on one of those pauses is uncommon, and that planet is read as pressing a little harder on the life — patiently, not harshly.',
    pt: 'Um planeta prestes a mudar de direção desacelera quase até parar, como um balanço que pausa no ponto mais alto. Nascer numa dessas pausas é incomum, e esse planeta é lido como algo que pesa um pouco mais na vida — com paciência, não com dureza.',
  },
  pointsWhat: {
    en: 'The last four are not planets',
    pt: 'Os quatro últimos não são planetas',
  },
  pointsBody: {
    en: 'The Nodes, Lilith and the Part of Fortune are calculated points, not objects you could photograph. The Nodes are where the Moon\'s path crosses the Sun\'s, Lilith is the far end of the Moon\'s orbit, and the Part of Fortune is worked out from the Sun, Moon and horizon together. They are included because chart readers use them, and they are the gentlest things here.',
    pt: 'Os Nodos, Lilith e a Parte da Fortuna são pontos calculados, não objetos que você poderia fotografar. Os Nodos são onde o caminho da Lua cruza o do Sol, Lilith é o ponto mais distante da órbita lunar, e a Parte da Fortuna é calculada a partir do Sol, da Lua e do horizonte juntos. Estão aqui porque quem lê mapas os usa, e são as coisas mais leves desta lista.',
  },

  // --- aspects -----------------------------------------------------------
  aspectsWhat: {
    en: 'What is an aspect?',
    pt: 'O que é um aspecto?',
  },
  aspectsBody: {
    en: 'An aspect is simply the angle between two planets, measured around the circle. Certain angles — 0°, 60°, 90°, 120°, 180° — are read as the two planets being in conversation. Everything else is treated as the two not having much to say to each other.',
    pt: 'Um aspecto é simplesmente o ângulo entre dois planetas, medido ao redor do círculo. Certos ângulos — 0°, 60°, 90°, 120°, 180° — são lidos como uma conversa entre os dois planetas. Todos os outros são tratados como dois planetas que não têm muito a dizer um ao outro.',
  },
  orbWhat: {
    en: 'What is the orb?',
    pt: 'O que é a orbe?',
  },
  orbBody: {
    en: 'The angles are almost never exact, so a little tolerance is allowed — the orb is how far off exact it is. A small orb means a loud, unmistakable conversation; a large one means the same theme, spoken more quietly. The bar under each card is full when the aspect is exact.',
    pt: 'Os ângulos quase nunca são exatos, então se permite uma tolerância — a orbe é o quanto ele está longe do exato. Uma orbe pequena significa uma conversa alta e inconfundível; uma grande significa o mesmo tema, dito mais baixinho. A barra embaixo de cada cartão fica cheia quando o aspecto é exato.',
  },
  tensionWhat: {
    en: 'The tense ones are not bad',
    pt: 'Os tensos não são ruins',
  },
  tensionBody: {
    en: 'Squares and oppositions get called "hard" aspects, and the word does them a disservice. They describe two parts of a person that want different things — which is where nearly all drive, humour and interesting character come from. A chart made only of easy angles would belong to someone with very little to push against. Nothing here is a warning.',
    pt: 'Quadraturas e oposições são chamadas de aspectos "tensos", e a palavra é injusta com elas. Elas descrevem duas partes de uma pessoa que querem coisas diferentes — e é daí que vem quase toda a garra, o humor e o caráter interessante. Um mapa feito só de ângulos fáceis seria de alguém com muito pouco contra o que se apoiar. Nada aqui é um aviso.',
  },
  applyingWhat: {
    en: 'Applying and separating',
    pt: 'Aplicativo e separativo',
  },
  applyingBody: {
    en: 'An applying aspect was still tightening at the moment of birth; a separating one had just passed its exact point. Applying is usually read as slightly stronger, the way a note still being struck rings louder than one fading out.',
    pt: 'Um aspecto aplicativo ainda estava se fechando no momento do nascimento; um separativo tinha acabado de passar do ponto exato. O aplicativo costuma ser lido como um pouco mais forte, como uma nota que ainda está sendo tocada soa mais alta que uma que está sumindo.',
  },

  // --- the letter --------------------------------------------------------
  whereNext: {
    en: 'Where to go next',
    pt: 'Para onde ir depois',
  },
  nextChart: {
    en: 'the sky drawn as a circle, with the three placements that matter most',
    pt: 'o céu desenhado como um círculo, com as três posições que mais importam',
  },
  nextSky: {
    en: 'every planet, where it stood, and what it looks after',
    pt: 'cada planeta, onde ele estava, e do que ele cuida',
  },
  nextHouses: {
    en: 'the twelve areas of a life, and which ones have someone living in them',
    pt: 'as doze áreas de uma vida, e quais delas têm alguém morando dentro',
  },
  nextAspects: {
    en: 'the conversations between planets, closest first',
    pt: 'as conversas entre os planetas, das mais próximas às mais distantes',
  },

  // --- family ------------------------------------------------------------
  familyWhat: {
    en: 'What a chart can say about parents',
    pt: 'O que um mapa pode dizer sobre os pais',
  },
  familyBody: {
    en: 'Honestly: not much about them. Anton\u2019s mother and father have charts of their own, and nothing here describes who they are. What this page reads is the shape of his need — what being looked after will have to feel like before it reaches him, what he will recognise as safety, and what he will read as authority. It is a page about him, written for the people who love him.',
    pt: 'Honestamente: pouca coisa sobre eles. A m\u00e3e e o pai do Anton t\u00eam mapas pr\u00f3prios, e nada aqui descreve quem eles s\u00e3o. O que esta p\u00e1gina l\u00ea \u00e9 o formato da necessidade dele — como o cuidado vai precisar ser para chegar nele, o que ele vai reconhecer como seguran\u00e7a, e o que vai ler como autoridade. \u00c9 uma p\u00e1gina sobre ele, escrita para quem o ama.',
  },

  // --- shared ------------------------------------------------------------
  tapToHide: { en: 'tap to hide', pt: 'toque para esconder' },
  tapToRead: { en: 'tap to read', pt: 'toque para ler' },
} satisfies Guide;

export type GuideKey = keyof typeof GUIDE;
