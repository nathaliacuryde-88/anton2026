import { Element } from '../astro/constants';

/**
 * Palette — a periwinkle wash with the app's own blue as its one loud voice,
 * and a bright cyan reserved for the one real photograph in the app.
 *
 * Blue is the interface talking: headlines, eyebrows, the divider star's
 * neighbour, every info pill, the active tab. Cyan marks anything meant to
 * feel like a frame around real content — a card's outline, the ring around
 * Anton's photo. Periwinkle is the quieter accent: the divider's star, soft
 * washes and borders. Ink and muted text are both drawn from the same
 * blue-leaning dark, so even body copy belongs to this family.
 */
const PAPER = '#D5DAFD';
const BLUE = '#1A17C4';
const INK = '#182042';
const MUTED = '#626B8F';
const MUTED_FAINT = '#8890AC';
const CYAN = '#8BFFF3';
const CYAN_SOFT = '#BDFFFD';
const CYAN_BRIGHT = '#3BFFFF';
const PERIWINKLE = '#6E73E5';
const PERIWINKLE_SOFT = '#D2CEFC';
const TEAL = '#14A398';

export const colors = {
  // page + surfaces
  yellow: PAPER, // kept as the root-background token name; the wash is periwinkle now
  paper: PAPER,
  paperDeep: CYAN_SOFT, // the soft inset used inside a card (a "quiet" box, a chip)
  card: '#FFFFFF',
  cardTint: '#E9ECFE', // a faint periwinkle wash, for a card that wants to feel a touch softer than white
  cardWarm: '#FFFFFF', // no separate "angular" tint any more — the tag chip alone marks it

  // ink — dark and blue-leaning, not the old olive
  ink: INK,
  inkSoft: MUTED,
  inkFaint: MUTED_FAINT,
  hairline: PERIWINKLE_SOFT,

  /** The app's own voice: headlines, eyebrows, pills, active states. */
  blue: BLUE,
  accent: BLUE,
  accentSoft: PERIWINKLE_SOFT,

  /** The frame colours — a card's outline, and the brighter ring for a photo. */
  cyan: CYAN,
  cyanSoft: CYAN_SOFT,
  cyanBright: CYAN_BRIGHT,

  /** The quieter accent: the divider's star, soft tag borders. */
  periwinkle: PERIWINKLE,
  periwinkleSoft: PERIWINKLE_SOFT,

  // small marks
  rose: '#8A3F66',
  blush: '#F0DDEA',

  /** The one solid-fill "voice" colour, used for every info pill and highlight. */
  vivid: BLUE,
  vividGreen: BLUE,
  vividPeriwinkle: BLUE,
  vividOlive: BLUE,
  onVivid: '#FFFFFF',
  onVividMuted: 'rgba(255,255,255,0.82)',
  onVividChip: 'rgba(255,255,255,0.18)',

  /** The divider's line — a pale wash of periwinkle. */
  dividerLine: PERIWINKLE_SOFT,
};

/**
 * One element per available hue in this palette: blue for fire, a cool
 * muted grey for earth, periwinkle for air, teal for water. `soft` sits
 * light enough behind a glyph; `strong` is dark enough to read on paper.
 */
export const elementColors: Record<Element, { soft: string; strong: string }> = {
  fire: { soft: '#DEDCFA', strong: BLUE },
  earth: { soft: '#E6E8F2', strong: '#4B5170' },
  air: { soft: '#ECEBFE', strong: PERIWINKLE },
  water: { soft: '#D8FFFB', strong: TEAL },
};

export const aspectColors = {
  soft: TEAL, // flowing
  hard: INK, // tense
  neutral: PERIWINKLE,
};

/**
 * Fraunces — a real weight range. Headlines lean on the lighter end for an
 * editorial feel; small labels and inline emphasis use the heavier end for
 * genuine bold rather than a faked one.
 */
export const fonts = {
  light: 'Fraunces300',
  regular: 'Fraunces400',
  medium: 'Fraunces500',
  semibold: 'Fraunces600',
  bold: 'Fraunces700',
};

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
  pill: 999, // the fully-rounded info pill
};

export const spacing = (n: number) => n * 8;

/** Very soft and low — barely a shadow, just enough lift off the page. */
export const softShadow = {
  shadowColor: '#171449',
  shadowOpacity: 0.06,
  shadowRadius: 16,
  shadowOffset: { width: 0, height: 5 },
  elevation: 1,
};
