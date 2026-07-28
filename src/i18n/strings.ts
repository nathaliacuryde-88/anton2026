import { Bilingual } from '../astro/constants';

/** Every fixed piece of UI copy, in English, Portuguese and German. */
export const UI = {
  appTitle: { en: 'Anton’s Sky', pt: 'O Céu de Anton', de: 'Antons Himmel' },

  // navigation
  navChart: { en: 'Chart', pt: 'Mapa', de: 'Karte' },
  navSky: { en: 'Sky', pt: 'Céu', de: 'Himmel' },
  navHouses: { en: 'Houses', pt: 'Casas', de: 'Häuser' },
  navAspects: { en: 'Aspects', pt: 'Aspectos', de: 'Aspekte' },
  navPortrait: { en: 'Portrait', pt: 'Retrato', de: 'Porträt' },
  navFamily: { en: 'Family', pt: 'Família', de: 'Familie' },

  // chart screen
  bornOn: { en: 'Born', pt: 'Nasceu', de: 'Geboren' },
  at: { en: 'at', pt: 'às', de: 'um' },
  theBigThree: { en: 'The big three', pt: 'Os três principais', de: 'Die großen Drei' },
  sunLabel: { en: 'Sun', pt: 'Sol', de: 'Sonne' },
  moonLabel: { en: 'Moon', pt: 'Lua', de: 'Mond' },
  risingLabel: { en: 'Rising', pt: 'Ascendente', de: 'Aszendent' },
  sunCaption: { en: 'who he is', pt: 'quem ele é', de: 'wer er ist' },
  moonCaption: { en: 'how he feels', pt: 'como ele sente', de: 'wie er fühlt' },
  risingCaption: {
    en: 'how he meets the world',
    pt: 'como ele encontra o mundo',
    de: 'wie er der Welt begegnet',
  },
  balance: { en: 'Balance', pt: 'Equilíbrio', de: 'Gleichgewicht' },
  elements: { en: 'Elements', pt: 'Elementos', de: 'Elemente' },
  modalities: { en: 'Modalities', pt: 'Modalidades', de: 'Qualitäten' },
  dayChart: {
    en: 'A day chart — born under the Sun',
    pt: 'Mapa diurno — nascido sob o Sol',
    de: 'Ein Taghoroskop — geboren unter der Sonne',
  },
  nightChart: {
    en: 'A night chart — born under the Moon',
    pt: 'Mapa noturno — nascido sob a Lua',
    de: 'Ein Nachthoroskop — geboren unter dem Mond',
  },

  // sky screen
  house: { en: 'House', pt: 'Casa', de: 'Haus' },
  retrograde: { en: 'retrograde', pt: 'retrógrado', de: 'rückläufig' },
  stationary: { en: 'standing still', pt: 'estacionário', de: 'stillstehend' },
  perDay: { en: '/day', pt: '/dia', de: '/Tag' },

  // houses screen
  cusp: { en: 'Cusp', pt: 'Cúspide', de: 'Spitze' },
  housesSystem: { en: 'Placidus houses', pt: 'Casas Placidus', de: 'Placidus-Häuser' },
  empty: { en: 'empty', pt: 'vazia', de: 'leer' },

  // aspects screen
  orb: { en: 'orb', pt: 'orbe', de: 'Orbis' },
  applying: { en: 'applying', pt: 'aplicativo', de: 'zunehmend' },
  separating: { en: 'separating', pt: 'separativo', de: 'abnehmend' },
  tightest: {
    en: 'Closest conversations',
    pt: 'Conversas mais próximas',
    de: 'Die engsten Gespräche',
  },

  // portrait screen

  // shared
  ruler: { en: 'Ruler', pt: 'Regente', de: 'Herrscher' },
  element: { en: 'Element', pt: 'Elemento', de: 'Element' },
  modality: { en: 'Modality', pt: 'Modalidade', de: 'Qualität' },
  close: { en: 'Close', pt: 'Fechar', de: 'Schließen' },
  language: { en: 'EN', pt: 'PT', de: 'DE' },
  aboutTitle: { en: 'About this chart', pt: 'Sobre este mapa', de: 'Über diese Karte' },
  aboutBody: {
    en:
      'Positions are computed from the VSOP87 and ELP planetary theories for the exact minute and place of birth, in the tropical zodiac, with Placidus houses. Astrology is not science — it is a very old and very beautiful way of telling someone they are welcome here.',
    pt:
      'As posições são calculadas pelas teorias planetárias VSOP87 e ELP para o minuto e o lugar exatos do nascimento, no zodíaco tropical, com casas Placidus. Astrologia não é ciência — é um jeito muito antigo e muito bonito de dizer a alguém que ele é bem-vindo aqui.',
    de:
      'Die Positionen werden mit den Planetentheorien VSOP87 und ELP für die genaue Geburtsminute und den genauen Geburtsort berechnet, im tropischen Tierkreis, mit Häusern nach Placidus. Astrologie ist keine Wissenschaft — sie ist eine sehr alte und sehr schöne Art, jemandem zu sagen, dass er hier willkommen ist.',
  },
} satisfies Record<string, Bilingual>;

export type UIKey = keyof typeof UI;
