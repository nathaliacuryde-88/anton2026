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
  BODIES,
  BodyKey,
  Lang,
  SIGNS,
  SIGN_RULER,
} from '../astro/constants';
import { Chart } from '../astro/engine';
import { HOUSE_MEANING } from './interpretations';

export type FamilySection = {
  heading: string;
  /** Small label above the heading, e.g. "Moon in Sagittarius". */
  kicker?: string;
  paragraphs: string[];
};

/** The Moon: what being cared for has to feel like before it lands. */
const CARE_IN_SIGN = [
  {
    en: 'He will want comfort to arrive quickly and without a fuss. Being met at full volume — picked up the moment he calls — is what tells him he is safe.',
    pt: 'Ele vai querer que o consolo chegue rápido e sem rodeios. Ser atendido no volume máximo — colo assim que chama — é o que diz a ele que está seguro.',
  },
  {
    en: 'Safety, for him, is physical and repeatable: the same arms, the same blanket, the same song. Consistency will do more than any clever words.',
    pt: 'Segurança, para ele, é física e repetível: os mesmos braços, o mesmo cobertor, a mesma música. Constância vai fazer mais do que qualquer palavra bonita.',
  },
  {
    en: 'He is soothed by being talked to. Long before he understands a word, the sound of someone explaining the world to him will settle his whole body.',
    pt: 'Ele se acalma sendo conversado. Muito antes de entender uma palavra, o som de alguém explicando o mundo para ele vai acalmar o corpo inteiro.',
  },
  {
    en: 'He wants to be held close and kept near. Presence matters more than activity: someone simply being in the room is the thing that works.',
    pt: 'Ele quer colo e quer estar perto. Presença importa mais do que atividade: alguém simplesmente estar no cômodo já é o que funciona.',
  },
  {
    en: 'He needs delight, not just care. Being watched with pleasure — someone visibly glad he exists — is the version of love that reaches him.',
    pt: 'Ele precisa de encantamento, não só de cuidado. Ser olhado com prazer — alguém visivelmente feliz por ele existir — é a versão de amor que chega nele.',
  },
  {
    en: 'He is calmed by order and by being usefully attended to. Small practical acts of care will land harder than grand declarations.',
    pt: 'Ele se acalma com ordem e com um cuidado prático. Pequenos gestos úteis vão chegar mais fundo do que grandes declarações.',
  },
  {
    en: 'He takes the temperature of the room. Calm between the adults around him is, for him, the same thing as being held.',
    pt: 'Ele mede a temperatura do ambiente. Calma entre os adultos ao redor é, para ele, a mesma coisa que colo.',
  },
  {
    en: 'He will feel things deeply and show only part of it. Being allowed his privacy, without being pulled open, is how trust gets built with him.',
    pt: 'Ele vai sentir fundo e mostrar só uma parte. Ter sua privacidade respeitada, sem ser aberto à força, é como a confiança se constrói com ele.',
  },
  {
    en: 'He needs room even while being held. Comfort that comes with space in it — a change of scene, an open door — works better than being wrapped up tight.',
    pt: 'Ele precisa de espaço mesmo no colo. Um consolo com folga dentro — mudar de cenário, uma porta aberta — funciona melhor do que ser embrulhado apertado.',
  },
  {
    en: 'He is steadied by being taken seriously. Being spoken to as though he is capable will comfort him more than being fussed over.',
    pt: 'Ele se firma sendo levado a sério. Falar com ele como se fosse capaz vai confortá-lo mais do que ser paparicado.',
  },
  {
    en: 'He needs a little distance to feel close, and he will regulate himself if given the chance. Space offered freely is what he reads as love.',
    pt: 'Ele precisa de um pouco de distância para se sentir perto, e vai se regular sozinho se puder. Espaço oferecido de bom grado é o que ele lê como amor.',
  },
  {
    en: 'He absorbs whatever is in the air around him. Quiet, water, dim light and unhurried people are what put him back together.',
    pt: 'Ele absorve o que está no ar ao redor. Silêncio, água, luz baixa e gente sem pressa são o que o recompõem.',
  },
];

/** The Sun: what authority and fathering will mean to him. */
const AUTHORITY_IN_SIGN = [
  {
    en: 'He will respect courage and directness, and he will test a rule to see whether it holds. Say the thing plainly and mean it.',
    pt: 'Ele vai respeitar coragem e franqueza, e vai testar uma regra para ver se ela se sustenta. Diga a coisa com clareza e sustente.',
  },
  {
    en: 'He will trust steadiness. Promises kept slowly and exactly will build more authority with him than any amount of firmness.',
    pt: 'Ele vai confiar em firmeza tranquila. Promessas cumpridas devagar e exatamente vão construir mais autoridade do que qualquer rigidez.',
  },
  {
    en: 'He will trust whoever explains. Reasons work on him; bare instructions bounce off.',
    pt: 'Ele vai confiar em quem explica. Motivos funcionam com ele; ordens secas escorregam.',
  },
  {
    en: 'He will read authority through feeling. A tone of voice will teach him more than the content of what is said.',
    pt: 'Ele vai ler autoridade pelo sentimento. Um tom de voz vai ensinar mais a ele do que o conteúdo do que foi dito.',
  },
  {
    en: 'He will want to be proud of the grown-ups he belongs to, and to be visibly enjoyed by them. Warmth carries more weight with him than rules.',
    pt: 'Ele vai querer se orgulhar dos adultos aos quais pertence, e ser visivelmente apreciado por eles. Calor pesa mais com ele do que regra.',
  },
  {
    en: 'He will notice whether the grown-ups do what they say. Small inconsistencies will register; competence will earn him.',
    pt: 'Ele vai reparar se os adultos fazem o que dizem. Pequenas incoerências ficam registradas; competência conquista ele.',
  },
  {
    en: 'He will care whether things are fair, and will accept almost anything that is explained as fair. Arbitrary rules will not survive him.',
    pt: 'Ele vai se importar se as coisas são justas, e vai aceitar quase tudo que for explicado como justo. Regra arbitrária não sobrevive com ele.',
  },
  {
    en: 'He will watch closely and say little. Honesty matters more than gentleness here — he will always know when something is being managed.',
    pt: 'Ele vai observar de perto e falar pouco. Honestidade importa mais que delicadeza aqui — ele sempre percebe quando algo está sendo maquiado.',
  },
  {
    en: 'He will follow whoever seems to be enjoying life. Authority that comes with humour and a wide horizon will keep him.',
    pt: 'Ele vai seguir quem parece estar gostando da vida. Autoridade com humor e horizonte largo vai segurá-lo.',
  },
  {
    en: 'He will take structure seriously, perhaps more seriously than intended. Be careful to let him off the hook sometimes.',
    pt: 'Ele vai levar estrutura a sério, talvez mais a sério do que se pretendia. Tome cuidado para liberá-lo de vez em quando.',
  },
  {
    en: 'He will not accept authority simply because it is authority. Being treated as a person with a view will get further than rank.',
    pt: 'Ele não vai aceitar autoridade só por ser autoridade. Ser tratado como alguém com opinião vai longe mais do que hierarquia.',
  },
  {
    en: 'He will absorb the mood of whoever is in charge. Steadiness in the adults becomes steadiness in him, almost directly.',
    pt: 'Ele vai absorver o humor de quem está no comando. Firmeza nos adultos vira firmeza nele, quase diretamente.',
  },
];

/** The 4th house cusp: the feeling of home itself. */
const HOME_IN_SIGN = [
  { en: 'a house with energy in it — doors, noise, things being started', pt: 'uma casa com energia dentro — portas, barulho, coisas começando' },
  { en: 'a house built to be comfortable and kept that way', pt: 'uma casa feita para ser confortável e mantida assim' },
  { en: 'a house full of talk, questions and half-finished sentences', pt: 'uma casa cheia de conversa, perguntas e frases pela metade' },
  { en: 'a house that is unmistakably a home — soft, held, remembered', pt: 'uma casa que é inconfundivelmente um lar — macia, acolhida, lembrada' },
  { en: 'a house with warmth at the centre of it, and a bit of theatre', pt: 'uma casa com calor no centro, e um tanto de teatro' },
  { en: 'a house that runs well, where care shows up as small useful acts', pt: 'uma casa que funciona bem, onde o cuidado aparece em atos pequenos e úteis' },
  { en: 'a house that wants to be beautiful and peaceful, and works at both', pt: 'uma casa que quer ser bonita e em paz, e se esforça pelas duas coisas' },
  { en: 'a house with real privacy in it, where the deep things are known', pt: 'uma casa com privacidade de verdade, onde as coisas profundas são sabidas' },
  { en: 'a house with the door open and somewhere else always in mind', pt: 'uma casa de porta aberta e sempre com outro lugar em mente' },
  { en: 'a house built patiently, to last, by people who take it seriously', pt: 'uma casa construída com paciência, para durar, por gente que leva isso a sério' },
  { en: 'a house run its own way, unlike the neighbours, and glad of it', pt: 'uma casa tocada do jeito dela, diferente dos vizinhos, e feliz com isso' },
  { en: 'a house that is gentle and a little dreamy, where feelings move freely', pt: 'uma casa gentil e um pouco sonhadora, onde os sentimentos circulam' },
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

  const inHouse = (n: number) =>
    lang === 'en' ? `the ${ordinal(n)} house` : `a casa ${n}`;

  // --- being cared for ---------------------------------------------------
  sections.push({
    kicker:
      lang === 'en'
        ? `Moon in ${SIGNS[moon.signIndex].name.en}, ${inHouse(moon.house)}`
        : `Lua em ${SIGNS[moon.signIndex].name.pt}, ${inHouse(moon.house)}`,
    heading: lang === 'en' ? 'Being looked after' : 'Ser cuidado',
    paragraphs: [
      CARE_IN_SIGN[moon.signIndex][lang],
      lang === 'en'
        ? `The Moon is the part of a chart that describes comfort — what has to happen before a person feels held. His sits in ${inHouse(moon.house)}, so a good deal of that will play out around ${HOUSE_MEANING[moon.house - 1].en.toLowerCase()}.`
        : `A Lua é a parte do mapa que fala de conforto — o que precisa acontecer para alguém se sentir acolhido. A dele está n${inHouse(moon.house)}, então boa parte disso vai se dar em torno de ${HOUSE_MEANING[moon.house - 1].pt.toLowerCase()}.`,
    ],
  });

  // --- authority ---------------------------------------------------------
  sections.push({
    kicker:
      lang === 'en'
        ? `Sun in ${SIGNS[sun.signIndex].name.en}, ${inHouse(sun.house)}`
        : `Sol em ${SIGNS[sun.signIndex].name.pt}, ${inHouse(sun.house)}`,
    heading: lang === 'en' ? 'What authority will mean' : 'O que a autoridade vai significar',
    paragraphs: [
      AUTHORITY_IN_SIGN[sun.signIndex][lang],
      lang === 'en'
        ? `The Sun stands for the principle of authority in a chart — the grown-up version of a person, and what he will measure grown-ups against. His is in ${inHouse(sun.house)}: ${HOUSE_MEANING[sun.house - 1].en.toLowerCase()}.`
        : `O Sol representa o princípio da autoridade no mapa — a versão adulta de uma pessoa, e a régua com que ele vai medir os adultos. O dele está n${inHouse(sun.house)}: ${HOUSE_MEANING[sun.house - 1].pt.toLowerCase()}.`,
    ],
  });

  // --- home & roots ------------------------------------------------------
  sections.push({
    kicker:
      lang === 'en'
        ? `Fourth house in ${icSign.name.en}`
        : `Casa quatro em ${icSign.name.pt}`,
    heading: lang === 'en' ? 'Home and roots' : 'Casa e raízes',
    paragraphs: [
      lang === 'en'
        ? `The bottom of the chart — the point directly beneath him at birth — is where home lives. In ${icSign.name.en} it suggests ${HOME_IN_SIGN[Math.floor(((chart.mc + 180) % 360) / 30)].en}.`
        : `O fundo do mapa — o ponto exatamente abaixo dele no nascimento — é onde mora a casa. Em ${icSign.name.pt}, sugere ${HOME_IN_SIGN[Math.floor(((chart.mc + 180) % 360) / 30)].pt}.`,
      lang === 'en'
        ? `${icSign.name.en} is looked after by ${label(icRulerKey, 'en')}, and that planet sits in ${SIGNS[icRuler.signIndex].name.en}, in ${inHouse(icRuler.house)}. That is where the feeling of home gets its character from.`
        : `${icSign.name.pt} é regido por ${label(icRulerKey, 'pt')}, e esse planeta está em ${SIGNS[icRuler.signIndex].name.pt}, n${inHouse(icRuler.house)}. É de lá que o sentimento de casa tira o caráter dele.`,
    ],
  });

  // --- what the family shows the world -----------------------------------
  sections.push({
    kicker:
      lang === 'en'
        ? `Tenth house in ${mcSign.name.en}`
        : `Casa dez em ${mcSign.name.pt}`,
    heading:
      lang === 'en' ? 'What the family shows the world' : 'O que a família mostra ao mundo',
    paragraphs: [
      lang === 'en'
        ? `Opposite home is the top of the chart: the public face of a family, and the parent he is most likely to associate with the world outside. In ${mcSign.name.en} — ${mcSign.keywords.en}.`
        : `Oposto à casa está o topo do mapa: a face pública de uma família, e a figura que ele mais deve associar ao mundo lá fora. Em ${mcSign.name.pt} — ${mcSign.keywords.pt}.`,
      lang === 'en'
        ? `Its ruler is ${label(mcRulerKey, 'en')}, in ${SIGNS[mcRuler.signIndex].name.en}, in ${inHouse(mcRuler.house)}.`
        : `Seu regente é ${label(mcRulerKey, 'pt')}, em ${SIGNS[mcRuler.signIndex].name.pt}, n${inHouse(mcRuler.house)}.`,
    ],
  });

  // --- rules -------------------------------------------------------------
  sections.push({
    kicker:
      lang === 'en'
        ? `Saturn in ${SIGNS[saturn.signIndex].name.en}, ${inHouse(saturn.house)}`
        : `Saturno em ${SIGNS[saturn.signIndex].name.pt}, ${inHouse(saturn.house)}`,
    heading: lang === 'en' ? 'The shape of rules' : 'O formato das regras',
    paragraphs: [
      lang === 'en'
        ? `Saturn is the part of a chart that deals with limits — where a person learns that the world has edges, and who taught them. His is in ${SIGNS[saturn.signIndex].name.en}${saturn.stationary ? ', and it was almost perfectly still that day, which gives it real weight' : ''}.`
        : `Saturno é a parte do mapa que trata de limites — onde alguém aprende que o mundo tem bordas, e quem ensinou isso. O dele está em ${SIGNS[saturn.signIndex].name.pt}${saturn.stationary ? ', e estava quase parado naquele dia, o que lhe dá um peso real' : ''}.`,
      lang === 'en'
        ? 'Limits taught patiently here will feel like safety. Taught sharply, they will feel like a verdict — the same lesson, landing very differently.'
        : 'Limites ensinados com paciência aqui vão parecer segurança. Ensinados com dureza, vão parecer veredito — a mesma lição, chegando de um jeito muito diferente.',
    ],
  });

  // --- the aspects the Moon and Sun actually make ------------------------
  const parental = chart.aspects
    .filter((a) => a.a === 'moon' || a.b === 'moon' || a.a === 'sun' || a.b === 'sun')
    .slice(0, 3);

  if (parental.length) {
    sections.push({
      heading:
        lang === 'en'
          ? 'What the Sun and Moon were talking to'
          : 'Com quem o Sol e a Lua conversavam',
      paragraphs: parental.map((a) => {
        const other = a.a === 'sun' || a.a === 'moon' ? a.b : a.a;
        const anchor = a.a === 'sun' || a.a === 'moon' ? a.a : a.b;
        const anchorName =
          anchor === 'sun'
            ? lang === 'en'
              ? 'The Sun'
              : 'O Sol'
            : lang === 'en'
              ? 'The Moon'
              : 'A Lua';
        const otherName =
          other === 'asc'
            ? lang === 'en'
              ? 'the Ascendant'
              : 'o Ascendente'
            : other === 'mc'
              ? lang === 'en'
                ? 'the Midheaven'
                : 'o Meio do Céu'
              : label(other as BodyKey, lang);
        return lang === 'en'
          ? `${anchorName} and ${otherName}, ${a.orb.toFixed(1)}° from exact. Whatever ${otherName} carries will colour how he reads the grown-ups around him.`
          : `${anchorName} e ${otherName}, a ${a.orb.toFixed(1)}° do exato. Aquilo que ${otherName} carrega vai colorir o jeito como ele lê os adultos ao redor.`;
      }),
    });
  }

  return sections;
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
