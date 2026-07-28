/**
 * Zodiac, planet and aspect reference data.
 *
 * Every user-facing label carries both an English and a Portuguese form so the
 * UI can switch language without touching the astronomy layer.
 */

/**
 * Note on glyphs: the zodiac signs (U+2648-2653) and the Venus/Mars symbols
 * default to emoji presentation, which would render them as saturated colour
 * images. Each is followed by U+FE0E (variation selector-15) to request the
 * monochrome text form instead. Platforms that lack the variant ignore it.
 */
export type Lang = 'en' | 'pt';
export type Bilingual = { en: string; pt: string };

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
    glyph: '♈\uFE0E',
    name: { en: 'Aries', pt: 'Áries' },
    element: 'fire',
    modality: 'cardinal',
    ruler: { en: 'Mars', pt: 'Marte' },
    keywords: { en: 'brave · direct · pioneering', pt: 'corajoso · direto · pioneiro' },
  },
  {
    key: 'taurus',
    glyph: '♉\uFE0E',
    name: { en: 'Taurus', pt: 'Touro' },
    element: 'earth',
    modality: 'fixed',
    ruler: { en: 'Venus', pt: 'Vênus' },
    keywords: { en: 'steady · sensory · loyal', pt: 'estável · sensorial · leal' },
  },
  {
    key: 'gemini',
    glyph: '♊\uFE0E',
    name: { en: 'Gemini', pt: 'Gêmeos' },
    element: 'air',
    modality: 'mutable',
    ruler: { en: 'Mercury', pt: 'Mercúrio' },
    keywords: { en: 'curious · quick · playful', pt: 'curioso · rápido · brincalhão' },
  },
  {
    key: 'cancer',
    glyph: '♋\uFE0E',
    name: { en: 'Cancer', pt: 'Câncer' },
    element: 'water',
    modality: 'cardinal',
    ruler: { en: 'Moon', pt: 'Lua' },
    keywords: { en: 'tender · protective · deep', pt: 'terno · protetor · profundo' },
  },
  {
    key: 'leo',
    glyph: '♌\uFE0E',
    name: { en: 'Leo', pt: 'Leão' },
    element: 'fire',
    modality: 'fixed',
    ruler: { en: 'Sun', pt: 'Sol' },
    keywords: { en: 'warm · radiant · generous', pt: 'caloroso · radiante · generoso' },
  },
  {
    key: 'virgo',
    glyph: '♍\uFE0E',
    name: { en: 'Virgo', pt: 'Virgem' },
    element: 'earth',
    modality: 'mutable',
    ruler: { en: 'Mercury', pt: 'Mercúrio' },
    keywords: { en: 'careful · helpful · precise', pt: 'cuidadoso · prestativo · preciso' },
  },
  {
    key: 'libra',
    glyph: '♎\uFE0E',
    name: { en: 'Libra', pt: 'Libra' },
    element: 'air',
    modality: 'cardinal',
    ruler: { en: 'Venus', pt: 'Vênus' },
    keywords: { en: 'gracious · fair · charming', pt: 'gentil · justo · encantador' },
  },
  {
    key: 'scorpio',
    glyph: '♏\uFE0E',
    name: { en: 'Scorpio', pt: 'Escorpião' },
    element: 'water',
    modality: 'fixed',
    ruler: { en: 'Pluto & Mars', pt: 'Plutão e Marte' },
    keywords: { en: 'intense · loyal · perceptive', pt: 'intenso · leal · perceptivo' },
  },
  {
    key: 'sagittarius',
    glyph: '♐\uFE0E',
    name: { en: 'Sagittarius', pt: 'Sagitário' },
    element: 'fire',
    modality: 'mutable',
    ruler: { en: 'Jupiter', pt: 'Júpiter' },
    keywords: { en: 'free · hopeful · adventurous', pt: 'livre · esperançoso · aventureiro' },
  },
  {
    key: 'capricorn',
    glyph: '♑\uFE0E',
    name: { en: 'Capricorn', pt: 'Capricórnio' },
    element: 'earth',
    modality: 'cardinal',
    ruler: { en: 'Saturn', pt: 'Saturno' },
    keywords: { en: 'patient · capable · wise', pt: 'paciente · capaz · sábio' },
  },
  {
    key: 'aquarius',
    glyph: '♒\uFE0E',
    name: { en: 'Aquarius', pt: 'Aquário' },
    element: 'air',
    modality: 'fixed',
    ruler: { en: 'Uranus & Saturn', pt: 'Urano e Saturno' },
    keywords: { en: 'original · humane · free-thinking', pt: 'original · humano · livre-pensador' },
  },
  {
    key: 'pisces',
    glyph: '♓\uFE0E',
    name: { en: 'Pisces', pt: 'Peixes' },
    element: 'water',
    modality: 'mutable',
    ruler: { en: 'Neptune & Jupiter', pt: 'Netuno e Júpiter' },
    keywords: { en: 'dreamy · gentle · compassionate', pt: 'sonhador · gentil · compassivo' },
  },
];

export const ELEMENT_NAMES: Record<Element, Bilingual> = {
  fire: { en: 'Fire', pt: 'Fogo' },
  earth: { en: 'Earth', pt: 'Terra' },
  air: { en: 'Air', pt: 'Ar' },
  water: { en: 'Water', pt: 'Água' },
};

export const MODALITY_NAMES: Record<Modality, Bilingual> = {
  cardinal: { en: 'Cardinal', pt: 'Cardinal' },
  fixed: { en: 'Fixed', pt: 'Fixo' },
  mutable: { en: 'Mutable', pt: 'Mutável' },
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
  sun: { key: 'sun', glyph: '☉', name: { en: 'Sun', pt: 'Sol' }, luminary: true },
  moon: { key: 'moon', glyph: '☽', name: { en: 'Moon', pt: 'Lua' }, luminary: true },
  mercury: { key: 'mercury', glyph: '☿', name: { en: 'Mercury', pt: 'Mercúrio' } },
  venus: { key: 'venus', glyph: '♀\uFE0E', name: { en: 'Venus', pt: 'Vênus' } },
  mars: { key: 'mars', glyph: '♂\uFE0E', name: { en: 'Mars', pt: 'Marte' } },
  jupiter: { key: 'jupiter', glyph: '♃', name: { en: 'Jupiter', pt: 'Júpiter' } },
  saturn: { key: 'saturn', glyph: '♄', name: { en: 'Saturn', pt: 'Saturno' } },
  uranus: { key: 'uranus', glyph: '♅', name: { en: 'Uranus', pt: 'Urano' } },
  neptune: { key: 'neptune', glyph: '♆', name: { en: 'Neptune', pt: 'Netuno' } },
  pluto: { key: 'pluto', glyph: '♇', name: { en: 'Pluto', pt: 'Plutão' } },
  northNode: {
    key: 'northNode',
    glyph: '☊',
    name: { en: 'North Node', pt: 'Nodo Norte' },
    point: true,
  },
  southNode: {
    key: 'southNode',
    glyph: '☋',
    name: { en: 'South Node', pt: 'Nodo Sul' },
    point: true,
  },
  lilith: {
    key: 'lilith',
    glyph: '⚸',
    name: { en: 'Lilith', pt: 'Lilith' },
    point: true,
  },
  fortune: {
    key: 'fortune',
    glyph: '⊗',
    name: { en: 'Part of Fortune', pt: 'Parte da Fortuna' },
    point: true,
  },
};

export const ANGLE_NAMES = {
  asc: { en: 'Ascendant', pt: 'Ascendente' },
  mc: { en: 'Midheaven', pt: 'Meio do Céu' },
  dsc: { en: 'Descendant', pt: 'Descendente' },
  ic: { en: 'Imum Coeli', pt: 'Fundo do Céu' },
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
    name: { en: 'Conjunction', pt: 'Conjunção' },
    orb: 8,
    tone: 'neutral',
  },
  {
    key: 'sextile',
    angle: 60,
    glyph: '⚹',
    name: { en: 'Sextile', pt: 'Sextil' },
    orb: 4,
    tone: 'soft',
  },
  {
    key: 'square',
    angle: 90,
    glyph: '□',
    name: { en: 'Square', pt: 'Quadratura' },
    orb: 6,
    tone: 'hard',
  },
  {
    key: 'trine',
    angle: 120,
    glyph: '△',
    name: { en: 'Trine', pt: 'Trígono' },
    orb: 6,
    tone: 'soft',
  },
  {
    key: 'opposition',
    angle: 180,
    glyph: '☍',
    name: { en: 'Opposition', pt: 'Oposição' },
    orb: 7,
    tone: 'hard',
  },
  {
    key: 'quincunx',
    angle: 150,
    glyph: '⚻',
    name: { en: 'Quincunx', pt: 'Quincunce' },
    orb: 2.5,
    tone: 'neutral',
  },
];
