import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

// Anton's own hand-drawn zodiac illustrations, one per sign, each at its
// native pixel size so a size prop can scale it without distorting it.
const SOURCES: Record<string, { src: number; w: number; h: number }> = {
  aries: { src: require('../../assets/zodiac-aries.png'), w: 284, h: 195 },
  taurus: { src: require('../../assets/zodiac-taurus.png'), w: 213, h: 181 },
  gemini: { src: require('../../assets/zodiac-gemini.png'), w: 234, h: 187 },
  cancer: { src: require('../../assets/zodiac-cancer.png'), w: 221, h: 215 },
  leo: { src: require('../../assets/zodiac-leo.png'), w: 244, h: 224 },
  virgo: { src: require('../../assets/zodiac-virgo.png'), w: 212, h: 201 },
  libra: { src: require('../../assets/zodiac-libra.png'), w: 164, h: 219 },
  scorpio: { src: require('../../assets/zodiac-scorpio.png'), w: 228, h: 196 },
  sagittarius: { src: require('../../assets/zodiac-sagittarius.png'), w: 244, h: 233 },
  capricorn: { src: require('../../assets/zodiac-capricorn.png'), w: 221, h: 228 },
  aquarius: { src: require('../../assets/zodiac-aquarius.png'), w: 198, h: 213 },
  pisces: { src: require('../../assets/zodiac-pisces.png'), w: 238, h: 239 },
};

/**
 * Anton's own hand-drawn constellation for the given sign — a real
 * illustration, not a generated one. `size` sets the height; width follows
 * the artwork's own proportions so nothing gets stretched.
 */
export default function Constellation({
  sign,
  size = 56,
  style,
}: {
  sign: string;
  size?: number;
  style?: StyleProp<ImageStyle>;
}) {
  const def = SOURCES[sign];
  if (!def) return null;
  const width = size * (def.w / def.h);

  return (
    <Image
      source={def.src}
      resizeMode="contain"
      style={[{ width, height: size }, style]}
    />
  );
}
