import React from 'react';
import Svg, { Circle, Line } from 'react-native-svg';

import { CONSTELLATIONS } from '../content/constellations';
import { colors } from '../theme/theme';

/**
 * A small stylised constellation for the given sign, drawn as dots and
 * connecting lines — a decorative touch, always in the app's own blue.
 */
export default function Constellation({
  sign,
  size = 56,
  color = colors.blue,
}: {
  sign: string;
  size?: number;
  color?: string;
}) {
  const def = CONSTELLATIONS[sign];
  if (!def) return null;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {def.edges.map(([a, b], i) => {
        const [x1, y1] = def.points[a];
        const [x2, y2] = def.points[b];
        return (
          <Line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth={1.6}
            strokeLinecap="round"
            opacity={0.55}
          />
        );
      })}
      {def.points.map(([x, y, mag], i) => (
        <Circle key={i} cx={x} cy={y} r={2.4 + mag * 4.2} fill={color} />
      ))}
    </Svg>
  );
}
