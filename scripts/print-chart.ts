/**
 * Prints the computed natal chart to the terminal.
 *
 * Handy for checking the engine's output against any other ephemeris without
 * having to launch the app:
 *
 *   npm run chart
 */

import {
  ASPECTS,
  BODIES,
  BODY_KEYS,
  SIGNS,
} from '../src/astro/constants';
import { computeChart, formatDegree } from '../src/astro/engine';
import { ANTON } from '../src/data/birth';

const chart = computeChart(ANTON);

const label = (key: string) =>
  key === 'asc'
    ? 'Ascendant'
    : key === 'mc'
      ? 'Midheaven'
      : BODIES[key as keyof typeof BODIES].name.en;

console.log(`\n${chart.birth.name}`);
console.log(
  `${chart.birth.day}.${chart.birth.month}.${chart.birth.year}  ` +
    `${String(chart.birth.hour).padStart(2, '0')}:${String(chart.birth.minute).padStart(2, '0')} ` +
    `${chart.birth.tzLabel}  ·  ${chart.birth.place.en}`,
);
console.log(
  `UTC ${chart.utcDate.toISOString()}  ·  JD ${chart.jdUT.toFixed(5)}  ·  ` +
    `RAMC ${chart.ramc.toFixed(4)}°  ·  ε ${chart.obliquity.toFixed(5)}°`,
);
console.log(
  `houses: ${chart.houseSystem}  ·  ${chart.dayChart ? 'day chart' : 'night chart'}\n`,
);

console.log('POSITIONS');
for (const key of BODY_KEYS) {
  const p = chart.placements[key];
  console.log(
    '  ' +
      BODIES[key].name.en.padEnd(16) +
      `${formatDegree(p.degreeInSign)} ${SIGNS[p.signIndex].name.en}`.padEnd(22) +
      `house ${String(p.house).padStart(2)}  ` +
      (p.retrograde ? 'Rx ' : '   ') +
      `${p.speed >= 0 ? '+' : ''}${p.speed.toFixed(4)}°/day`,
  );
}

console.log('\nHOUSE CUSPS');
chart.cusps.forEach((cusp, i) => {
  const s = Math.floor(cusp / 30);
  console.log(
    '  ' +
      `${i + 1}`.padStart(2) +
      '  ' +
      `${formatDegree(cusp - s * 30)} ${SIGNS[s].name.en}`,
  );
});

console.log('\nBALANCE');
console.log('  elements  ', JSON.stringify(chart.elementCounts));
console.log('  modalities', JSON.stringify(chart.modalityCounts));

console.log(`\nASPECTS (${chart.aspects.length})`);
for (const a of chart.aspects) {
  console.log(
    '  ' +
      label(a.a).padEnd(15) +
      ASPECTS.find((x) => x.key === a.key)!.name.en.padEnd(13) +
      label(a.b).padEnd(15) +
      `orb ${a.orb.toFixed(2)}°  ` +
      (a.applying ? 'applying' : 'separating'),
  );
}
console.log();
