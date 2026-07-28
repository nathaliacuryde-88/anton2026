import { Element } from '../astro/constants';

/**
 * Palette.
 *
 * Two primaries — a pale butter yellow and a deep blue — with brown, petrol
 * navy and pale aqua as secondaries. The five given colours are kept exact
 * where they carry weight; the softer tints and the darker, legible variants
 * are derived from them, because #FCFABD cannot hold text and #1F18C0 is too
 * loud to fill a card with.
 */
const PRIMARY_YELLOW = '#FCFABD';
const PRIMARY_BLUE = '#1F18C0';
const SECONDARY_BROWN = '#8A4C00';
const SECONDARY_NAVY = '#0D354A';
const SECONDARY_AQUA = '#B2E6E4';

export const colors = {
  // the palette, unaltered
  yellow: PRIMARY_YELLOW,
  blue: PRIMARY_BLUE,
  brown: SECONDARY_BROWN,
  navy: SECONDARY_NAVY,
  aqua: SECONDARY_AQUA,

  // derived tints — the yellow, opened up into a paper
  paper: '#FDFCF1',
  paperDeep: '#F4F1DB',
  card: '#FFFEF8',
  cardTint: '#F8F5E1',
  cardWarm: '#FBF7DC', // yellow-tinted
  cardCool: '#E7F4F3', // aqua-tinted

  // ink, taken from the navy so text belongs to the palette
  ink: SECONDARY_NAVY,
  inkSoft: '#4C6575',
  inkFaint: '#8A9BA5',
  hairline: '#E6E2CB',

  // derived working shades
  yellowDeep: '#9A8420', // yellow dark enough to read on paper
  blueSoft: '#DEDCF7',
  blueDeep: '#1A14A0',
  brownSoft: '#F1E1C9',
  aquaDeep: '#3B8B89',
  navySoft: '#D5E0E6',

  /** The primary accent: eyebrows, angles, active states. */
  accent: PRIMARY_BLUE,
  accentSoft: '#DEDCF7',
  /** The warm counterweight, used sparingly. */
  accentWarm: SECONDARY_BROWN,

  // small marks
  rose: SECONDARY_BROWN,
  blush: '#F1E1C9',
};

/**
 * One element per palette colour: brown for fire, yellow for earth, aqua for
 * air, blue for water. The `soft` values are tints light enough to sit behind
 * a glyph; the `strong` values are dark enough to read on paper.
 */
export const elementColors: Record<Element, { soft: string; strong: string }> = {
  fire: { soft: '#F3E2CB', strong: '#8A4C00' },
  earth: { soft: '#F6F2C4', strong: '#9A8420' },
  air: { soft: '#DCEFEE', strong: '#3B8B89' },
  water: { soft: '#DEDCF7', strong: '#1F18C0' },
};

export const aspectColors = {
  soft: '#3B8B89', // flowing — aqua
  hard: '#8A4C00', // tense — brown
  neutral: '#5A7A8A', // navy, lightened
};

/**
 * Instrument Serif, one weight. There is no italic anywhere in the app, so
 * every alias resolves to the single regular face; the names are kept so call
 * sites still read by intent.
 */
export const fonts = {
  light: 'InstrumentSerif',
  regular: 'InstrumentSerif',
  medium: 'InstrumentSerif',
  semibold: 'InstrumentSerif',
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
  /** Every page headline is this size, centred, with nothing above it. */
  pageTitle: 34,
};

export const radii = {
  sm: 10,
  md: 14, // inset blocks inside a card
  lg: 20, // every card-level surface, so nothing looks rounder than its neighbour
  xl: 28,
};

export const spacing = (n: number) => n * 8;

/** Wide, faint, and low — cards float rather than sit in a box. */
export const softShadow = {
  shadowColor: '#4A5560',
  shadowOpacity: 0.1,
  shadowRadius: 22,
  shadowOffset: { width: 0, height: 8 },
  elevation: 2,
};
