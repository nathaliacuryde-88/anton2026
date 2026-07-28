import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors } from '../theme/theme';

export type ThemeIconKind = 'sparkle' | 'summit' | 'heart';

const PATHS: Record<ThemeIconKind, React.ReactNode> = {
  sparkle: (
    <>
      <Path d="M50 6C52 30 58 46 74 50C58 54 52 70 50 94C48 70 42 54 26 50C42 46 48 30 50 6Z" />
      <Path d="M82 16L85 26L95 29L85 32L82 42L79 32L69 29L79 26Z" />
    </>
  ),
  summit: <Path d="M8 82L34 36L50 60L66 20L92 82Z" />,
  heart: (
    <Path d="M50 88C25 70 8 54 8 34.5 8 20 19.5 9 33 9c8 0 14.5 4 17 10 2.5-6 9-10 17-10 13.5 0 25 11 25 25.5C92 54 75 70 50 88Z" />
  ),
};

/**
 * Simple, single-shape illustrations for the sections of the letter that
 * aren't about one particular sign — a highlight, a calling, a closing.
 * Solid and always the app's own blue, like an emoji stripped down to one
 * plain shape rather than a full illustration.
 */
export default function ThemeIcon({
  kind,
  size = 40,
  color = colors.blue,
  style,
}: {
  kind: ThemeIconKind;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill={color} style={style}>
      {PATHS[kind]}
    </Svg>
  );
}
