import { Bilingual } from '../astro/constants';

/** Every fixed piece of UI copy, in English and Portuguese. */
export const UI = {
  appTitle: { en: 'Anton’s Sky', pt: 'O Céu de Anton' },

  // navigation
  navChart: { en: 'Chart', pt: 'Mapa' },
  navSky: { en: 'Sky', pt: 'Céu' },
  navHouses: { en: 'Houses', pt: 'Casas' },
  navAspects: { en: 'Aspects', pt: 'Aspectos' },
  navPortrait: { en: 'Portrait', pt: 'Retrato' },
  navFamily: { en: 'Family', pt: 'Família' },

  // chart screen
  bornOn: { en: 'Born', pt: 'Nasceu' },
  at: { en: 'at', pt: 'às' },
  theBigThree: { en: 'The big three', pt: 'Os três principais' },
  sunLabel: { en: 'Sun', pt: 'Sol' },
  moonLabel: { en: 'Moon', pt: 'Lua' },
  risingLabel: { en: 'Rising', pt: 'Ascendente' },
  sunCaption: { en: 'who he is', pt: 'quem ele é' },
  moonCaption: { en: 'how he feels', pt: 'como ele sente' },
  risingCaption: { en: 'how he meets the world', pt: 'como ele encontra o mundo' },
  balance: { en: 'Balance', pt: 'Equilíbrio' },
  elements: { en: 'Elements', pt: 'Elementos' },
  modalities: { en: 'Modalities', pt: 'Modalidades' },
  dayChart: { en: 'A day chart — born under the Sun', pt: 'Mapa diurno — nascido sob o Sol' },
  nightChart: { en: 'A night chart — born under the Moon', pt: 'Mapa noturno — nascido sob a Lua' },

  // sky screen
  house: { en: 'House', pt: 'Casa' },
  retrograde: { en: 'retrograde', pt: 'retrógrado' },
  stationary: { en: 'standing still', pt: 'estacionário' },
  perDay: { en: '/day', pt: '/dia' },

  // houses screen
  cusp: { en: 'Cusp', pt: 'Cúspide' },
  housesSystem: { en: 'Placidus houses', pt: 'Casas Placidus' },
  empty: { en: 'empty', pt: 'vazia' },

  // aspects screen
  orb: { en: 'orb', pt: 'orbe' },
  applying: { en: 'applying', pt: 'aplicativo' },
  separating: { en: 'separating', pt: 'separativo' },
  tightest: { en: 'Closest conversations', pt: 'Conversas mais próximas' },

  // portrait screen

  // shared
  ruler: { en: 'Ruler', pt: 'Regente' },
  element: { en: 'Element', pt: 'Elemento' },
  modality: { en: 'Modality', pt: 'Modalidade' },
  close: { en: 'Close', pt: 'Fechar' },
  language: { en: 'EN', pt: 'PT' },
  aboutTitle: { en: 'About this chart', pt: 'Sobre este mapa' },
  aboutBody: {
    en:
      'Positions are computed from the VSOP87 and ELP planetary theories for the exact minute and place of birth, in the tropical zodiac, with Placidus houses. Astrology is not science — it is a very old and very beautiful way of telling someone they are welcome here.',
    pt:
      'As posições são calculadas pelas teorias planetárias VSOP87 e ELP para o minuto e o lugar exatos do nascimento, no zodíaco tropical, com casas Placidus. Astrologia não é ciência — é um jeito muito antigo e muito bonito de dizer a alguém que ele é bem-vindo aqui.',
  },
} satisfies Record<string, Bilingual>;

export type UIKey = keyof typeof UI;
