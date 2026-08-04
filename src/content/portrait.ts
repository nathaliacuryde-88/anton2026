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
  /** Set on the Sun/Moon/Rising sections, for a small constellation ornament. */
  sign?: string;
  /** Set on the sections that aren't about one sign, for a simple theme icon. */
  icon?: 'sparkle' | 'summit' | 'heart';
};

const label = (key: BodyKey | 'asc' | 'mc', lang: Lang): string => {
  if (key === 'asc') {
    return lang === 'en' ? 'the Ascendant' : lang === 'de' ? 'der Aszendent' : 'o Ascendente';
  }
  if (key === 'mc') {
    return lang === 'en' ? 'the Midheaven' : lang === 'de' ? 'das Medium Coeli' : 'o Meio do Céu';
  }
  return BODIES[key].name[lang];
};

const meaningOf = (key: BodyKey | 'asc' | 'mc', lang: Lang): string => {
  if (key === 'asc') {
    return lang === 'en'
      ? 'the way of meeting the world'
      : lang === 'de'
        ? 'die Art, der Welt zu begegnen'
        : 'o jeito de encontrar o mundo';
  }
  if (key === 'mc') {
    return lang === 'en' ? 'what the world sees' : lang === 'de' ? 'was die Welt sieht' : 'o que o mundo vê';
  }
  return BODY_MEANING[key][lang];
};

export function buildPortrait(chart: Chart, lang: Lang): PortraitSection[] {
  const sections: PortraitSection[] = [];

  const sun = chart.placements.sun;
  const moon = chart.placements.moon;
  const ascSign = SIGNS[Math.floor(chart.asc / 30)];
  const mcSign = SIGNS[Math.floor(chart.mc / 30)];
  const firstName = chart.birth.name.split(' ')[0];

  // In the note under Sun/Moon: "In the 3rd house" / "Na casa 3" / "Im 3. Haus".
  const inHouseNote = (n: number, meaning: string) =>
    lang === 'en'
      ? `In the ${ordinal(n, 'en')} house — ${meaning}.`
      : lang === 'de'
        ? `Im ${n}. Haus — ${meaning}.`
        : `Na casa ${n} — ${meaning}.`;

  // --- opening ------------------------------------------------------------
  sections.push({
    heading: lang === 'en' ? 'Dear Anton' : lang === 'de' ? 'Lieber Anton' : 'Querido Anton',
    paragraphs: [
      lang === 'en'
        ? `On a July afternoon in ${chart.birth.place.en}, at a quarter to one, the sky held still for a moment and you arrived under it. This is a picture of that exact minute — not a prediction, and not a promise. Just a record that the whole solar system happened to be arranged in one particular way on the day the world got you.`
        : lang === 'de'
          ? `An einem Julinachmittag in ${chart.birth.place.de}, um Viertel vor eins, hielt der Himmel für einen Moment inne, und du kamst darunter an. Das ist ein Bild dieser genauen Minute — keine Vorhersage, und kein Versprechen. Nur ein Beleg dafür, dass das ganze Sonnensystem an dem Tag, an dem die Welt dich bekam, zufällig auf eine ganz bestimmte Weise angeordnet war.`
          : `Numa tarde de julho em ${chart.birth.place.pt}, quinze para a uma, o céu ficou parado por um instante e você chegou embaixo dele. Isto é um retrato desse minuto exato — não é previsão, nem promessa. É só um registro de que o sistema solar inteiro estava arrumado de um jeito muito particular no dia em que o mundo ganhou você.`,
    ],
  });

  // --- the big three ------------------------------------------------------
  sections.push({
    heading:
      lang === 'en'
        ? `Your Sun in ${SIGNS[sun.signIndex].name.en}`
        : lang === 'de'
          ? `Deine Sonne in ${SIGNS[sun.signIndex].name.de}`
          : `Seu Sol em ${SIGNS[sun.signIndex].name.pt}`,
    paragraphs: [SUN_IN_SIGN[sun.signIndex][lang]],
    note: inHouseNote(sun.house, HOUSE_MEANING[sun.house - 1][lang].toLowerCase()),
    sign: SIGNS[sun.signIndex].key,
  });

  sections.push({
    heading:
      lang === 'en'
        ? `Your Moon in ${SIGNS[moon.signIndex].name.en}`
        : lang === 'de'
          ? `Dein Mond in ${SIGNS[moon.signIndex].name.de}`
          : `Sua Lua em ${SIGNS[moon.signIndex].name.pt}`,
    paragraphs: [MOON_IN_SIGN[moon.signIndex][lang]],
    note: inHouseNote(moon.house, HOUSE_MEANING[moon.house - 1][lang].toLowerCase()),
    sign: SIGNS[moon.signIndex].key,
  });

  const ascIndex = Math.floor(chart.asc / 30);
  sections.push({
    heading:
      lang === 'en'
        ? `${ascSign.name.en} rising`
        : lang === 'de'
          ? `Aszendent in ${ascSign.name.de}`
          : `Ascendente em ${ascSign.name.pt}`,
    paragraphs: [RISING_IN_SIGN[ascIndex][lang]],
    note:
      lang === 'en'
        ? `The eastern horizon at the minute you were born, and ${ascSign.ruler.en} is the planet that looks after it.`
        : lang === 'de'
          ? `Der östliche Horizont in der Minute deiner Geburt, und ${ascSign.ruler.de} ist der Planet, der sich darum kümmert.`
          : `O horizonte leste no minuto em que você nasceu, e ${ascSign.ruler.pt} é o planeta que cuida dele.`,
    sign: ascSign.key,
  });

  // --- what stands out ----------------------------------------------------
  const notes: string[] = [];

  // Dominant element and modality.
  const domElement = topKey(chart.elementCounts) as Element;
  const domModality = topKey(chart.modalityCounts) as Modality;
  notes.push(
    lang === 'en'
      ? `There is a lot of ${ELEMENT_NAMES[domElement].en.toLowerCase()} in you — ${ELEMENT_MEANING[domElement].en}. Mostly ${MODALITY_NAMES[domModality].en.toLowerCase()} too, which ${MODALITY_MEANING[domModality].en}.`
      : lang === 'de'
        ? `Es steckt viel ${ELEMENT_NAMES[domElement].de.toLowerCase()} in dir — ${ELEMENT_MEANING[domElement].de}. Meist auch ${MODALITY_NAMES[domModality].de.toLowerCase()}, was ${MODALITY_MEANING[domModality].de}.`
        : `Há muito ${ELEMENT_NAMES[domElement].pt.toLowerCase()} em você — ${ELEMENT_MEANING[domElement].pt}. E bastante ${MODALITY_NAMES[domModality].pt.toLowerCase()}, o que ${MODALITY_MEANING[domModality].pt}.`,
  );

  // Sect.
  notes.push(
    chart.dayChart
      ? lang === 'en'
        ? 'You were born in daylight, with the Sun above the horizon — a day chart, warmed from the front.'
        : lang === 'de'
          ? 'Du wurdest bei Tageslicht geboren, mit der Sonne über dem Horizont — ein Taghoroskop, von vorne gewärmt.'
          : 'Você nasceu à luz do dia, com o Sol acima do horizonte — um mapa diurno, aquecido de frente.'
      : lang === 'en'
        ? 'You were born after dark, with the Sun below the horizon — a night chart, lit from within.'
        : lang === 'de'
          ? 'Du wurdest nach Einbruch der Dunkelheit geboren, mit der Sonne unter dem Horizont — ein Nachthoroskop, von innen erleuchtet.'
          : 'Você nasceu depois do escuro, com o Sol abaixo do horizonte — um mapa noturno, iluminado por dentro.',
  );

  // The two closest aspects, described from their own parts.
  for (const aspect of chart.aspects.slice(0, 2)) {
    const def = ASPECTS.find((a) => a.key === aspect.key)!;
    notes.push(
      lang === 'en'
        ? `${capitalise(label(aspect.a, 'en'))} and ${label(aspect.b, 'en')} sit at almost exactly ${def.angle}° — ${def.name.en.toLowerCase()}, ${ASPECT_MEANING[aspect.key].en}. That is ${meaningOf(aspect.a, 'en')} meeting ${meaningOf(aspect.b, 'en')}.`
        : lang === 'de'
          ? `${capitalise(label(aspect.a, 'de'))} und ${label(aspect.b, 'de')} stehen bei fast genau ${def.angle}° — ${def.name.de}, ${ASPECT_MEANING[aspect.key].de}. Das ist ${meaningOf(aspect.a, 'de')}, das auf ${meaningOf(aspect.b, 'de')} trifft.`
          : `${capitalise(label(aspect.a, 'pt'))} e ${label(aspect.b, 'pt')} estão a quase exatamente ${def.angle}° — ${def.name.pt.toLowerCase()}, ${ASPECT_MEANING[aspect.key].pt}. É ${meaningOf(aspect.a, 'pt')} encontrando ${meaningOf(aspect.b, 'pt')}.`,
    );
  }

  // Anything sitting on a station is worth a line of its own.
  const stationary = chart.ordered.filter((p) => p.stationary);
  for (const p of stationary) {
    notes.push(
      lang === 'en'
        ? `${BODIES[p.key].name.en} was standing almost perfectly still that day, turning around in ${SIGNS[p.signIndex].name.en}. Planets at a standstill press harder: ${BODY_MEANING[p.key].en} will be a slow, deliberate, lifelong piece of work for you.`
        : lang === 'de'
          ? `${BODIES[p.key].name.de} stand an diesem Tag fast vollkommen still und wechselte die Richtung in ${SIGNS[p.signIndex].name.de}. Stillstehende Planeten drücken stärker: ${BODY_MEANING[p.key].de} wird für dich eine langsame, bewusste Lebensaufgabe sein.`
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
        : lang === 'de'
          ? `${listOf(names, 'de')} ${retro.length === 1 ? 'war' : 'waren'} rückläufig — von dort aus gesehen rückwärts wandernd, wo du standst. Diese Teile von dir arbeiten zuerst nach innen, und zeigen sich später.`
          : `${listOf(names, 'pt')} ${retro.length === 1 ? 'estava' : 'estavam'} retrógrado${retro.length === 1 ? '' : 's'} — andando para trás visto daqui. Essas partes de você trabalham por dentro primeiro, e aparecem depois.`,
    );
  }

  sections.push({
    heading: lang === 'en' ? 'What stands out' : lang === 'de' ? 'Was auffällt' : 'O que salta aos olhos',
    paragraphs: notes,
    icon: 'sparkle',
  });

  // --- vocation -----------------------------------------------------------
  sections.push({
    heading:
      lang === 'en' ? 'The top of your sky' : lang === 'de' ? 'Der Gipfel deines Himmels' : 'O topo do seu céu',
    paragraphs: [
      lang === 'en'
        ? `Directly overhead at your birth was ${mcSign.name.en} — the highest point of the chart, and the one that hints at what you might become known for. ${capitalise(mcSign.keywords.en)}. Whatever you end up doing, people are likely to meet that in you first.`
        : lang === 'de'
          ? `Direkt über dir bei deiner Geburt stand ${mcSign.name.de} — der höchste Punkt der Karte, und derjenige, der andeutet, wofür du einmal bekannt sein könntest. ${capitalise(mcSign.keywords.de)}. Was auch immer du am Ende tust, die Menschen werden das wahrscheinlich zuerst in dir erkennen.`
          : `Bem acima da sua cabeça, no nascimento, estava ${mcSign.name.pt} — o ponto mais alto do mapa, aquele que sugere aquilo pelo que você pode ser conhecido. ${capitalise(mcSign.keywords.pt)}. Faça o que fizer, é provável que as pessoas encontrem isso em você primeiro.`,
    ],
    icon: 'summit',
  });

  // --- closing ------------------------------------------------------------
  sections.push({
    heading: lang === 'en' ? 'And then' : lang === 'de' ? 'Und dann' : 'E então',
    paragraphs: [
      lang === 'en'
        ? `None of this is an instruction manual, ${firstName}. The sky does not tell you who to be — it only says that on the 26th of July, 2026, at 12:48 in the afternoon, there was a particular arrangement of light above a particular town, and you were underneath it, brand new and entirely yourself.`
        : lang === 'de'
          ? `Nichts davon ist eine Gebrauchsanweisung, ${firstName}. Der Himmel sagt dir nicht, wer du sein sollst — er sagt nur, dass am 26. Juli 2026, um 12:48 Uhr mittags, eine ganz bestimmte Anordnung von Licht über einer ganz bestimmten Stadt herrschte, und du warst darunter, brandneu und ganz du selbst.`
          : `Nada disso é um manual de instruções, ${firstName}. O céu não diz quem você deve ser — ele só conta que, no dia 26 de julho de 2026, às 12h48 da tarde, havia um arranjo muito particular de luz acima de uma cidade muito particular, e você estava embaixo dele, novinho e inteiramente você.`,
      lang === 'en'
        ? 'Welcome. You were very, very wanted.'
        : lang === 'de'
          ? 'Willkommen. Du warst sehr, sehr erwünscht.'
          : 'Seja bem-vindo. Você foi muito, muito esperado.',
    ],
    icon: 'heart',
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
  const and = lang === 'en' ? 'and' : lang === 'de' ? 'und' : 'e';
  return `${items.slice(0, -1).join(', ')} ${and} ${items[items.length - 1]}`;
}
