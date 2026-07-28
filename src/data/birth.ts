import { BirthData } from '../astro/engine';

/**
 * Anton's birth data.
 *
 * Germany observes Central European Summer Time (UTC+2) in July, so 12:45
 * local is 10:45 UTC.
 *
 * On the coordinates: these are Filderstadt itself, roughly 48°40′N 9°13′E,
 * rather than the exact street address. That is deliberate. Sweeping the
 * coordinates across the entire town — every district, corner to corner —
 * moves the Ascendant by at most 2.3 arcminutes and the Midheaven by 4.0, and
 * changes the house of precisely nothing. The chart you can actually read is
 * identical anywhere in Filderstadt, so there is no reason to publish a
 * family's home address to get it. (Verify with `npm run chart` after editing.)
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
    de: 'Filderstadt, Deutschland',
  },
};
