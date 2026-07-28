import { UIKey } from './i18n/strings';

export type TabKey = 'portrait' | 'chart' | 'sky' | 'houses' | 'aspects' | 'family';

/**
 * The letter comes first: it is the whole chart in plain words, and it is the
 * way in for anyone who has never read one. The detail tabs follow.
 */
export const TABS: Array<{ key: TabKey; label: UIKey; glyph: string }> = [
  // U+2756 rather than a pencil: it has no emoji form to fall back to, and it
  // stays legible at menu size.
  { key: 'portrait', label: 'navPortrait', glyph: '❖' },
  { key: 'chart', label: 'navChart', glyph: '✧' },
  { key: 'sky', label: 'navSky', glyph: '☾' },
  { key: 'houses', label: 'navHouses', glyph: '⌂' },
  { key: 'aspects', label: 'navAspects', glyph: '△' },
  { key: 'family', label: 'navFamily', glyph: '♡' },
];

/** Passed to every screen so each one can render the menu at its own end. */
export type NavProps = {
  tab: TabKey;
  onNavigate: (tab: TabKey) => void;
};
