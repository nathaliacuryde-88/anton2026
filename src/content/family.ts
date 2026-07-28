/**
 * The Family reading.
 *
 * A chart cannot describe a mother or a father — they have charts of their
 * own. What it can describe is the shape of the child's need: what being
 * looked after feels like to him, what he will read as safety, what he will
 * read as authority. Everything here is written that way round, and the screen
 * says so before it says anything else.
 *
 * The pieces used are the traditional ones: the Moon for being cared for, the
 * Sun for the fathering principle, the 4th house and its ruler for home and
 * roots, the 10th for what the family shows the world, and Saturn for the
 * shape of rules.
 */

import {
  ASPECTS,
  Bilingual,
  BODIES,
  BodyKey,
  Lang,
  SIGNS,
  SIGN_RULER,
} from '../astro/constants';
import { Chart } from '../astro/engine';
import { ASPECT_MEANING, BODY_MEANING, HOUSE_MEANING } from './interpretations';

export type FamilySection = {
  heading: string;
  /** Small label above the heading, e.g. "Moon in Sagittarius". */
  kicker?: string;
  paragraphs: string[];
  /** The sign named in the kicker, for a small constellation ornament. */
  sign?: string;
};

/** The Moon: what being cared for has to feel like before it lands. */
const CARE_IN_SIGN: Bilingual[] = [
  {
    en: 'He will want comfort to arrive quickly and without a fuss. Being met at full volume — picked up the moment he calls — is what tells him he is safe.',
    pt: 'Ele vai querer que o consolo chegue rápido e sem rodeios. Ser atendido no volume máximo — colo assim que chama — é o que diz a ele que está seguro.',
    de: 'Er wird wollen, dass Trost schnell und ohne Umstände kommt. In voller Lautstärke erhört zu werden — hochgenommen, sobald er ruft — sagt ihm, dass er sicher ist.',
  },
  {
    en: 'Safety, for him, is physical and repeatable: the same arms, the same blanket, the same song. Consistency will do more than any clever words.',
    pt: 'Segurança, para ele, é física e repetível: os mesmos braços, o mesmo cobertor, a mesma música. Constância vai fazer mais do que qualquer palavra bonita.',
    de: 'Sicherheit ist für ihn körperlich und wiederholbar: dieselben Arme, dieselbe Decke, dasselbe Lied. Beständigkeit bewirkt mehr als jedes kluge Wort.',
  },
  {
    en: 'He is soothed by being talked to. Long before he understands a word, the sound of someone explaining the world to him will settle his whole body.',
    pt: 'Ele se acalma sendo conversado. Muito antes de entender uma palavra, o som de alguém explicando o mundo para ele vai acalmar o corpo inteiro.',
    de: 'Er wird beruhigt, wenn man mit ihm spricht. Lange bevor er ein Wort versteht, wird ihn der Klang von jemandem, der ihm die Welt erklärt, im ganzen Körper beruhigen.',
  },
  {
    en: 'He wants to be held close and kept near. Presence matters more than activity: someone simply being in the room is the thing that works.',
    pt: 'Ele quer colo e quer estar perto. Presença importa mais do que atividade: alguém simplesmente estar no cômodo já é o que funciona.',
    de: 'Er will nah gehalten und in der Nähe behalten werden. Anwesenheit zählt mehr als Aktivität: dass jemand einfach im Raum ist, ist das, was wirkt.',
  },
  {
    en: 'He needs delight, not just care. Being watched with pleasure — someone visibly glad he exists — is the version of love that reaches him.',
    pt: 'Ele precisa de encantamento, não só de cuidado. Ser olhado com prazer — alguém visivelmente feliz por ele existir — é a versão de amor que chega nele.',
    de: 'Er braucht Begeisterung, nicht nur Fürsorge. Mit Freude betrachtet zu werden — jemand, der sichtlich froh ist, dass es ihn gibt — ist die Version von Liebe, die ihn erreicht.',
  },
  {
    en: 'He is calmed by order and by being usefully attended to. Small practical acts of care will land harder than grand declarations.',
    pt: 'Ele se acalma com ordem e com um cuidado prático. Pequenos gestos úteis vão chegar mais fundo do que grandes declarações.',
    de: 'Er wird durch Ordnung beruhigt, und dadurch, nützlich umsorgt zu werden. Kleine, praktische Gesten der Fürsorge treffen ihn stärker als große Erklärungen.',
  },
  {
    en: 'He takes the temperature of the room. Calm between the adults around him is, for him, the same thing as being held.',
    pt: 'Ele mede a temperatura do ambiente. Calma entre os adultos ao redor é, para ele, a mesma coisa que colo.',
    de: 'Er misst die Temperatur des Raumes. Ruhe zwischen den Erwachsenen um ihn herum ist für ihn dasselbe wie gehalten zu werden.',
  },
  {
    en: 'He will feel things deeply and show only part of it. Being allowed his privacy, without being pulled open, is how trust gets built with him.',
    pt: 'Ele vai sentir fundo e mostrar só uma parte. Ter sua privacidade respeitada, sem ser aberto à força, é como a confiança se constrói com ele.',
    de: 'Er wird Dinge tief fühlen und nur einen Teil davon zeigen. Ihm seine Privatsphäre zu lassen, ohne ihn aufzudrängen, ist, wie sich Vertrauen mit ihm aufbaut.',
  },
  {
    en: 'He needs room even while being held. Comfort that comes with space in it — a change of scene, an open door — works better than being wrapped up tight.',
    pt: 'Ele precisa de espaço mesmo no colo. Um consolo com folga dentro — mudar de cenário, uma porta aberta — funciona melhor do que ser embrulhado apertado.',
    de: 'Er braucht Raum, selbst während er gehalten wird. Trost, der Platz darin lässt — ein Tapetenwechsel, eine offene Tür — wirkt besser, als fest eingewickelt zu werden.',
  },
  {
    en: 'He is steadied by being taken seriously. Being spoken to as though he is capable will comfort him more than being fussed over.',
    pt: 'Ele se firma sendo levado a sério. Falar com ele como se fosse capaz vai confortá-lo mais do que ser paparicado.',
    de: 'Ernst genommen zu werden gibt ihm Halt. Mit ihm zu sprechen, als sei er fähig, tröstet ihn mehr, als umsorgt zu werden.',
  },
  {
    en: 'He needs a little distance to feel close, and he will regulate himself if given the chance. Space offered freely is what he reads as love.',
    pt: 'Ele precisa de um pouco de distância para se sentir perto, e vai se regular sozinho se puder. Espaço oferecido de bom grado é o que ele lê como amor.',
    de: 'Er braucht ein wenig Abstand, um Nähe zu spüren, und wird sich selbst regulieren, wenn man ihm die Chance gibt. Frei angebotener Raum ist das, was er als Liebe liest.',
  },
  {
    en: 'He absorbs whatever is in the air around him. Quiet, water, dim light and unhurried people are what put him back together.',
    pt: 'Ele absorve o que está no ar ao redor. Silêncio, água, luz baixa e gente sem pressa são o que o recompõem.',
    de: 'Er saugt auf, was in der Luft um ihn herum liegt. Stille, Wasser, gedämpftes Licht und Menschen ohne Eile setzen ihn wieder zusammen.',
  },
];

/** The Sun: what authority and fathering will mean to him. */
const AUTHORITY_IN_SIGN: Bilingual[] = [
  {
    en: 'He will respect courage and directness, and he will test a rule to see whether it holds. Say the thing plainly and mean it.',
    pt: 'Ele vai respeitar coragem e franqueza, e vai testar uma regra para ver se ela se sustenta. Diga a coisa com clareza e sustente.',
    de: 'Er wird Mut und Direktheit respektieren, und eine Regel testen, um zu sehen, ob sie hält. Sag die Sache klar, und meine sie auch so.',
  },
  {
    en: 'He will trust steadiness. Promises kept slowly and exactly will build more authority with him than any amount of firmness.',
    pt: 'Ele vai confiar em firmeza tranquila. Promessas cumpridas devagar e exatamente vão construir mais autoridade do que qualquer rigidez.',
    de: 'Er wird Beständigkeit vertrauen. Versprechen, die langsam und genau gehalten werden, bauen mehr Autorität bei ihm auf als jede Strenge.',
  },
  {
    en: 'He will trust whoever explains. Reasons work on him; bare instructions bounce off.',
    pt: 'Ele vai confiar em quem explica. Motivos funcionam com ele; ordens secas escorregam.',
    de: 'Er wird vertrauen, wer erklärt. Gründe wirken bei ihm; bloße Anweisungen prallen ab.',
  },
  {
    en: 'He will read authority through feeling. A tone of voice will teach him more than the content of what is said.',
    pt: 'Ele vai ler autoridade pelo sentimento. Um tom de voz vai ensinar mais a ele do que o conteúdo do que foi dito.',
    de: 'Er wird Autorität über das Gefühl lesen. Ein Tonfall wird ihm mehr beibringen als der Inhalt des Gesagten.',
  },
  {
    en: 'He will want to be proud of the grown-ups he belongs to, and to be visibly enjoyed by them. Warmth carries more weight with him than rules.',
    pt: 'Ele vai querer se orgulhar dos adultos aos quais pertence, e ser visivelmente apreciado por eles. Calor pesa mais com ele do que regra.',
    de: 'Er wird stolz sein wollen auf die Erwachsenen, zu denen er gehört, und sichtlich von ihnen genossen werden wollen. Wärme wiegt bei ihm schwerer als Regeln.',
  },
  {
    en: 'He will notice whether the grown-ups do what they say. Small inconsistencies will register; competence will earn him.',
    pt: 'Ele vai reparar se os adultos fazem o que dizem. Pequenas incoerências ficam registradas; competência conquista ele.',
    de: 'Er wird bemerken, ob die Erwachsenen tun, was sie sagen. Kleine Widersprüche werden registriert; Kompetenz wird ihn gewinnen.',
  },
  {
    en: 'He will care whether things are fair, and will accept almost anything that is explained as fair. Arbitrary rules will not survive him.',
    pt: 'Ele vai se importar se as coisas são justas, e vai aceitar quase tudo que for explicado como justo. Regra arbitrária não sobrevive com ele.',
    de: 'Es wird ihm wichtig sein, ob Dinge fair sind, und er wird fast alles akzeptieren, was als fair erklärt wird. Willkürliche Regeln überleben ihn nicht.',
  },
  {
    en: 'He will watch closely and say little. Honesty matters more than gentleness here — he will always know when something is being managed.',
    pt: 'Ele vai observar de perto e falar pouco. Honestidade importa mais que delicadeza aqui — ele sempre percebe quando algo está sendo maquiado.',
    de: 'Er wird genau beobachten und wenig sagen. Ehrlichkeit zählt hier mehr als Sanftheit — er wird immer merken, wenn etwas beschönigt wird.',
  },
  {
    en: 'He will follow whoever seems to be enjoying life. Authority that comes with humour and a wide horizon will keep him.',
    pt: 'Ele vai seguir quem parece estar gostando da vida. Autoridade com humor e horizonte largo vai segurá-lo.',
    de: 'Er wird folgen, wer das Leben zu genießen scheint. Autorität mit Humor und weitem Horizont wird ihn halten.',
  },
  {
    en: 'He will take structure seriously, perhaps more seriously than intended. Be careful to let him off the hook sometimes.',
    pt: 'Ele vai levar estrutura a sério, talvez mais a sério do que se pretendia. Tome cuidado para liberá-lo de vez em quando.',
    de: 'Er wird Struktur ernst nehmen, vielleicht ernster, als beabsichtigt war. Achte darauf, ihn manchmal aus der Pflicht zu entlassen.',
  },
  {
    en: 'He will not accept authority simply because it is authority. Being treated as a person with a view will get further than rank.',
    pt: 'Ele não vai aceitar autoridade só por ser autoridade. Ser tratado como alguém com opinião vai longe mais do que hierarquia.',
    de: 'Er wird Autorität nicht einfach akzeptieren, weil sie Autorität ist. Als jemand mit eigener Meinung behandelt zu werden, kommt weiter als ein Rang.',
  },
  {
    en: 'He will absorb the mood of whoever is in charge. Steadiness in the adults becomes steadiness in him, almost directly.',
    pt: 'Ele vai absorver o humor de quem está no comando. Firmeza nos adultos vira firmeza nele, quase diretamente.',
    de: 'Er wird die Stimmung von dem aufnehmen, der das Sagen hat. Beständigkeit in den Erwachsenen wird fast direkt zu Beständigkeit in ihm.',
  },
];

/** The 4th house cusp: the feeling of home itself. */
const HOME_IN_SIGN: Bilingual[] = [
  {
    en: 'a house with energy in it — doors, noise, things being started',
    pt: 'uma casa com energia dentro — portas, barulho, coisas começando',
    de: 'ein Zuhause mit Energie darin — Türen, Lärm, Dinge, die beginnen',
  },
  {
    en: 'a house built to be comfortable and kept that way',
    pt: 'uma casa feita para ser confortável e mantida assim',
    de: 'ein Zuhause, gebaut, um bequem zu sein, und so gehalten',
  },
  {
    en: 'a house full of talk, questions and half-finished sentences',
    pt: 'uma casa cheia de conversa, perguntas e frases pela metade',
    de: 'ein Zuhause voller Gespräche, Fragen und halbfertiger Sätze',
  },
  {
    en: 'a house that is unmistakably a home — soft, held, remembered',
    pt: 'uma casa que é inconfundivelmente um lar — macia, acolhida, lembrada',
    de: 'ein Zuhause, das unverkennbar ein Daheim ist — weich, gehalten, erinnert',
  },
  {
    en: 'a house with warmth at the centre of it, and a bit of theatre',
    pt: 'uma casa com calor no centro, e um tanto de teatro',
    de: 'ein Zuhause mit Wärme in seiner Mitte, und ein wenig Theater',
  },
  {
    en: 'a house that runs well, where care shows up as small useful acts',
    pt: 'uma casa que funciona bem, onde o cuidado aparece em atos pequenos e úteis',
    de: 'ein Zuhause, das gut funktioniert, wo Fürsorge sich in kleinen nützlichen Taten zeigt',
  },
  {
    en: 'a house that wants to be beautiful and peaceful, and works at both',
    pt: 'uma casa que quer ser bonita e em paz, e se esforça pelas duas coisas',
    de: 'ein Zuhause, das schön und friedlich sein will, und an beidem arbeitet',
  },
  {
    en: 'a house with real privacy in it, where the deep things are known',
    pt: 'uma casa com privacidade de verdade, onde as coisas profundas são sabidas',
    de: 'ein Zuhause mit echter Privatsphäre, wo die tiefen Dinge bekannt sind',
  },
  {
    en: 'a house with the door open and somewhere else always in mind',
    pt: 'uma casa de porta aberta e sempre com outro lugar em mente',
    de: 'ein Zuhause mit offener Tür, immer mit einem anderen Ort im Sinn',
  },
  {
    en: 'a house built patiently, to last, by people who take it seriously',
    pt: 'uma casa construída com paciência, para durar, por gente que leva isso a sério',
    de: 'ein Zuhause, geduldig gebaut, um zu bestehen, von Menschen, die es ernst nehmen',
  },
  {
    en: 'a house run its own way, unlike the neighbours, and glad of it',
    pt: 'uma casa tocada do jeito dela, diferente dos vizinhos, e feliz com isso',
    de: 'ein Zuhause, das seinen eigenen Weg geht, anders als die Nachbarn, und froh darüber',
  },
  {
    en: 'a house that is gentle and a little dreamy, where feelings move freely',
    pt: 'uma casa gentil e um pouco sonhadora, onde os sentimentos circulam',
    de: 'ein Zuhause, das sanft und ein wenig verträumt ist, wo Gefühle sich frei bewegen',
  },
];

const label = (key: BodyKey, lang: Lang) => BODIES[key].name[lang];

export function buildFamily(chart: Chart, lang: Lang): FamilySection[] {
  const sections: FamilySection[] = [];

  const moon = chart.placements.moon;
  const sun = chart.placements.sun;
  const saturn = chart.placements.saturn;

  const icSign = SIGNS[Math.floor(((chart.mc + 180) % 360) / 30)];
  const mcSign = SIGNS[Math.floor(chart.mc / 30)];

  const icRulerKey = SIGN_RULER[icSign.key];
  const icRuler = chart.placements[icRulerKey];
  const mcRulerKey = SIGN_RULER[mcSign.key];
  const mcRuler = chart.placements[mcRulerKey];

  // Standalone label, for an appositive — "Moon in Sagittarius, the 3rd house".
  const houseLabel = (n: number) =>
    lang === 'en' ? `the ${ordinal(n)} house` : lang === 'de' ? `das ${n}. Haus` : `a casa ${n}`;
  // Already carries its own preposition, for "sits ___" sentences — German's
  // dative "im" can't be built by prepending a literal word the way English
  // "in" or Portuguese's contracted "n" can.
  const inTheHouse = (n: number) =>
    lang === 'en'
      ? `in the ${ordinal(n)} house`
      : lang === 'de'
        ? `im ${n}. Haus`
        : `na casa ${n}`;

  // --- being cared for ---------------------------------------------------
  sections.push({
    kicker:
      lang === 'en'
        ? `Moon in ${SIGNS[moon.signIndex].name.en}, ${houseLabel(moon.house)}`
        : lang === 'de'
          ? `Mond in ${SIGNS[moon.signIndex].name.de}, ${houseLabel(moon.house)}`
          : `Lua em ${SIGNS[moon.signIndex].name.pt}, ${houseLabel(moon.house)}`,
    heading: lang === 'en' ? 'Being looked after' : lang === 'de' ? 'Umsorgt werden' : 'Ser cuidado',
    sign: SIGNS[moon.signIndex].key,
    paragraphs: [
      CARE_IN_SIGN[moon.signIndex][lang],
      lang === 'en'
        ? `The Moon is the part of a chart that describes comfort — what has to happen before a person feels held. His sits ${inTheHouse(moon.house)}, so a good deal of that will play out around ${HOUSE_MEANING[moon.house - 1].en.toLowerCase()}.`
        : lang === 'de'
          ? `Der Mond ist der Teil einer Karte, der Geborgenheit beschreibt — was passieren muss, bevor sich jemand gehalten fühlt. Seiner steht ${inTheHouse(moon.house)}, daher wird sich ein guter Teil davon um ${HOUSE_MEANING[moon.house - 1].de.toLowerCase()} drehen.`
          : `A Lua é a parte do mapa que fala de conforto — o que precisa acontecer para alguém se sentir acolhido. A dele está ${inTheHouse(moon.house)}, então boa parte disso vai se dar em torno de ${HOUSE_MEANING[moon.house - 1].pt.toLowerCase()}.`,
    ],
  });

  // --- authority ---------------------------------------------------------
  sections.push({
    kicker:
      lang === 'en'
        ? `Sun in ${SIGNS[sun.signIndex].name.en}, ${houseLabel(sun.house)}`
        : lang === 'de'
          ? `Sonne in ${SIGNS[sun.signIndex].name.de}, ${houseLabel(sun.house)}`
          : `Sol em ${SIGNS[sun.signIndex].name.pt}, ${houseLabel(sun.house)}`,
    heading:
      lang === 'en'
        ? 'What authority will mean'
        : lang === 'de'
          ? 'Was Autorität bedeuten wird'
          : 'O que a autoridade vai significar',
    sign: SIGNS[sun.signIndex].key,
    paragraphs: [
      AUTHORITY_IN_SIGN[sun.signIndex][lang],
      lang === 'en'
        ? `The Sun stands for the principle of authority in a chart — the grown-up version of a person, and what he will measure grown-ups against. His is ${inTheHouse(sun.house)}: ${HOUSE_MEANING[sun.house - 1].en.toLowerCase()}.`
        : lang === 'de'
          ? `Die Sonne steht für das Prinzip der Autorität in einer Karte — die erwachsene Version einer Person, und woran er Erwachsene messen wird. Seine steht ${inTheHouse(sun.house)}: ${HOUSE_MEANING[sun.house - 1].de.toLowerCase()}.`
          : `O Sol representa o princípio da autoridade no mapa — a versão adulta de uma pessoa, e a régua com que ele vai medir os adultos. O dele está ${inTheHouse(sun.house)}: ${HOUSE_MEANING[sun.house - 1].pt.toLowerCase()}.`,
    ],
  });

  // --- home & roots ------------------------------------------------------
  sections.push({
    kicker:
      lang === 'en'
        ? `Fourth house in ${icSign.name.en}`
        : lang === 'de'
          ? `Viertes Haus in ${icSign.name.de}`
          : `Casa quatro em ${icSign.name.pt}`,
    heading: lang === 'en' ? 'Home and roots' : lang === 'de' ? 'Zuhause und Wurzeln' : 'Casa e raízes',
    sign: icSign.key,
    paragraphs: [
      lang === 'en'
        ? `The bottom of the chart — the point directly beneath him at birth — is where home lives. In ${icSign.name.en} it suggests ${HOME_IN_SIGN[Math.floor(((chart.mc + 180) % 360) / 30)].en}.`
        : lang === 'de'
          ? `Der tiefste Punkt der Karte — direkt unter ihm bei der Geburt — ist, wo das Zuhause wohnt. In ${icSign.name.de} deutet das auf ${HOME_IN_SIGN[Math.floor(((chart.mc + 180) % 360) / 30)].de} hin.`
          : `O fundo do mapa — o ponto exatamente abaixo dele no nascimento — é onde mora a casa. Em ${icSign.name.pt}, sugere ${HOME_IN_SIGN[Math.floor(((chart.mc + 180) % 360) / 30)].pt}.`,
      lang === 'en'
        ? `${icSign.name.en} is looked after by ${label(icRulerKey, 'en')}, and that planet sits in ${SIGNS[icRuler.signIndex].name.en}, ${inTheHouse(icRuler.house)}. That is where the feeling of home gets its character from.`
        : lang === 'de'
          ? `${icSign.name.de} wird von ${label(icRulerKey, 'de')} regiert, und dieser Planet steht in ${SIGNS[icRuler.signIndex].name.de}, ${inTheHouse(icRuler.house)}. Von dort bekommt das Gefühl von Zuhause seinen Charakter.`
          : `${icSign.name.pt} é regido por ${label(icRulerKey, 'pt')}, e esse planeta está em ${SIGNS[icRuler.signIndex].name.pt}, ${inTheHouse(icRuler.house)}. É de lá que o sentimento de casa tira o caráter dele.`,
    ],
  });

  // --- what the family shows the world -----------------------------------
  sections.push({
    kicker:
      lang === 'en'
        ? `Tenth house in ${mcSign.name.en}`
        : lang === 'de'
          ? `Zehntes Haus in ${mcSign.name.de}`
          : `Casa dez em ${mcSign.name.pt}`,
    heading:
      lang === 'en'
        ? 'What the family shows the world'
        : lang === 'de'
          ? 'Was die Familie der Welt zeigt'
          : 'O que a família mostra ao mundo',
    sign: mcSign.key,
    paragraphs: [
      lang === 'en'
        ? `Opposite home is the top of the chart: the public face of a family, and the parent he is most likely to associate with the world outside. In ${mcSign.name.en} — ${mcSign.keywords.en}.`
        : lang === 'de'
          ? `Dem Zuhause gegenüber liegt die Spitze der Karte: das öffentliche Gesicht einer Familie, und der Elternteil, den er am ehesten mit der Welt draußen verbindet. In ${mcSign.name.de} — ${mcSign.keywords.de}.`
          : `Oposto à casa está o topo do mapa: a face pública de uma família, e a figura que ele mais deve associar ao mundo lá fora. Em ${mcSign.name.pt} — ${mcSign.keywords.pt}.`,
      lang === 'en'
        ? `Its ruler is ${label(mcRulerKey, 'en')}, in ${SIGNS[mcRuler.signIndex].name.en}, ${inTheHouse(mcRuler.house)}.`
        : lang === 'de'
          ? `Sein Herrscher ist ${label(mcRulerKey, 'de')}, in ${SIGNS[mcRuler.signIndex].name.de}, ${inTheHouse(mcRuler.house)}.`
          : `Seu regente é ${label(mcRulerKey, 'pt')}, em ${SIGNS[mcRuler.signIndex].name.pt}, ${inTheHouse(mcRuler.house)}.`,
    ],
  });

  // --- rules -------------------------------------------------------------
  sections.push({
    kicker:
      lang === 'en'
        ? `Saturn in ${SIGNS[saturn.signIndex].name.en}, ${houseLabel(saturn.house)}`
        : lang === 'de'
          ? `Saturn in ${SIGNS[saturn.signIndex].name.de}, ${houseLabel(saturn.house)}`
          : `Saturno em ${SIGNS[saturn.signIndex].name.pt}, ${houseLabel(saturn.house)}`,
    heading: lang === 'en' ? 'The shape of rules' : lang === 'de' ? 'Die Form der Regeln' : 'O formato das regras',
    sign: SIGNS[saturn.signIndex].key,
    paragraphs: [
      lang === 'en'
        ? `Saturn is the part of a chart that deals with limits — where a person learns that the world has edges, and who taught them. His is in ${SIGNS[saturn.signIndex].name.en}${saturn.stationary ? ', and it was almost perfectly still that day, which gives it real weight' : ''}.`
        : lang === 'de'
          ? `Saturn ist der Teil einer Karte, der sich mit Grenzen befasst — wo jemand lernt, dass die Welt Ränder hat, und wer sie beigebracht hat. Seiner steht in ${SIGNS[saturn.signIndex].name.de}${saturn.stationary ? ', und er stand an diesem Tag fast vollkommen still, was ihm echtes Gewicht gibt' : ''}.`
          : `Saturno é a parte do mapa que trata de limites — onde alguém aprende que o mundo tem bordas, e quem ensinou isso. O dele está em ${SIGNS[saturn.signIndex].name.pt}${saturn.stationary ? ', e estava quase parado naquele dia, o que lhe dá um peso real' : ''}.`,
      lang === 'en'
        ? 'Limits taught patiently here will feel like safety. Taught sharply, they will feel like a verdict — the same lesson, landing very differently.'
        : lang === 'de'
          ? 'Grenzen, die hier geduldig vermittelt werden, fühlen sich wie Sicherheit an. Scharf vermittelt, fühlen sie sich wie ein Urteil an — dieselbe Lektion, die sehr unterschiedlich ankommt.'
          : 'Limites ensinados com paciência aqui vão parecer segurança. Ensinados com dureza, vão parecer veredito — a mesma lição, chegando de um jeito muito diferente.',
    ],
  });

  // --- the aspects the Moon and Sun actually make ------------------------
  const parental = chart.aspects
    .filter((a) => a.a === 'moon' || a.b === 'moon' || a.a === 'sun' || a.b === 'sun')
    .slice(0, 3);

  const meaningOfPoint = (key: BodyKey | 'asc' | 'mc', l: Lang): string =>
    key === 'asc'
      ? l === 'en'
        ? 'the way he meets the world'
        : l === 'de'
          ? 'die Art, wie er der Welt begegnet'
          : 'o jeito como ele encontra o mundo'
      : key === 'mc'
        ? l === 'en'
          ? 'what the world will see'
          : l === 'de'
            ? 'was die Welt sehen wird'
            : 'o que o mundo vai ver'
        : BODY_MEANING[key][l];

  if (parental.length) {
    sections.push({
      heading:
        lang === 'en'
          ? 'What else the Sun and Moon touch'
          : lang === 'de'
            ? 'Was Sonne und Mond noch berühren'
            : 'O que mais o Sol e a Lua tocam',
      paragraphs: [
        lang === 'en'
          ? 'Care and authority rarely arrive on their own — they usually come mixed in with something else. Here is what else was close by:'
          : lang === 'de'
            ? 'Fürsorge und Autorität kommen selten allein — meist vermischt mit etwas anderem. Hier ist, was sonst noch in der Nähe war:'
            : 'Cuidado e autoridade raramente chegam sozinhos — costumam vir misturados com outra coisa. Eis o que mais estava por perto:',
        ...parental.map((a) => {
          const other = a.a === 'sun' || a.a === 'moon' ? a.b : a.a;
          const anchor = a.a === 'sun' || a.a === 'moon' ? a.a : a.b;
          const def = ASPECTS.find((x) => x.key === a.key)!;
          const anchorName =
            anchor === 'sun'
              ? lang === 'en'
                ? 'the Sun'
                : lang === 'de'
                  ? 'die Sonne'
                  : 'o Sol'
              : lang === 'en'
                ? 'the Moon'
                : lang === 'de'
                  ? 'der Mond'
                  : 'a Lua';
          const otherName =
            other === 'asc'
              ? lang === 'en'
                ? 'the Ascendant'
                : lang === 'de'
                  ? 'der Aszendent'
                  : 'o Ascendente'
              : other === 'mc'
                ? lang === 'en'
                  ? 'the Midheaven'
                  : lang === 'de'
                    ? 'das Medium Coeli'
                    : 'o Meio do Céu'
                : label(other as BodyKey, lang);
          const anchorRole =
            anchor === 'sun'
              ? lang === 'en'
                ? 'what authority and warmth feel like'
                : lang === 'de'
                  ? 'wie Autorität und Wärme sich anfühlen'
                  : 'o que autoridade e calor vão parecer'
              : lang === 'en'
                ? 'what comfort and safety feel like'
                : lang === 'de'
                  ? 'wie Trost und Sicherheit sich anfühlen'
                  : 'o que conforto e segurança vão parecer';
          if (lang === 'de') {
            return `${capitalize(anchorName)} und ${otherName} — ${def.name.de}, ${a.orb.toFixed(1)}° von genau ${def.angle}° entfernt, so nah, wie sich zwei Planeten normalerweise kommen: ${ASPECT_MEANING[a.key].de}. Da ${otherName} ${meaningOfPoint(other, 'de')} in sich trägt, erwarte etwas davon in ${anchorRole} eingewoben.`;
          }
          return lang === 'en'
            ? `${capitalize(anchorName)} and ${otherName} sit in ${def.name.en.toLowerCase()} — ${a.orb.toFixed(1)}° from an exact ${def.angle}°, about as close as two planets get: ${ASPECT_MEANING[a.key].en}. Since ${otherName} carries ${meaningOfPoint(other, 'en')}, expect a little of that woven into ${anchorRole}.`
            : `${capitalize(anchorName)} e ${otherName} estão em ${def.name.pt.toLowerCase()} — a ${a.orb.toFixed(1)}° de um ${def.angle}° exato, o mais perto que dois planetas costumam chegar: ${ASPECT_MEANING[a.key].pt}. Como ${otherName} carrega ${meaningOfPoint(other, 'pt')}, espere um pouco disso entrelaçado em ${anchorRole}.`;
        }),
      ],
    });
  }

  return sections;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function ordinal(n: number): string {
  const suffix =
    n % 100 >= 11 && n % 100 <= 13
      ? 'th'
      : n % 10 === 1
        ? 'st'
        : n % 10 === 2
          ? 'nd'
          : n % 10 === 3
            ? 'rd'
            : 'th';
  return `${n}${suffix}`;
}
