import { Element } from '../astro/constants';

/**
 * Palette — the five exact swatches, plus what has to be derived from them.
 *
 * Yellow is the page itself. Blue is reserved for the app's own voice: eyebrows,
 * headlines, the divider, the active tab, the constellation illustrations —
 * anything that is the interface talking, rather than content. Green,
 * periwinkle and olive are the three "vivid" card colours, rotated across the
 * info asides so they read as a family of moments rather than one repeated
 * block. Ink is drawn straight from the olive swatch, so even the body text
 * belongs to this palette.
 */
const PRIMARY_YELLOW = '#FDFCD5';
const PRIMARY_BLUE = '#1F18C0';
const OLIVE = '#2C2B02';
const PERIWINKLE = '#6F73E2';
const GREEN = '#359260';

export const colors = {
  // the five swatches, unaltered
  yellow: PRIMARY_YELLOW,
  blue: PRIMARY_BLUE,
  olive: OLIVE,
  periwinkle: PERIWINKLE,
  green: GREEN,

  // paper — the yellow, opened up into surfaces
  paper: PRIMARY_YELLOW,
  paperDeep: '#F5EFA8',
  card: '#FFFDF0',
  cardTint: '#FBF6D9',
  cardWarm: '#F7EFC0', // a touch deeper than `card`, for an angular house

  // ink — taken straight from the olive swatch
  ink: OLIVE,
  inkSoft: '#5B5A2E',
  inkFaint: '#93916A',
  hairline: '#EDE6A6',

  /** The app's own voice: eyebrows, headlines, dividers, active states. */
  accent: PRIMARY_BLUE,
  accentSoft: '#DCDBF6',

  // small marks
  rose: OLIVE,
  blush: '#E7E5A0',

  /**
   * The three vivid card colours, rotated across Explainer and other
   * "aside" surfaces so the app doesn't read as one colour repeated. All take
   * the same near-white text.
   */
  vivid: PRIMARY_BLUE,
  vividGreen: GREEN,
  vividPeriwinkle: PERIWINKLE,
  vividOlive: OLIVE,
  onVivid: '#FCFBFF',
  onVividMuted: 'rgba(252,251,255,0.85)',
  onVividChip: 'rgba(255,255,255,0.18)',

  /** The divider's line — a pale wash of the accent blue. */
  dividerLine: '#D6D4F4',
};

/** The rotation Explainer and other aside cards cycle through. */
export const VIVID_ROTATION = [colors.vividGreen, colors.vividPeriwinkle, colors.vividOlive];

/**
 * One element per secondary swatch: olive for fire, yellow for earth,
 * periwinkle for air, green for water. `soft` sits light enough behind a
 * glyph; `strong` is dark enough to read on paper.
 */
export const elementColors: Record<Element, { soft: string; strong: string }> = {
  fire: { soft: '#EDE9C4', strong: OLIVE },
  earth: { soft: '#F7F0A0', strong: '#8A7A00' },
  air: { soft: '#E1E0F8', strong: PERIWINKLE },
  water: { soft: '#D9EDE1', strong: GREEN },
};

export const aspectColors = {
  soft: GREEN, // flowing
  hard: OLIVE, // tense
  neutral: PERIWINKLE,
};

/**
 * Fraunces — a real weight range, unlike the single-weight face it replaces.
 * Headlines lean on the lighter end for an editorial feel; small labels and
 * inline emphasis use the heavier end for genuine bold rather than a faked one.
 */
export const fonts = {
  light: 'Fraunces300',
  regular: 'Fraunces400',
  medium: 'Fraunces500',
  semibold: 'Fraunces600',
  bold: 'Fraunces700',
};

/**
 * Fraunces sets a little more open than Instrument Serif did. Display sizes
 * keep a light negative tracking; body copy keeps its generous leading.
 */
export const typography = {
  displayTracking: -0.4,
  bodyLineHeight: 1.55,
  eyebrowTracking: 2.4,
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

/** Very soft and low — barely a shadow, just enough lift off the page. */
export const softShadow = {
  shadowColor: '#4A4408',
  shadowOpacity: 0.07,
  shadowRadius: 16,
  shadowOffset: { width: 0, height: 5 },
  elevation: 1,
};
