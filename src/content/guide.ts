/**
 * Plain-language explanations, in English, Brazilian Portuguese and German.
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
    de: 'Was sehe ich hier?',
  },
  chartBody: {
    en: 'This circle is the sky over Filderstadt at 12:45 on the day Anton was born, flattened onto paper. The outer ring is the twelve zodiac signs. The symbols inside are the Sun, the Moon and the planets, each sitting where it actually stood in the sky at that minute. The faint lines across the middle join planets that were at meaningful angles to each other.',
    pt: 'Este círculo é o céu sobre Filderstadt às 12h45 do dia em que Anton nasceu, achatado no papel. O anel de fora são os doze signos. Os símbolos de dentro são o Sol, a Lua e os planetas, cada um no lugar onde realmente estava naquele minuto. As linhas finas no meio ligam planetas que formavam ângulos significativos entre si.',
    de: 'Dieser Kreis ist der Himmel über Filderstadt um 12:45 Uhr am Tag von Antons Geburt, flach auf Papier gebracht. Der äußere Ring sind die zwölf Tierkreiszeichen. Die Symbole darin sind die Sonne, der Mond und die Planeten, jeder genau dort, wo er in diesem Moment am Himmel stand. Die feinen Linien in der Mitte verbinden Planeten, die in einem bedeutsamen Winkel zueinander standen.',
  },
  degreesWhat: {
    en: 'Why "17° 56′ Libra"?',
    pt: 'Por que "17° 56′ Libra"?',
    de: 'Warum "17° 56′ Waage"?',
  },
  degreesBody: {
    en: 'Each sign is a 30-degree slice of the circle, so a position is given as how far into its sign something is. "17° 56′ Libra" means almost eighteen degrees into Libra. The minutes (′) are sixtieths of a degree, like minutes on a clock.',
    pt: 'Cada signo é uma fatia de 30 graus do círculo, então a posição diz o quanto algo avançou dentro do seu signo. "17° 56′ Libra" significa quase dezoito graus dentro de Libra. Os minutos (′) são sessenta avos de grau, como os minutos do relógio.',
    de: 'Jedes Zeichen ist ein 30-Grad-Ausschnitt des Kreises, also gibt eine Position an, wie weit etwas in sein Zeichen vorgedrungen ist. "17° 56′ Waage" bedeutet fast achtzehn Grad in der Waage. Die Minuten (′) sind Sechzigstel eines Grades, wie die Minuten einer Uhr.',
  },
  bigThreeWhat: {
    en: 'Why these three?',
    pt: 'Por que estes três?',
    de: 'Warum diese drei?',
  },
  bigThreeBody: {
    en: 'Of everything in a chart, these three carry the most. The Sun is the character at the core. The Moon is the inner weather — what he feels and what settles him. The Rising sign is the doorway: the part people meet first. If you only ever remember three words about this chart, remember these.',
    pt: 'De tudo o que há num mapa, estes três carregam mais peso. O Sol é o caráter no centro. A Lua é o clima interno — o que ele sente e o que o acalma. O Ascendente é a porta de entrada: a parte que as pessoas encontram primeiro. Se você só guardar três palavras deste mapa, guarde estas.',
    de: 'Von allem in einer Karte tragen diese drei am meisten. Die Sonne ist der Charakter im Kern. Der Mond ist das innere Wetter — was er fühlt und was ihn beruhigt. Der Aszendent ist die Tür: der Teil, dem Menschen zuerst begegnen. Wenn du dir nur drei Wörter zu dieser Karte merkst, dann diese.',
  },
  balanceWhat: {
    en: 'Elements and modalities',
    pt: 'Elementos e modalidades',
    de: 'Elemente und Qualitäten',
  },
  balanceBody: {
    en: 'Every sign belongs to an element — Fire, Earth, Air or Water — and to a modality: cardinal signs start things, fixed signs hold them, mutable signs change them. Counting them up gives a rough temperature of the chart. There is no right balance to have, and a low count is not a deficiency; it just means that flavour is quieter in him.',
    pt: 'Todo signo pertence a um elemento — Fogo, Terra, Ar ou Água — e a uma modalidade: signos cardinais começam as coisas, fixos sustentam, mutáveis transformam. Somar tudo dá a temperatura geral do mapa. Não existe equilíbrio "certo", e um número baixo não é falta de nada; só quer dizer que esse sabor é mais discreto nele.',
    de: 'Jedes Zeichen gehört zu einem Element — Feuer, Erde, Luft oder Wasser — und zu einer Qualität: kardinale Zeichen beginnen Dinge, fixe halten sie, veränderliche wandeln sie. Sie zusammenzuzählen ergibt eine grobe Temperatur der Karte. Es gibt kein richtiges Gleichgewicht, und eine niedrige Zahl ist kein Mangel; sie bedeutet nur, dass diese Note in ihm leiser ist.',
  },

  // --- houses ------------------------------------------------------------
  housesWhat: {
    en: 'What is a house?',
    pt: 'O que é uma casa?',
    de: 'Was ist ein Haus?',
  },
  housesBody: {
    en: 'The signs say how someone does things. The houses say where — which area of life it shows up in. They come from the spinning of the Earth rather than the planets, which is why the exact minute of birth matters: the whole set turns about one degree every four minutes. The first house begins at the eastern horizon, and the other eleven follow around the circle.',
    pt: 'Os signos dizem como alguém faz as coisas. As casas dizem onde — em que área da vida aquilo aparece. Elas vêm da rotação da Terra, e não dos planetas, e é por isso que o minuto exato do nascimento importa: o conjunto todo gira cerca de um grau a cada quatro minutos. A primeira casa começa no horizonte leste, e as outras onze seguem pelo círculo.',
    de: 'Die Zeichen sagen, wie jemand Dinge tut. Die Häuser sagen, wo — in welchem Lebensbereich sich das zeigt. Sie entstehen durch die Drehung der Erde und nicht durch die Planeten, weshalb die genaue Geburtsminute zählt: das ganze System dreht sich etwa ein Grad alle vier Minuten. Das erste Haus beginnt am östlichen Horizont, die anderen elf folgen rund um den Kreis.',
  },
  emptyHouseWhat: {
    en: 'An empty house is normal',
    pt: 'Casa vazia é normal',
    de: 'Ein leeres Haus ist normal',
  },
  emptyHouseBody: {
    en: 'There are twelve houses and only ten planets, so at least two houses are always empty — in most charts it is five or six. An empty house is not a missing piece of a life, and it is not something lacking. It simply means that area tends to run without much drama, and that Anton will meet it through the sign on its edge rather than through a planet camped inside it.',
    pt: 'São doze casas e apenas dez planetas, então pelo menos duas casas ficam sempre vazias — na maioria dos mapas são cinco ou seis. Casa vazia não é um pedaço faltando na vida, nem sinal de carência. Significa apenas que aquela área costuma correr sem muito drama, e que Anton vai vivê-la pelo signo que está na borda dela, e não por um planeta acampado lá dentro.',
    de: 'Es gibt zwölf Häuser und nur zehn Planeten, also bleiben immer mindestens zwei Häuser leer — in den meisten Karten sind es fünf oder sechs. Ein leeres Haus ist kein fehlendes Stück Leben und kein Mangel. Es bedeutet nur, dass dieser Bereich meist ohne viel Drama läuft, und dass Anton ihm über das Zeichen an seinem Rand begegnet statt über einen Planeten darin.',
  },
  emptyHouseShort: {
    en: 'No planets here — which is the normal case, and a quiet area rather than an empty one.',
    pt: 'Sem planetas aqui — o que é o caso normal, e significa uma área tranquila, não uma área vazia.',
    de: 'Keine Planeten hier — das ist der Normalfall, und bedeutet einen ruhigen Bereich, keinen leeren.',
  },
  rulerNote: {
    en: 'Read it through its ruler instead:',
    pt: 'Leia pelo regente dela:',
    de: 'Lies es stattdessen über seinen Herrscher:',
  },
  rulerWhat: {
    en: 'What is a ruler?',
    pt: 'O que é um regente?',
    de: 'Was ist ein Herrscher?',
  },
  rulerHint: {
    en: 'Every sign has a planet that looks after it. To read a house with no planets in it, you follow that planet to wherever it is sitting — that is where this part of life gets handled from.',
    pt: 'Todo signo tem um planeta que cuida dele. Para ler uma casa sem planetas, você segue esse planeta até onde ele está — é de lá que essa parte da vida é conduzida.',
    de: 'Jedes Zeichen hat einen Planeten, der sich um es kümmert. Um ein Haus ohne Planeten zu lesen, folgst du diesem Planeten dorthin, wo er steht — von dort aus wird dieser Teil des Lebens gesteuert.',
  },
  angularWhat: {
    en: 'The four marked houses',
    pt: 'As quatro casas marcadas',
    de: 'Die vier markierten Häuser',
  },
  angularBody: {
    en: 'Houses 1, 4, 7 and 10 begin at the four corners of the chart — the horizon and the meridian. They are the most visible parts of a chart, which is why they are tinted here. ASC is the eastern horizon, IC the point below, DSC the western horizon, MC the highest point overhead.',
    pt: 'As casas 1, 4, 7 e 10 começam nos quatro cantos do mapa — o horizonte e o meridiano. São as partes mais visíveis de um mapa, e por isso aparecem com um fundo diferente aqui. ASC é o horizonte leste, IC o ponto abaixo, DSC o horizonte oeste, MC o ponto mais alto do céu.',
    de: 'Die Häuser 1, 4, 7 und 10 beginnen an den vier Ecken der Karte — dem Horizont und dem Meridian. Sie sind die sichtbarsten Teile einer Karte, weshalb sie hier hervorgehoben sind. ASC ist der östliche Horizont, IC der Punkt darunter, DSC der westliche Horizont, MC der höchste Punkt am Himmel.',
  },

  // --- the sky list ------------------------------------------------------
  skyWhat: {
    en: 'How to read this list',
    pt: 'Como ler esta lista',
    de: 'Wie man diese Liste liest',
  },
  skyBody: {
    en: 'Each line is one body: what it governs, the sign it was in, and the house it fell in. Read it as a sentence — "Mercury, thinking and speaking, in Cancer, in the 9th house" becomes: he thinks in a tender, roundabout, feeling way, and does it about far places and big questions.',
    pt: 'Cada linha é um corpo celeste: o que ele rege, o signo em que estava e a casa em que caiu. Leia como uma frase — "Mercúrio, pensar e falar, em Câncer, na casa 9" vira: ele pensa de um jeito terno, indireto, sentimental, e faz isso sobre lugares distantes e perguntas grandes.',
    de: 'Jede Zeile ist ein Himmelskörper: wofür er zuständig ist, in welchem Zeichen er stand und in welches Haus er fiel. Lies es als Satz — "Merkur, Denken und Sprechen, in Krebs, im 9. Haus" wird zu: er denkt auf eine zärtliche, umständliche, gefühlvolle Art, und tut das über ferne Orte und große Fragen.',
  },
  retrogradeWhat: {
    en: 'What does retrograde mean?',
    pt: 'O que quer dizer retrógrado?',
    de: 'Was bedeutet rückläufig?',
  },
  retrogradeBody: {
    en: 'Planets do not really go backwards. As Earth overtakes them in its own orbit, they appear to drift backwards against the stars for a while, the way a slower car seems to slide backwards when you pass it. Astrologically it is read as a planet turned inward rather than outward — and it is very common. It is not a fault or a warning.',
    pt: 'Os planetas não andam de verdade para trás. Quando a Terra os ultrapassa na própria órbita, eles parecem recuar em relação às estrelas por um tempo — como um carro mais lento que parece deslizar para trás quando você o ultrapassa. Na astrologia isso é lido como um planeta voltado para dentro em vez de para fora. É muito comum, e não é defeito nem aviso.',
    de: 'Planeten laufen nicht wirklich rückwärts. Wenn die Erde sie auf ihrer eigenen Bahn überholt, scheinen sie eine Weile vor den Sternen zurückzudriften — so wie ein langsameres Auto rückwärts zu gleiten scheint, wenn man es überholt. Astrologisch wird das als ein Planet gelesen, der nach innen statt nach außen gewandt ist — und das ist sehr häufig. Es ist kein Makel und keine Warnung.',
  },
  stationaryWhat: {
    en: 'What does standing still mean?',
    pt: 'O que quer dizer estacionário?',
    de: 'Was bedeutet stillstehend?',
  },
  stationaryBody: {
    en: 'A planet about to change direction slows almost to a stop first, the way a swing pauses at the top. Being born on one of those pauses is uncommon, and that planet is read as pressing a little harder on the life — patiently, not harshly.',
    pt: 'Um planeta prestes a mudar de direção desacelera quase até parar, como um balanço que pausa no ponto mais alto. Nascer numa dessas pausas é incomum, e esse planeta é lido como algo que pesa um pouco mais na vida — com paciência, não com dureza.',
    de: 'Ein Planet, der gleich die Richtung wechselt, wird vorher fast bis zum Stillstand langsamer, so wie eine Schaukel oben kurz innehält. In einer dieser Pausen geboren zu werden ist selten, und dieser Planet wird so gelesen, dass er etwas stärker auf das Leben drückt — geduldig, nicht hart.',
  },
  pointsWhat: {
    en: 'The last four are not planets',
    pt: 'Os quatro últimos não são planetas',
    de: 'Die letzten vier sind keine Planeten',
  },
  pointsBody: {
    en: 'The Nodes, Lilith and the Part of Fortune are calculated points, not objects you could photograph. The Nodes are where the Moon\'s path crosses the Sun\'s, Lilith is the far end of the Moon\'s orbit, and the Part of Fortune is worked out from the Sun, Moon and horizon together. They are included because chart readers use them, and they are the gentlest things here.',
    pt: 'Os Nodos, Lilith e a Parte da Fortuna são pontos calculados, não objetos que você poderia fotografar. Os Nodos são onde o caminho da Lua cruza o do Sol, Lilith é o ponto mais distante da órbita lunar, e a Parte da Fortuna é calculada a partir do Sol, da Lua e do horizonte juntos. Estão aqui porque quem lê mapas os usa, e são as coisas mais leves desta lista.',
    de: 'Die Mondknoten, Lilith und der Glückspunkt sind berechnete Punkte, keine Objekte, die man fotografieren könnte. Die Mondknoten sind dort, wo sich die Bahn des Mondes mit der der Sonne kreuzt, Lilith ist der ferne Punkt der Mondbahn, und der Glückspunkt wird aus Sonne, Mond und Horizont zusammen errechnet. Sie sind hier, weil Kartenleser sie nutzen, und sie sind das Sanfteste auf dieser Liste.',
  },

  // --- aspects -----------------------------------------------------------
  aspectsWhat: {
    en: 'What is an aspect?',
    pt: 'O que é um aspecto?',
    de: 'Was ist ein Aspekt?',
  },
  aspectsBody: {
    en: 'An aspect is simply the angle between two planets, measured around the circle. Certain angles — 0°, 60°, 90°, 120°, 180° — are read as the two planets being in conversation. Everything else is treated as the two not having much to say to each other.',
    pt: 'Um aspecto é simplesmente o ângulo entre dois planetas, medido ao redor do círculo. Certos ângulos — 0°, 60°, 90°, 120°, 180° — são lidos como uma conversa entre os dois planetas. Todos os outros são tratados como dois planetas que não têm muito a dizer um ao outro.',
    de: 'Ein Aspekt ist einfach der Winkel zwischen zwei Planeten, gemessen rund um den Kreis. Bestimmte Winkel — 0°, 60°, 90°, 120°, 180° — werden gelesen als: die beiden Planeten stehen im Gespräch. Alles andere gilt als: die beiden haben sich nicht viel zu sagen.',
  },
  orbWhat: {
    en: 'What is the orb?',
    pt: 'O que é a orbe?',
    de: 'Was ist der Orbis?',
  },
  orbBody: {
    en: 'The angles are almost never exact, so a little tolerance is allowed — the orb is how far off exact it is. A small orb means a loud, unmistakable conversation; a large one means the same theme, spoken more quietly. The bar under each card is full when the aspect is exact.',
    pt: 'Os ângulos quase nunca são exatos, então se permite uma tolerância — a orbe é o quanto ele está longe do exato. Uma orbe pequena significa uma conversa alta e inconfundível; uma grande significa o mesmo tema, dito mais baixinho. A barra embaixo de cada cartão fica cheia quando o aspecto é exato.',
    de: 'Die Winkel sind fast nie exakt, deshalb wird etwas Toleranz erlaubt — der Orbis ist, wie weit man vom exakten Winkel entfernt ist. Ein kleiner Orbis bedeutet ein lautes, unmissverständliches Gespräch; ein großer bedeutet dasselbe Thema, nur leiser gesagt. Der Balken unter jeder Karte ist voll, wenn der Aspekt exakt ist.',
  },
  tensionWhat: {
    en: 'The tense ones are not bad',
    pt: 'Os tensos não são ruins',
    de: 'Die angespannten sind nicht schlecht',
  },
  tensionBody: {
    en: 'Squares and oppositions get called "hard" aspects, and the word does them a disservice. They describe two parts of a person that want different things — which is where nearly all drive, humour and interesting character come from. A chart made only of easy angles would belong to someone with very little to push against. Nothing here is a warning.',
    pt: 'Quadraturas e oposições são chamadas de aspectos "tensos", e a palavra é injusta com elas. Elas descrevem duas partes de uma pessoa que querem coisas diferentes — e é daí que vem quase toda a garra, o humor e o caráter interessante. Um mapa feito só de ângulos fáceis seria de alguém com muito pouco contra o que se apoiar. Nada aqui é um aviso.',
    de: 'Quadrate und Oppositionen werden "harte" Aspekte genannt, und das Wort wird ihnen nicht gerecht. Sie beschreiben zwei Teile einer Person, die Unterschiedliches wollen — und genau daher kommen fast aller Antrieb, Humor und interessanter Charakter. Eine Karte nur aus leichten Winkeln würde zu jemandem gehören, der sehr wenig hat, wogegen er sich stemmen kann. Nichts hier ist eine Warnung.',
  },
  aspectLegend: {
    en: 'Colour is the feel: teal for flowing, navy for tense, periwinkle for neutral. The bar is the strength — it fills in as the angle gets closer to exact.',
    pt: 'A cor é o clima: verde-água para fluido, azul-marinho para tenso, periwinkle para neutro. A barra é a força — ela se enche conforme o ângulo fica mais exato.',
    de: 'Die Farbe ist die Stimmung: Türkis für fließend, Marineblau für angespannt, Periwinkle für neutral. Der Balken ist die Stärke — er füllt sich, je näher der Winkel am exakten Wert liegt.',
  },
  applyingWhat: {
    en: 'Applying and separating',
    pt: 'Aplicativo e separativo',
    de: 'Zunehmend und abnehmend',
  },
  applyingBody: {
    en: 'An applying aspect was still tightening at the moment of birth; a separating one had just passed its exact point. Applying is usually read as slightly stronger, the way a note still being struck rings louder than one fading out.',
    pt: 'Um aspecto aplicativo ainda estava se fechando no momento do nascimento; um separativo tinha acabado de passar do ponto exato. O aplicativo costuma ser lido como um pouco mais forte, como uma nota que ainda está sendo tocada soa mais alta que uma que está sumindo.',
    de: 'Ein zunehmender Aspekt zog sich im Geburtsmoment noch enger zusammen; ein abnehmender hatte seinen exakten Punkt gerade überschritten. Zunehmend wird meist als etwas stärker gelesen, so wie ein noch angeschlagener Ton lauter klingt als einer, der schon verklingt.',
  },

  // --- the letter --------------------------------------------------------
  whereNext: {
    en: 'Where to go next',
    pt: 'Para onde ir depois',
    de: 'Wie es weitergeht',
  },
  nextChart: {
    en: 'the sky drawn as a circle, with the three placements that matter most',
    pt: 'o céu desenhado como um círculo, com as três posições que mais importam',
    de: 'der Himmel als Kreis gezeichnet, mit den drei wichtigsten Positionen',
  },
  nextSky: {
    en: 'every planet, where it stood, and what it looks after',
    pt: 'cada planeta, onde ele estava, e do que ele cuida',
    de: 'jeder Planet, wo er stand, und wofür er zuständig ist',
  },
  nextHouses: {
    en: 'the twelve areas of a life, and which ones have someone living in them',
    pt: 'as doze áreas de uma vida, e quais delas têm alguém morando dentro',
    de: 'die zwölf Bereiche eines Lebens, und welche davon bewohnt sind',
  },
  nextAspects: {
    en: 'the conversations between planets, closest first',
    pt: 'as conversas entre os planetas, das mais próximas às mais distantes',
    de: 'die Gespräche zwischen den Planeten, die engsten zuerst',
  },
  nextFamily: {
    en: 'what care and authority will mean to him, and where that comes from in the chart',
    pt: 'o que cuidado e autoridade vão significar para ele, e de onde isso vem no mapa',
    de: 'was Fürsorge und Autorität für ihn bedeuten werden, und woher das in der Karte kommt',
  },

  // --- family ------------------------------------------------------------
  familyWhat: {
    en: 'What a chart can say about parents',
    pt: 'O que um mapa pode dizer sobre os pais',
    de: 'Was eine Karte über die Eltern sagen kann',
  },
  familyBody: {
    en: 'Honestly: not much about them. Anton’s mother and father have charts of their own, and nothing here describes who they are. What this page reads is the shape of his need — what being looked after will have to feel like before it reaches him, what he will recognise as safety, and what he will read as authority. It is a page about him, written for the people who love him.',
    pt: 'Honestamente: pouca coisa sobre eles. A mãe e o pai do Anton têm mapas próprios, e nada aqui descreve quem eles são. O que esta página lê é o formato da necessidade dele — como o cuidado vai precisar ser para chegar nele, o que ele vai reconhecer como segurança, e o que vai ler como autoridade. É uma página sobre ele, escrita para quem o ama.',
    de: 'Ehrlich gesagt: nicht viel über sie. Antons Mutter und Vater haben ihre eigenen Karten, und nichts hier beschreibt, wer sie sind. Was diese Seite liest, ist die Form seines Bedürfnisses — wie Fürsorge sich anfühlen muss, bevor sie bei ihm ankommt, was er als Geborgenheit erkennen wird, und was er als Autorität lesen wird. Es ist eine Seite über ihn, geschrieben für die Menschen, die ihn lieben.',
  },

  // --- the header hamburger ------------------------------------------------
  aboutHeading: {
    en: 'About this gift',
    pt: 'Sobre este presente',
    de: 'Über dieses Geschenk',
  },
  aboutProjectBody: {
    en: 'Anton’s Sky is a small, exact gift: the real positions of the sun, the moon and every planet at 12:45 on 26 July 2026 — the minute Anton arrived — turned into something Re, Pippo and the whole family can sit down and read. Made and developed with love by Aunt Nath.',
    pt: 'O Céu de Anton é um presente pequeno e exato: as posições reais do sol, da lua e de cada planeta às 12h45 de 26 de julho de 2026 — o minuto em que o Anton chegou — transformadas em algo que a Re, o Pippo e toda a família conseguem sentar e ler. Feito e desenvolvido com amor pela Tia Nath.',
    de: 'Antons Himmel ist ein kleines, exaktes Geschenk: die echten Positionen von Sonne, Mond und jedem Planeten um 12:45 Uhr am 26. Juli 2026 — der Minute, in der Anton ankam — verwandelt in etwas, das Re, Pippo und die ganze Familie sich hinsetzen und lesen können. Mit Liebe gemacht und entwickelt von Tante Nath.',
  },

  // --- shared ------------------------------------------------------------
  tapToHide: { en: 'tap to hide', pt: 'toque para esconder', de: 'zum Verbergen tippen' },
  tapToRead: { en: 'tap to read', pt: 'toque para ler', de: 'zum Lesen tippen' },
} satisfies Guide;

export type GuideKey = keyof typeof GUIDE;
