import { UIKey } from './i18n/strings';

export type TabKey = 'portrait' | 'chart' | 'sky' | 'houses' | 'aspects' | 'family';

/**
 * The letter comes first: it is the whole chart in plain words, and it is the
 * way in for anyone who has never read one. The detail tabs follow.
 */
export const TABS: Array<{ key: TabKey; label: UIKey }> = [
  { key: 'portrait', label: 'navPortrait' },
  { key: 'chart', label: 'navChart' },
  { key: 'sky', label: 'navSky' },
  { key: 'houses', label: 'navHouses' },
  { key: 'aspects', label: 'navAspects' },
  { key: 'family', label: 'navFamily' },
];

/** Passed to every screen so each one can render the menu at its own end. */
export type NavProps = {
  tab: TabKey;
  onNavigate: (tab: TabKey) => void;
};
