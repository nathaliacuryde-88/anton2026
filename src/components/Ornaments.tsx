import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

import { colors } from '../theme/theme';
import { Float, Pop, SpinForever } from './motion';

/**
 * The two small illustrations that overlap the edge of the portrait photo —
 * a sunburst and a crescent moon with a star, always in the app's own blue.
 * Each settles in on mount and then keeps a small, slow motion of its own,
 * so the photo doesn't sit inside a static frame.
 */
export function SunburstOrnament({
  size = 64,
  color = colors.blue,
}: {
  size?: number;
  color?: string;
}) {
  const rays = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * Math.PI) / 4;
    const len = i % 2 === 0 ? 46 : 34;
    const x2 = 50 + Math.cos(angle) * len;
    const y2 = 50 + Math.sin(angle) * len;
    return { x2, y2, w: i % 2 === 0 ? 7 : 4.5 };
  });

  return (
    <Pop delay={180} duration={640}>
      <SpinForever periodMs={30000}>
        <Svg width={size} height={size} viewBox="0 0 100 100">
          {rays.map((r, i) => (
            <Path
              key={i}
              d={`M50 50 L${r.x2.toFixed(2)} ${r.y2.toFixed(2)}`}
              stroke={color}
              strokeWidth={r.w}
              strokeLinecap="round"
            />
          ))}
          <Circle cx={50} cy={50} r={15} fill={color} />
        </Svg>
      </SpinForever>
    </Pop>
  );
}

export function MoonStarOrnament({
  size = 64,
  color = colors.blue,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Pop delay={360} duration={640}>
      <Float periodMs={3800} distance={4}>
        <Svg width={size} height={size} viewBox="0 0 100 100">
          <Path
            d="M87.5 53.29A37.5 37.5 0 1 1 46.7 12.5 29.17 29.17 0 0 0 87.5 53.29Z"
            fill={color}
          />
          <Path d="M22 12L26 22L36 26L26 30L22 40L18 30L8 26L18 22Z" fill={color} />
        </Svg>
      </Float>
    </Pop>
  );
}
