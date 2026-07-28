import { BirthData } from '../astro/engine';

/**
 * Anton's birth data.
 *
 * Filderstadt sits at roughly 48°40′N 9°13′E. Germany observes Central
 * European Summer Time (UTC+2) in July, so 12:45 local is 10:45 UTC.
 */
export const ANTON: BirthData = {
  name: 'Anton Duque Estrada',
  year: 2026,
  month: 7,
  day: 26,
  hour: 12,
  minute: 45,
  tzOffset: 2,
  tzLabel: 'CEST · UTC+2',
  latitude: 48.6667,
  longitude: 9.2167,
  place: {
    en: 'Filderstadt, Germany',
    pt: 'Filderstadt, Alemanha',
  },
};
