import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

import { TabKey } from '../navigation';

/**
 * One icon per tab, drawn once and rendered two ways: an outline for the
 * inactive state, a solid fill for the active one — the same shape either
 * way, so switching tabs never redraws anything, it just fills in.
 */
export default function TabIcon({
  kind,
  size = 22,
  color,
  filled,
}: {
  kind: TabKey;
  size?: number;
  color: string;
  filled: boolean;
}) {
  const shape = filled
    ? { fill: color, stroke: 'none' as const }
    : {
        fill: 'none' as const,
        stroke: color,
        strokeWidth: 1.8,
        strokeLinejoin: 'round' as const,
        strokeLinecap: 'round' as const,
      };

  switch (kind) {
    case 'portrait':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Circle cx={12} cy={8} r={3.6} {...shape} />
          <Path d="M4.5 20c0-4.4 3.4-6.7 7.5-6.7s7.5 2.3 7.5 6.7" {...shape} />
        </Svg>
      );
    case 'chart':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Circle cx={12} cy={12} r={8.2} {...shape} />
          <Path
            d="M12 3.2V6.2M12 17.8V20.8M3.2 12H6.2M17.8 12H20.8"
            stroke={filled ? '#FFFFFF' : color}
            strokeWidth={1.6}
            strokeLinecap="round"
          />
        </Svg>
      );
    case 'sky':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M20 14.3A8.4 8.4 0 1 1 9.7 4a6.9 6.9 0 0 0 10.3 10.3Z" {...shape} />
        </Svg>
      );
    case 'houses':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M4 11.3 12 4l8 7.3V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" {...shape} />
          {!filled && (
            <Path d="M9.5 21v-6.5h5V21" stroke={color} strokeWidth={1.8} fill="none" />
          )}
        </Svg>
      );
    case 'aspects':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M12 4.2 21 20H3Z" {...shape} />
        </Svg>
      );
    case 'family':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path
            d="M12 20.3S3.4 15.2 3.4 9.3A4.4 4.4 0 0 1 12 6.9a4.4 4.4 0 0 1 8.6 2.4C20.6 15.2 12 20.3 12 20.3Z"
            {...shape}
          />
        </Svg>
      );
  }
}
