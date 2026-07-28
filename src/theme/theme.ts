import { Element } from '../astro/constants';

/**
 * A soft pastel palette: warm paper, dusty rose, powder blue, sage and
 * lavender, with a muted gold for accents. Nothing fully saturated.
 */
export const colors = {
  // surfaces
  paper: '#FDF8F4',
  paperDeep: '#F6EFE8',
  card: '#FFFFFF',
  cardTint: '#FBF6F2',

  // ink
  ink: '#4C4455',
  inkSoft: '#7E7589',
  inkFaint: '#A79EAF',
  hairline: '#EADFD6',

  // pastels
  blush: '#F4D8DC',
  rose: '#E3ADB7',
  sky: '#D5E4F0',
  blue: '#A6C4DC',
  mint: '#D6E7DC',
  green: '#A8C9B4',
  lavender: '#DFD6EE',
  violet: '#B6A6D2',
  butter: '#F7E7C7',
  gold: '#C6A667',

  night: '#3B3446',
};

/** Element colours, used for sign sectors in the wheel and for chips. */
export const elementColors: Record<Element, { soft: string; strong: string }> = {
  fire: { soft: '#F7DDD2', strong: '#D9A088' },
  earth: { soft: '#E0EAD4', strong: '#9DB483' },
  air: { soft: '#DEE9F4', strong: '#8FB0CD' },
  water: { soft: '#E1DAF0', strong: '#9E8CC4' },
};

export const aspectColors = {
  soft: '#9BBFD4',
  hard: '#DFA9B2',
  neutral: '#C5B08A',
};

/**
 * Cormorant Garamond throughout. `fonts.serif` names are registered in App.tsx;
 * `system` is kept for the astrological glyphs, which the Cormorant files do
 * not contain and which need to fall back to the platform symbol font.
 */
export const fonts = {
  light: 'Cormorant300',
  regular: 'Cormorant400',
  medium: 'Cormorant500',
  semibold: 'Cormorant600',
  italic: 'Cormorant400Italic',
  lightItalic: 'Cormorant300Italic',
};

export const radii = {
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
};

export const spacing = (n: number) => n * 8;

/** A soft, wide, very low-opacity shadow — barely there. */
export const softShadow = {
  shadowColor: '#8C7B6B',
  shadowOpacity: 0.13,
  shadowRadius: 18,
  shadowOffset: { width: 0, height: 6 },
  elevation: 3,
};
