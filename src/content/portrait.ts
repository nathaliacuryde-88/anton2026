/**
 * Builds the "Portrait" letter out of the chart itself.
 *
 * Nothing here is hard-coded to one set of positions: the opening and closing
 * are written for Anton by name, but every observation in between is derived
 * from the computed chart, so the letter stays honest.
 */

import {
  ASPECTS,
  BODIES,
  BodyKey,
  Element,
  ELEMENT_NAMES,
  Lang,
  MODALITY_NAMES,
  Modality,
  SIGNS,
} from '../astro/constants';
import { Chart } from '../astro/engine';
import {
  ASPECT_MEANING,
  BODY_MEANING,
  ELEMENT_MEANING,
  HOUSE_MEANING,
  MODALITY_MEANING,
  MOON_IN_SIGN,
  RISING_IN_SIGN,
  SUN_IN_SIGN,
} from './interpretations';

export type PortraitSection = {
  /** Small heading above the paragraph. */
  heading: string;
  /** One or more paragraphs. */
  paragraphs: string[];
  /** Optional emphasised line, shown in italic gold. */
  note?: string;
};

const label = (key: BodyKey | 'asc' | 'mc', lang: Lang): string => {
  if (key === 'asc') return lang === 'en' ? 'the Ascendant' : 'o Ascendente';
  if (key === 'mc') return lang === 'en' ? 'the Midheaven' : 'o Meio do Céu';
  return BODIES[key].name[lang];
};

const meaningOf = (key: BodyKey | 'asc' | 'mc', lang: Lang): string => {
  if (key === 'asc') return lang === 'en' ? 'the way of meeting the world' : 'o jeito de encontrar o mundo';
  if (key === 'mc') return lang === 'en' ? 'what the world sees' : 'o que o mundo vê';
  return BODY_MEANING[key][lang];
};

export function buildPortrait(chart: Chart, lang: Lang): PortraitSection[] {
  const sections: PortraitSection[] = [];

  const sun = chart.placements.sun;
  const moon = chart.placements.moon;
  const ascSign = SIGNS[Math.floor(chart.asc / 30)];
  const mcSign = SIGNS[Math.floor(chart.mc / 30)];
  const firstName = chart.birth.name.split(' ')[0];

  // --- opening ------------------------------------------------------------
  sections.push({
    heading: lang === 'en' ? 'Dear Anton' : 'Querido Anton',
    paragraphs: [
      lang === 'en'
        ? `On a July afternoon in ${chart.birth.place.en}, at a quarter to one, the sky held still for a moment and you arrived under it. This is a picture of that exact minute — not a prediction, and not a promise. Just a record that the whole solar system happened to be arranged in one particular way on the day the world got you.`
        : `Numa tarde de julho em ${chart.birth.place.pt}, quinze para a uma, o céu ficou parado por um instante e você chegou embaixo dele. Isto é um retrato desse minuto exato — não é previsão, nem promessa. É só um registro de que o sistema solar inteiro estava arrumado de um jeito muito particular no dia em que o mundo ganhou você.`,
    ],
  });

  // --- the big three ------------------------------------------------------
  sections.push({
    heading:
      lang === 'en'
        ? `Your Sun in ${SIGNS[sun.signIndex].name.en}`
        : `Seu Sol em ${SIGNS[sun.signIndex].name.pt}`,
    paragraphs: [SUN_IN_SIGN[sun.signIndex][lang]],
    note:
      lang === 'en'
        ? `In the ${ordinal(sun.house, 'en')} house — ${HOUSE_MEANING[sun.house - 1].en.toLowerCase()}.`
        : `Na casa ${sun.house} — ${HOUSE_MEANING[sun.house - 1].pt.toLowerCase()}.`,
  });

  sections.push({
    heading:
      lang === 'en'
        ? `Your Moon in ${SIGNS[moon.signIndex].name.en}`
        : `Sua Lua em ${SIGNS[moon.signIndex].name.pt}`,
    paragraphs: [MOON_IN_SIGN[moon.signIndex][lang]],
    note:
      lang === 'en'
        ? `In the ${ordinal(moon.house, 'en')} house — ${HOUSE_MEANING[moon.house - 1].en.toLowerCase()}.`
        : `Na casa ${moon.house} — ${HOUSE_MEANING[moon.house - 1].pt.toLowerCase()}.`,
  });

  const ascIndex = Math.floor(chart.asc / 30);
  sections.push({
    heading:
      lang === 'en'
        ? `${ascSign.name.en} rising`
        : `Ascendente em ${ascSign.name.pt}`,
    paragraphs: [RISING_IN_SIGN[ascIndex][lang]],
    note:
      lang === 'en'
        ? `The eastern horizon at the minute you were born, and ${ascSign.ruler.en} is the planet that looks after it.`
        : `O horizonte leste no minuto em que você nasceu, e ${ascSign.ruler.pt} é o planeta que cuida dele.`,
  });

  // --- what stands out ----------------------------------------------------
  const notes: string[] = [];

  // Dominant element and modality.
  const domElement = topKey(chart.elementCounts) as Element;
  const domModality = topKey(chart.modalityCounts) as Modality;
  notes.push(
    lang === 'en'
      ? `There is a lot of ${ELEMENT_NAMES[domElement].en.toLowerCase()} in you — ${ELEMENT_MEANING[domElement].en}. Mostly ${MODALITY_NAMES[domModality].en.toLowerCase()} too, which ${MODALITY_MEANING[domModality].en}.`
      : `Há muito ${ELEMENT_NAMES[domElement].pt.toLowerCase()} em você — ${ELEMENT_MEANING[domElement].pt}. E bastante ${MODALITY_NAMES[domModality].pt.toLowerCase()}, o que ${MODALITY_MEANING[domModality].pt}.`,
  );

  // Sect.
  notes.push(
    chart.dayChart
      ? lang === 'en'
        ? 'You were born in daylight, with the Sun above the horizon — a day chart, warmed from the front.'
        : 'Você nasceu à luz do dia, com o Sol acima do horizonte — um mapa diurno, aquecido de frente.'
      : lang === 'en'
        ? 'You were born after dark, with the Sun below the horizon — a night chart, lit from within.'
        : 'Você nasceu depois do escuro, com o Sol abaixo do horizonte — um mapa noturno, iluminado por dentro.',
  );

  // The two closest aspects, described from their own parts.
  for (const aspect of chart.aspects.slice(0, 2)) {
    const def = ASPECTS.find((a) => a.key === aspect.key)!;
    notes.push(
      lang === 'en'
        ? `${capitalise(label(aspect.a, 'en'))} and ${label(aspect.b, 'en')} sit at almost exactly ${def.angle}° — ${def.name.en.toLowerCase()}, ${ASPECT_MEANING[aspect.key].en}. That is ${meaningOf(aspect.a, 'en')} meeting ${meaningOf(aspect.b, 'en')}.`
        : `${capitalise(label(aspect.a, 'pt'))} e ${label(aspect.b, 'pt')} estão a quase exatamente ${def.angle}° — ${def.name.pt.toLowerCase()}, ${ASPECT_MEANING[aspect.key].pt}. É ${meaningOf(aspect.a, 'pt')} encontrando ${meaningOf(aspect.b, 'pt')}.`,
    );
  }

  // Anything sitting on a station is worth a line of its own.
  const stationary = chart.ordered.filter((p) => p.stationary);
  for (const p of stationary) {
    notes.push(
      lang === 'en'
        ? `${BODIES[p.key].name.en} was standing almost perfectly still that day, turning around in ${SIGNS[p.signIndex].name.en}. Planets at a standstill press harder: ${BODY_MEANING[p.key].en} will be a slow, deliberate, lifelong piece of work for you.`
        : `${BODIES[p.key].name.pt} estava quase parado naquele dia, mudando de direção em ${SIGNS[p.signIndex].name.pt}. Planetas estacionários pesam mais: ${BODY_MEANING[p.key].pt} vai ser um trabalho lento, consciente e de uma vida inteira.`,
    );
  }

  // Retrogrades.
  const retro = chart.ordered.filter(
    (p) => p.retrograde && p.key !== 'northNode' && p.key !== 'southNode' && !p.stationary,
  );
  if (retro.length) {
    const names = retro.map((p) => BODIES[p.key].name[lang]);
    notes.push(
      lang === 'en'
        ? `${listOf(names, 'en')} ${retro.length === 1 ? 'was' : 'were'} retrograde — moving backwards from where you stood. Those parts of you work inwards first, and show themselves later.`
        : `${listOf(names, 'pt')} ${retro.length === 1 ? 'estava' : 'estavam'} retrógrado${retro.length === 1 ? '' : 's'} — andando para trás visto daqui. Essas partes de você trabalham por dentro primeiro, e aparecem depois.`,
    );
  }

  sections.push({
    heading: lang === 'en' ? 'What stands out' : 'O que salta aos olhos',
    paragraphs: notes,
  });

  // --- vocation -----------------------------------------------------------
  sections.push({
    heading: lang === 'en' ? 'The top of your sky' : 'O topo do seu céu',
    paragraphs: [
      lang === 'en'
        ? `Directly overhead at your birth was ${mcSign.name.en} — the highest point of the chart, and the one that hints at what you might become known for. ${capitalise(mcSign.keywords.en)}. Whatever you end up doing, people are likely to meet that in you first.`
        : `Bem acima da sua cabeça, no nascimento, estava ${mcSign.name.pt} — o ponto mais alto do mapa, aquele que sugere aquilo pelo que você pode ser conhecido. ${capitalise(mcSign.keywords.pt)}. Faça o que fizer, é provável que as pessoas encontrem isso em você primeiro.`,
    ],
  });

  // --- closing ------------------------------------------------------------
  sections.push({
    heading: lang === 'en' ? 'And then' : 'E então',
    paragraphs: [
      lang === 'en'
        ? `None of this is an instruction manual, ${firstName}. The sky does not tell you who to be — it only says that on the 26th of July, 2026, at 12:45 in the afternoon, there was a particular arrangement of light above a particular town, and you were underneath it, brand new and entirely yourself.`
        : `Nada disso é um manual de instruções, ${firstName}. O céu não diz quem você deve ser — ele só conta que, no dia 26 de julho de 2026, às 12h45 da tarde, havia um arranjo muito particular de luz acima de uma cidade muito particular, e você estava embaixo dele, novinho e inteiramente você.`,
      lang === 'en'
        ? 'Welcome. You were very, very wanted.'
        : 'Seja bem-vindo. Você foi muito, muito esperado.',
    ],
  });

  return sections;
}

// --- small helpers ---------------------------------------------------------

function topKey(counts: Record<string, number>): string {
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

function capitalise(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function ordinal(n: number, lang: Lang): string {
  if (lang !== 'en') return String(n);
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

function listOf(items: string[], lang: Lang): string {
  if (items.length === 1) return items[0];
  const and = lang === 'en' ? 'and' : 'e';
  return `${items.slice(0, -1).join(', ')} ${and} ${items[items.length - 1]}`;
}
