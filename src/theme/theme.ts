import { Element } from '../astro/constants';

/**
 * A soft pastel world built from two hues — sage green and salmon — over a
 * warm off-white. Nothing is fully saturated, nothing is outlined: depth comes
 * from solid tinted fills and wide, faint shadows.
 */
export const colors = {
  // surfaces
  paper: '#FBF8F3',
  paperDeep: '#F0EDE4', // inset blocks inside a card
  card: '#FFFDFA',
  cardTint: '#F6EFE7',
  cardWarm: '#FAEBE1', // salmon-tinted card
  cardCool: '#EBF1E5', // green-tinted card

  // ink — a deep green-grey, never pure black
  ink: '#3B453C',
  inkSoft: '#6F7A6D',
  inkFaint: '#9DA697',
  hairline: '#E4E0D5', // dividers only; cards carry no stroke

  // the two hues
  salmon: '#E8A187',
  salmonSoft: '#F8DCCF',
  salmonDeep: '#C4735A',
  green: '#9CB791',
  greenSoft: '#DEE9D4',
  greenDeep: '#6C8A62',
  sand: '#D9CBB0',
  sandDeep: '#A8946F',

  /** The single accent, used sparingly: eyebrows, angles, active states. */
  accent: '#C4735A',
  accentSoft: '#F6DCD0',

  // retained aliases used for small marks
  rose: '#C4735A',
  blush: '#F8DCCF',
};

/**
 * Element colours, kept inside the green/salmon world: salmon, moss, sand and
 * eucalyptus. Warm and cool alternate so neighbouring signs stay legible.
 */
export const elementColors: Record<Element, { soft: string; strong: string }> = {
  fire: { soft: '#F8DBCD', strong: '#CB7A5E' },
  earth: { soft: '#E1EAD6', strong: '#7E9A6C' },
  air: { soft: '#EFE9DA', strong: '#AE9B77' },
  water: { soft: '#DCEAE1', strong: '#6E9C86' },
};

export const aspectColors = {
  soft: '#8FAF97', // flowing — green
  hard: '#DB967D', // tense — salmon
  neutral: '#B9A98A', // sand
};

/**
 * Instrument Serif ships a single weight and a single italic. Hierarchy
 * therefore comes from size, colour and letter-spacing rather than weight, and
 * these aliases all resolve to those two faces — they are kept so that call
 * sites still read by intent.
 */
export const fonts = {
  light: 'InstrumentSerif',
  regular: 'InstrumentSerif',
  medium: 'InstrumentSerif',
  semibold: 'InstrumentSerif',
  italic: 'InstrumentSerifItalic',
  lightItalic: 'InstrumentSerifItalic',
};

/**
 * Instrument Serif is a display face: it sets tight and a little large. Body
 * copy needs extra leading to stay comfortable, and display sizes want
 * slightly negative tracking to hold together.
 */
export const typography = {
  displayTracking: -0.6,
  bodyLineHeight: 1.55,
  eyebrowTracking: 2.6,
};

export const radii = {
  sm: 10,
  md: 18,
  lg: 24,
  xl: 32,
};

export const spacing = (n: number) => n * 8;

/** Wide, faint, and low — cards float rather than sit in a box. */
export const softShadow = {
  shadowColor: '#6F6A55',
  shadowOpacity: 0.1,
  shadowRadius: 22,
  shadowOffset: { width: 0, height: 8 },
  elevation: 2,
};

/** A touch deeper, for the element that should read as lifted. */
export const liftedShadow = {
  shadowColor: '#6F6A55',
  shadowOpacity: 0.14,
  shadowRadius: 30,
  shadowOffset: { width: 0, height: 12 },
  elevation: 4,
};
