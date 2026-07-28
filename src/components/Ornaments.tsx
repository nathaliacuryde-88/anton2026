import React from 'react';
import { Image } from 'react-native';

import { Float, Pop, SpinForever } from './motion';

const SUN = require('../../assets/ornament-sun.png');
const MOON = require('../../assets/ornament-moon.png');

/**
 * The two small illustrations that overlap the edge of the portrait photo —
 * Anton's own sunburst and crescent-moon-with-star artwork. Each settles in
 * on mount and then keeps a small, slow motion of its own, so the photo
 * doesn't sit inside a static frame.
 */
export function SunburstOrnament({ size = 64 }: { size?: number }) {
  return (
    <Pop delay={180} duration={640}>
      <SpinForever periodMs={30000}>
        <Image source={SUN} resizeMode="contain" style={{ width: size, height: size }} />
      </SpinForever>
    </Pop>
  );
}

export function MoonStarOrnament({ size = 64 }: { size?: number }) {
  return (
    <Pop delay={360} duration={640}>
      <Float periodMs={3800} distance={4}>
        <Image source={MOON} resizeMode="contain" style={{ width: size, height: size }} />
      </Float>
    </Pop>
  );
}
