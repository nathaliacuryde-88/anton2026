import React, { useMemo } from 'react';
import Svg, {
  Circle,
  Defs,
  G,
  Line,
  Path,
  RadialGradient,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

import {
  ASPECTS,
  BODIES,
  BodyKey,
  SIGNS,
} from '../astro/constants';
import { Chart, norm360 } from '../astro/engine';
import { aspectColors, colors, elementColors, fonts } from '../theme/theme';

type Props = {
  chart: Chart;
  size: number;
  /** Bodies to draw. Defaults to everything the chart computed. */
  bodies?: BodyKey[];
  onSelectBody?: (key: BodyKey) => void;
  selected?: BodyKey | null;
};

const RING = {
  outer: 1.0,
  signInner: 0.845,
  tick: 0.815,
  glyph: 0.7,
  houseOuter: 0.6,
  aspectCircle: 0.5,
};

/**
 * A traditional wheel: Ascendant on the left, Midheaven at the top, zodiacal
 * longitude increasing counter-clockwise. In SVG the y axis points down, so
 * increasing longitude means a decreasing screen angle.
 */
function makeProjection(ascLon: number, cx: number, cy: number) {
  const angleOf = (lon: number) => 180 - (norm360(lon) - ascLon);
  const point = (lon: number, radius: number) => {
    const a = angleOf(lon) * (Math.PI / 180);
    return { x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a) };
  };
  return { angleOf, point };
}

/** Annular sector path, used for the twelve coloured sign bands. */
function annularSector(
  cx: number,
  cy: number,
  rInner: number,
  rOuter: number,
  a0: number,
  a1: number,
): string {
  const rad = (d: number) => d * (Math.PI / 180);
  const p = (r: number, a: number) => `${cx + r * Math.cos(rad(a))},${cy + r * Math.sin(rad(a))}`;
  // Angles decrease as longitude increases, so sweep flags run "backwards".
  // a0/a1 arrive unwrapped, so their raw difference is the true swept angle.
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  return [
    `M ${p(rOuter, a0)}`,
    `A ${rOuter} ${rOuter} 0 ${large} 0 ${p(rOuter, a1)}`,
    `L ${p(rInner, a1)}`,
    `A ${rInner} ${rInner} 0 ${large} 1 ${p(rInner, a0)}`,
    'Z',
  ].join(' ');
}

/**
 * Spreads glyphs that would otherwise overlap.
 *
 * Bodies are kept in zodiacal order and pushed apart until each is at least
 * `minGap` degrees from its neighbours, then the whole run is re-centred on
 * where it started so the cluster still points at the right part of the sky.
 */
function spreadGlyphs(lons: number[], minGap: number): number[] {
  const n = lons.length;
  if (n < 2) return [...lons];

  const order = lons.map((lon, i) => ({ lon, i })).sort((a, b) => a.lon - b.lon);
  const adjusted = order.map((o) => o.lon);

  for (let pass = 0; pass < 80; pass++) {
    let moved = false;
    for (let k = 0; k < n; k++) {
      const j = (k + 1) % n;
      let gap = adjusted[j] - adjusted[k];
      if (j === 0) gap += 360; // wrap-around pair
      if (gap < minGap) {
        const push = (minGap - gap) / 2;
        adjusted[k] -= push;
        adjusted[j] += push;
        moved = true;
      }
    }
    if (!moved) break;
  }

  const result = new Array<number>(n);
  order.forEach((o, idx) => {
    result[o.i] = norm360(adjusted[idx]);
  });
  return result;
}

export default function ChartWheel({
  chart,
  size,
  bodies,
  onSelectBody,
  selected = null,
}: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2 - 2;
  const { angleOf, point } = useMemo(
    () => makeProjection(chart.asc, cx, cy),
    [chart.asc, cx, cy],
  );

  const keys = bodies ?? (Object.keys(chart.placements) as BodyKey[]);

  // Glyph placement, de-overlapped.
  const placedLons = useMemo(() => {
    const raw = keys.map((k) => chart.placements[k].lon);
    // ~13px of arc at the glyph radius, expressed in degrees.
    const minGap = (13 / (R * RING.glyph)) * (180 / Math.PI);
    return spreadGlyphs(raw, minGap);
  }, [keys, chart.placements, R]);

  return (
    <Svg width={size} height={size}>
      <Defs>
        <RadialGradient id="core" cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor={colors.card} stopOpacity="1" />
          <Stop offset="100%" stopColor={colors.cardTint} stopOpacity="1" />
        </RadialGradient>
      </Defs>

      {/* paper */}
      <Circle cx={cx} cy={cy} r={R} fill="url(#core)" />

      {/* --- sign band --- */}
      {SIGNS.map((sign, i) => {
        const start = i * 30;
        // Taking the end angle as a0 - 30 rather than angleOf(start + 30)
        // keeps the pair unwrapped: angleOf normalises its input, so the
        // Pisces band would otherwise wrap to 0 and sweep the long way round.
        const a0 = angleOf(start);
        const a1 = a0 - 30;
        const mid = start + 15;
        const g = point(mid, R * 0.925);
        return (
          <G key={sign.key}>
            <Path
              d={annularSector(cx, cy, R * RING.signInner, R * RING.outer, a0, a1)}
              fill={elementColors[sign.element].soft}
              stroke={colors.card}
              strokeWidth={1}
            />
            <SvgText
              x={g.x}
              y={g.y + R * 0.038}
              fontSize={R * 0.105}
              fill={elementColors[sign.element].strong}
              textAnchor="middle"
            >
              {sign.glyph}
            </SvgText>
          </G>
        );
      })}

      {/* degree ticks: every 5°, longer every 30° */}
      {Array.from({ length: 72 }, (_, i) => i * 5).map((deg) => {
        const isSignStart = deg % 30 === 0;
        const outer = point(deg, R * RING.signInner);
        const inner = point(deg, R * (isSignStart ? RING.aspectCircle : RING.tick));
        return (
          <Line
            key={deg}
            x1={outer.x}
            y1={outer.y}
            x2={inner.x}
            y2={inner.y}
            stroke={isSignStart ? colors.hairline : colors.hairline}
            strokeWidth={isSignStart ? 1 : 0.6}
            opacity={isSignStart ? 0.9 : 0.5}
          />
        );
      })}

      {/* --- house cusps --- */}
      {chart.cusps.map((cusp, i) => {
        const isAngle = i === 0 || i === 3 || i === 6 || i === 9;
        const a = point(cusp, R * RING.signInner);
        const b = point(cusp, R * RING.aspectCircle);
        // House number sits in the middle of the house.
        const next = chart.cusps[(i + 1) % 12];
        const span = norm360(next - cusp);
        const numberAt = point(cusp + span / 2, R * 0.555);
        return (
          <G key={`cusp-${i}`}>
            <Line
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={isAngle ? colors.gold : colors.inkFaint}
              strokeWidth={isAngle ? 1.6 : 0.8}
              opacity={isAngle ? 0.85 : 0.45}
              strokeDasharray={isAngle ? undefined : '3 4'}
            />
            <SvgText
              x={numberAt.x}
              y={numberAt.y + R * 0.022}
              fontSize={R * 0.058}
              fontFamily={fonts.regular}
              fill={colors.inkFaint}
              textAnchor="middle"
            >
              {i + 1}
            </SvgText>
          </G>
        );
      })}

      {/* --- aspect lines --- */}
      <Circle
        cx={cx}
        cy={cy}
        r={R * RING.aspectCircle}
        fill={colors.card}
        stroke={colors.hairline}
        strokeWidth={1}
      />
      {chart.aspects
        .filter((a) => a.a !== 'asc' && a.a !== 'mc' && a.b !== 'asc' && a.b !== 'mc')
        .map((aspect, i) => {
          const def = ASPECTS.find((d) => d.key === aspect.key)!;
          const p = point(chart.placements[aspect.a as BodyKey].lon, R * RING.aspectCircle);
          const q = point(chart.placements[aspect.b as BodyKey].lon, R * RING.aspectCircle);
          const involved = selected && (aspect.a === selected || aspect.b === selected);
          return (
            <Line
              key={`asp-${i}`}
              x1={p.x}
              y1={p.y}
              x2={q.x}
              y2={q.y}
              stroke={aspectColors[def.tone]}
              strokeWidth={involved ? 1.8 : 1}
              // Tight aspects are drawn more strongly than wide ones.
              opacity={
                selected && !involved ? 0.08 : 0.28 + (1 - aspect.looseness) * 0.5
              }
            />
          );
        })}

      {/* --- bodies --- */}
      {keys.map((key, idx) => {
        const p = chart.placements[key];
        const def = BODIES[key];
        const drawLon = placedLons[idx];
        const glyphAt = point(drawLon, R * RING.glyph);
        const trueAt = point(p.lon, R * RING.tick);
        const elbow = point(drawLon, R * (RING.glyph + 0.062));
        const isSelected = selected === key;
        return (
          <G key={key} onPress={onSelectBody ? () => onSelectBody(key) : undefined}>
            {/* leader line back to the true degree */}
            <Line
              x1={trueAt.x}
              y1={trueAt.y}
              x2={elbow.x}
              y2={elbow.y}
              stroke={colors.inkFaint}
              strokeWidth={0.7}
              opacity={0.5}
            />
            {isSelected && (
              <Circle
                cx={glyphAt.x}
                cy={glyphAt.y}
                r={R * 0.062}
                fill={colors.butter}
                opacity={0.85}
              />
            )}
            <SvgText
              x={glyphAt.x}
              y={glyphAt.y + R * 0.032}
              fontSize={R * (def.point ? 0.072 : 0.088)}
              fill={def.point ? colors.inkFaint : colors.ink}
              opacity={def.point ? 0.75 : 1}
              textAnchor="middle"
            >
              {def.glyph}
            </SvgText>
            {p.retrograde && !def.point && (
              <SvgText
                x={glyphAt.x + R * 0.062}
                y={glyphAt.y + R * 0.052}
                fontSize={R * 0.045}
                fontFamily={fonts.regular}
                fill={colors.rose}
                textAnchor="middle"
              >
                ℞
              </SvgText>
            )}
          </G>
        );
      })}

      {/* --- angle labels --- */}
      {(
        [
          ['ASC', chart.asc],
          ['MC', chart.mc],
          ['DSC', norm360(chart.asc + 180)],
          ['IC', norm360(chart.mc + 180)],
        ] as const
      ).map(([name, lon]) => {
        const at = point(lon, R * 0.455);
        return (
          <SvgText
            key={name}
            x={at.x}
            y={at.y + R * 0.018}
            fontSize={R * 0.05}
            fontFamily={fonts.semibold}
            fill={colors.gold}
            textAnchor="middle"
          >
            {name}
          </SvgText>
        );
      })}

      {/* centre ornament */}
      <Circle cx={cx} cy={cy} r={R * 0.03} fill={colors.butter} />
      <Circle
        cx={cx}
        cy={cy}
        r={R * 0.055}
        fill="none"
        stroke={colors.gold}
        strokeWidth={0.8}
        opacity={0.5}
      />
      <Circle
        cx={cx}
        cy={cy}
        r={R}
        fill="none"
        stroke={colors.hairline}
        strokeWidth={1.5}
      />
    </Svg>
  );
}
