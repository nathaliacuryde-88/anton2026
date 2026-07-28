/**
 * Zodiac, planet and aspect reference data.
 *
 * Every user-facing label carries an English, Portuguese and German form so
 * the UI can switch language without touching the astronomy layer.
 */

/**
 * Note on glyphs: the zodiac signs (U+2648-2653) and the Venus/Mars symbols
 * default to emoji presentation, which would render them as saturated colour
 * images. Each is followed by U+FE0E (variation selector-15) to request the
 * monochrome text form instead. Platforms that lack the variant ignore it.
 */
export type Lang = 'en' | 'pt' | 'de';
export type Bilingual = { en: string; pt: string; de: string };

export type Element = 'fire' | 'earth' | 'air' | 'water';
export type Modality = 'cardinal' | 'fixed' | 'mutable';

export type SignDef = {
  key: string;
  glyph: string;
  name: Bilingual;
  element: Element;
  modality: Modality;
  ruler: Bilingual;
  keywords: Bilingual;
};

/** The twelve tropical signs, in zodiacal order starting at 0° Aries. */
export const SIGNS: SignDef[] = [
  {
    key: 'aries',
    glyph: '♈︎',
    name: { en: 'Aries', pt: 'Áries', de: 'Widder' },
    element: 'fire',
    modality: 'cardinal',
    ruler: { en: 'Mars', pt: 'Marte', de: 'Mars' },
    keywords: {
      en: 'brave · direct · pioneering',
      pt: 'corajoso · direto · pioneiro',
      de: 'mutig · direkt · pionierhaft',
    },
  },
  {
    key: 'taurus',
    glyph: '♉︎',
    name: { en: 'Taurus', pt: 'Touro', de: 'Stier' },
    element: 'earth',
    modality: 'fixed',
    ruler: { en: 'Venus', pt: 'Vênus', de: 'Venus' },
    keywords: {
      en: 'steady · sensory · loyal',
      pt: 'estável · sensorial · leal',
      de: 'beständig · sinnlich · treu',
    },
  },
  {
    key: 'gemini',
    glyph: '♊︎',
    name: { en: 'Gemini', pt: 'Gêmeos', de: 'Zwillinge' },
    element: 'air',
    modality: 'mutable',
    ruler: { en: 'Mercury', pt: 'Mercúrio', de: 'Merkur' },
    keywords: {
      en: 'curious · quick · playful',
      pt: 'curioso · rápido · brincalhão',
      de: 'neugierig · schnell · verspielt',
    },
  },
  {
    key: 'cancer',
    glyph: '♋︎',
    name: { en: 'Cancer', pt: 'Câncer', de: 'Krebs' },
    element: 'water',
    modality: 'cardinal',
    ruler: { en: 'Moon', pt: 'Lua', de: 'Mond' },
    keywords: {
      en: 'tender · protective · deep',
      pt: 'terno · protetor · profundo',
      de: 'zärtlich · beschützend · tief',
    },
  },
  {
    key: 'leo',
    glyph: '♌︎',
    name: { en: 'Leo', pt: 'Leão', de: 'Löwe' },
    element: 'fire',
    modality: 'fixed',
    ruler: { en: 'Sun', pt: 'Sol', de: 'Sonne' },
    keywords: {
      en: 'warm · radiant · generous',
      pt: 'caloroso · radiante · generoso',
      de: 'warmherzig · strahlend · großzügig',
    },
  },
  {
    key: 'virgo',
    glyph: '♍︎',
    name: { en: 'Virgo', pt: 'Virgem', de: 'Jungfrau' },
    element: 'earth',
    modality: 'mutable',
    ruler: { en: 'Mercury', pt: 'Mercúrio', de: 'Merkur' },
    keywords: {
      en: 'careful · helpful · precise',
      pt: 'cuidadoso · prestativo · preciso',
      de: 'sorgfältig · hilfsbereit · genau',
    },
  },
  {
    key: 'libra',
    glyph: '♎︎',
    name: { en: 'Libra', pt: 'Libra', de: 'Waage' },
    element: 'air',
    modality: 'cardinal',
    ruler: { en: 'Venus', pt: 'Vênus', de: 'Venus' },
    keywords: {
      en: 'gracious · fair · charming',
      pt: 'gentil · justo · encantador',
      de: 'anmutig · gerecht · charmant',
    },
  },
  {
    key: 'scorpio',
    glyph: '♏︎',
    name: { en: 'Scorpio', pt: 'Escorpião', de: 'Skorpion' },
    element: 'water',
    modality: 'fixed',
    ruler: { en: 'Pluto & Mars', pt: 'Plutão e Marte', de: 'Pluto und Mars' },
    keywords: {
      en: 'intense · loyal · perceptive',
      pt: 'intenso · leal · perceptivo',
      de: 'intensiv · treu · scharfsinnig',
    },
  },
  {
    key: 'sagittarius',
    glyph: '♐︎',
    name: { en: 'Sagittarius', pt: 'Sagitário', de: 'Schütze' },
    element: 'fire',
    modality: 'mutable',
    ruler: { en: 'Jupiter', pt: 'Júpiter', de: 'Jupiter' },
    keywords: {
      en: 'free · hopeful · adventurous',
      pt: 'livre · esperançoso · aventureiro',
      de: 'frei · hoffnungsvoll · abenteuerlustig',
    },
  },
  {
    key: 'capricorn',
    glyph: '♑︎',
    name: { en: 'Capricorn', pt: 'Capricórnio', de: 'Steinbock' },
    element: 'earth',
    modality: 'cardinal',
    ruler: { en: 'Saturn', pt: 'Saturno', de: 'Saturn' },
    keywords: {
      en: 'patient · capable · wise',
      pt: 'paciente · capaz · sábio',
      de: 'geduldig · fähig · weise',
    },
  },
  {
    key: 'aquarius',
    glyph: '♒︎',
    name: { en: 'Aquarius', pt: 'Aquário', de: 'Wassermann' },
    element: 'air',
    modality: 'fixed',
    ruler: { en: 'Uranus & Saturn', pt: 'Urano e Saturno', de: 'Uranus und Saturn' },
    keywords: {
      en: 'original · humane · free-thinking',
      pt: 'original · humano · livre-pensador',
      de: 'originell · menschlich · freidenkend',
    },
  },
  {
    key: 'pisces',
    glyph: '♓︎',
    name: { en: 'Pisces', pt: 'Peixes', de: 'Fische' },
    element: 'water',
    modality: 'mutable',
    ruler: { en: 'Neptune & Jupiter', pt: 'Netuno e Júpiter', de: 'Neptun und Jupiter' },
    keywords: {
      en: 'dreamy · gentle · compassionate',
      pt: 'sonhador · gentil · compassivo',
      de: 'verträumt · sanft · mitfühlend',
    },
  },
];

export const ELEMENT_NAMES: Record<Element, Bilingual> = {
  fire: { en: 'Fire', pt: 'Fogo', de: 'Feuer' },
  earth: { en: 'Earth', pt: 'Terra', de: 'Erde' },
  air: { en: 'Air', pt: 'Ar', de: 'Luft' },
  water: { en: 'Water', pt: 'Água', de: 'Wasser' },
};

export const MODALITY_NAMES: Record<Modality, Bilingual> = {
  cardinal: { en: 'Cardinal', pt: 'Cardinal', de: 'Kardinal' },
  fixed: { en: 'Fixed', pt: 'Fixo', de: 'Fix' },
  mutable: { en: 'Mutable', pt: 'Mutável', de: 'Veränderlich' },
};

/** Keys of every point the chart computes, in display order. */
export const BODY_KEYS = [
  'sun',
  'moon',
  'mercury',
  'venus',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
  'pluto',
  'northNode',
  'southNode',
  'lilith',
  'fortune',
] as const;

export type BodyKey = (typeof BODY_KEYS)[number];

export type BodyDef = {
  key: BodyKey;
  glyph: string;
  name: Bilingual;
  /** Luminaries and personal planets get slightly wider aspect orbs. */
  luminary?: boolean;
  /** Calculated points are drawn a little more quietly in the wheel. */
  point?: boolean;
};

export const BODIES: Record<BodyKey, BodyDef> = {
  sun: { key: 'sun', glyph: '☉', name: { en: 'Sun', pt: 'Sol', de: 'Sonne' }, luminary: true },
  moon: { key: 'moon', glyph: '☽', name: { en: 'Moon', pt: 'Lua', de: 'Mond' }, luminary: true },
  mercury: { key: 'mercury', glyph: '☿', name: { en: 'Mercury', pt: 'Mercúrio', de: 'Merkur' } },
  venus: { key: 'venus', glyph: '♀︎', name: { en: 'Venus', pt: 'Vênus', de: 'Venus' } },
  mars: { key: 'mars', glyph: '♂︎', name: { en: 'Mars', pt: 'Marte', de: 'Mars' } },
  jupiter: { key: 'jupiter', glyph: '♃', name: { en: 'Jupiter', pt: 'Júpiter', de: 'Jupiter' } },
  saturn: { key: 'saturn', glyph: '♄', name: { en: 'Saturn', pt: 'Saturno', de: 'Saturn' } },
  uranus: { key: 'uranus', glyph: '♅', name: { en: 'Uranus', pt: 'Urano', de: 'Uranus' } },
  neptune: { key: 'neptune', glyph: '♆', name: { en: 'Neptune', pt: 'Netuno', de: 'Neptun' } },
  pluto: { key: 'pluto', glyph: '♇', name: { en: 'Pluto', pt: 'Plutão', de: 'Pluto' } },
  northNode: {
    key: 'northNode',
    glyph: '☊',
    name: { en: 'North Node', pt: 'Nodo Norte', de: 'Nordknoten' },
    point: true,
  },
  southNode: {
    key: 'southNode',
    glyph: '☋',
    name: { en: 'South Node', pt: 'Nodo Sul', de: 'Südknoten' },
    point: true,
  },
  lilith: {
    key: 'lilith',
    glyph: '⚸',
    name: { en: 'Lilith', pt: 'Lilith', de: 'Lilith' },
    point: true,
  },
  fortune: {
    key: 'fortune',
    glyph: '⊗',
    name: { en: 'Part of Fortune', pt: 'Parte da Fortuna', de: 'Glückspunkt' },
    point: true,
  },
};

/**
 * Modern ruling planet of each sign.
 *
 * This is how a house holding no planets is traditionally read: you look at the
 * sign on its cusp, find that sign's ruler, and see where *that* planet is.
 */
export const SIGN_RULER: Record<string, BodyKey> = {
  aries: 'mars',
  taurus: 'venus',
  gemini: 'mercury',
  cancer: 'moon',
  leo: 'sun',
  virgo: 'mercury',
  libra: 'venus',
  scorpio: 'pluto',
  sagittarius: 'jupiter',
  capricorn: 'saturn',
  aquarius: 'uranus',
  pisces: 'neptune',
};

export const ANGLE_NAMES = {
  asc: { en: 'Ascendant', pt: 'Ascendente', de: 'Aszendent' },
  mc: { en: 'Midheaven', pt: 'Meio do Céu', de: 'Medium Coeli' },
  dsc: { en: 'Descendant', pt: 'Descendente', de: 'Deszendent' },
  ic: { en: 'Imum Coeli', pt: 'Fundo do Céu', de: 'Imum Coeli' },
} as const;

export type AspectKey =
  | 'conjunction'
  | 'sextile'
  | 'square'
  | 'trine'
  | 'opposition'
  | 'quincunx';

export type AspectDef = {
  key: AspectKey;
  angle: number;
  glyph: string;
  name: Bilingual;
  /** Base orb in degrees; luminaries add a bonus (see engine). */
  orb: number;
  /** Flowing aspects are drawn in blue-green, tense ones in rose. */
  tone: 'soft' | 'hard' | 'neutral';
};

export const ASPECTS: AspectDef[] = [
  {
    key: 'conjunction',
    angle: 0,
    glyph: '☌',
    name: { en: 'Conjunction', pt: 'Conjunção', de: 'Konjunktion' },
    orb: 8,
    tone: 'neutral',
  },
  {
    key: 'sextile',
    angle: 60,
    glyph: '⚹',
    name: { en: 'Sextile', pt: 'Sextil', de: 'Sextil' },
    orb: 4,
    tone: 'soft',
  },
  {
    key: 'square',
    angle: 90,
    glyph: '□',
    name: { en: 'Square', pt: 'Quadratura', de: 'Quadrat' },
    orb: 6,
    tone: 'hard',
  },
  {
    key: 'trine',
    angle: 120,
    glyph: '△',
    name: { en: 'Trine', pt: 'Trígono', de: 'Trigon' },
    orb: 6,
    tone: 'soft',
  },
  {
    key: 'opposition',
    angle: 180,
    glyph: '☍',
    name: { en: 'Opposition', pt: 'Oposição', de: 'Opposition' },
    orb: 7,
    tone: 'hard',
  },
  {
    key: 'quincunx',
    angle: 150,
    glyph: '⚻',
    name: { en: 'Quincunx', pt: 'Quincunce', de: 'Quinkunx' },
    orb: 2.5,
    tone: 'neutral',
  },
];
