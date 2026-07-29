import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, PanResponder, StyleSheet, View } from 'react-native';

import { colors, radii, softShadow, spacing } from '../theme/theme';

const PHOTOS = [
  require('../../assets/family-1.jpeg'),
  require('../../assets/family-2.jpeg'),
  require('../../assets/family-3.jpeg'),
  require('../../assets/family-4.jpeg'),
];

// Fixed per-slot tilt and lift for the cards waiting behind the front one,
// so the pile reads as loosely stacked prints rather than a neat deck.
const SLOTS = [
  { rotate: '0deg', translateY: 0, scale: 1 },
  { rotate: '-6deg', translateY: 10, scale: 0.97 },
  { rotate: '5deg', translateY: 18, scale: 0.94 },
];

// The Polaroid-style frame around each photo. Passed explicitly to the
// Image below rather than `flex: 1` — react-native-web's Image sizes
// itself from the source's natural pixel dimensions unless given a
// definite width/height, flex included.
const FRAME_PAD = spacing(0.75);
const FRAME_PAD_BOTTOM = spacing(2);

/**
 * A small pile of real photos — the parents with Anton — that advances on
 * its own every few seconds, and can also be swiped through by hand. Only
 * the front card is ever draggable; the rest sit still underneath at a
 * fixed tilt until their turn comes to the top.
 */
export default function PhotoStack({ size = 280 }: { size?: number }) {
  const [order, setOrder] = useState(() => PHOTOS.map((_, i) => i));
  const pan = useRef(new Animated.ValueXY()).current;
  const paused = useRef(false);
  const height = size * 1.2;

  const advance = (direction: 1 | -1) => {
    Animated.timing(pan, {
      toValue: { x: direction * size * 1.6, y: 50 },
      duration: 300,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      pan.setValue({ x: 0, y: 0 });
      setOrder((o) => [...o.slice(1), o[0]]);
    });
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) advance(-1);
    }, 3800);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 6 && Math.abs(g.dx) > Math.abs(g.dy),
      onPanResponderGrant: () => {
        paused.current = true;
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, g) => {
        paused.current = false;
        const isTap = Math.abs(g.dx) < 5 && Math.abs(g.dy) < 5;
        if (isTap || Math.abs(g.dx) > size * 0.25) {
          advance(isTap || g.dx < 0 ? -1 : 1);
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            friction: 6,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const dragRotate = pan.x.interpolate({
    inputRange: [-size * 1.5, 0, size * 1.5],
    outputRange: ['-20deg', '0deg', '20deg'],
  });

  return (
    <View style={[styles.wrap, { width: size, height: height + 24 }]}>
      {order.map((photoIndex, slot) => {
        if (slot > 2) return null;
        const isFront = slot === 0;
        const base = SLOTS[slot];
        return (
          <Animated.View
            key={photoIndex}
            {...(isFront ? panResponder.panHandlers : null)}
            style={[
              styles.card,
              {
                width: size,
                height,
                zIndex: SLOTS.length - slot,
                transform: isFront
                  ? [...pan.getTranslateTransform(), { rotate: dragRotate }]
                  : [
                      { translateY: base.translateY },
                      { rotate: base.rotate },
                      { scale: base.scale },
                    ],
              },
            ]}
          >
            <Image
              source={PHOTOS[photoIndex]}
              resizeMode="cover"
              style={[styles.image, { width: size - FRAME_PAD * 2, height: height - FRAME_PAD - FRAME_PAD_BOTTOM }]}
            />
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  card: {
    position: 'absolute',
    top: 0,
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: FRAME_PAD,
    paddingBottom: FRAME_PAD_BOTTOM,
    ...softShadow,
  },
  image: {
    borderRadius: radii.sm,
  },
});
