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
 * its own every few seconds, and can also be tapped or swiped through by
 * hand. A tap (or the automatic advance) tucks the front print under the
 * pile; only a deliberate sideways drag sends it flying off in that
 * direction. Only the front card is ever draggable — the rest sit still
 * underneath at a fixed tilt until their turn comes to the top.
 */
export default function PhotoStack({ size = 280 }: { size?: number }) {
  const [order, setOrder] = useState(() => PHOTOS.map((_, i) => i));
  const [dropping, setDropping] = useState(false);
  const pan = useRef(new Animated.ValueXY()).current;
  const dropScale = useRef(new Animated.Value(1)).current;
  const paused = useRef(false);
  const height = size * 1.2;

  const cycle = () => {
    pan.setValue({ x: 0, y: 0 });
    dropScale.setValue(1);
    setDropping(false);
    setOrder((o) => [...o.slice(1), o[0]]);
  };

  /** Tucks the front print down and behind the pile — the tap gesture, and
   * the automatic advance. */
  const dropUnder = () => {
    setDropping(true);
    Animated.parallel([
      Animated.timing(pan, {
        toValue: { x: 0, y: size * 0.24 },
        duration: 280,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(dropScale, {
        toValue: 0.86,
        duration: 280,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(cycle);
  };

  /** Sends the front print flying sideways — a deliberate swipe only. */
  const flingAway = (direction: 1 | -1) => {
    Animated.timing(pan, {
      toValue: { x: direction * size * 1.6, y: 50 },
      duration: 300,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(cycle);
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) dropUnder();
    }, 3800);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A little unprompted wiggle shortly after the stack appears, so a tap
  // reads as available without a word of explanation.
  const hint = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(1100),
        Animated.timing(hint, { toValue: 1, duration: 160, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        Animated.timing(hint, { toValue: 0, duration: 220, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        Animated.delay(160),
        Animated.timing(hint, { toValue: 1, duration: 160, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        Animated.timing(hint, { toValue: 0, duration: 220, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
      { iterations: 2 },
    );
    loop.start();
    return () => loop.stop();
  }, [hint]);
  const hintScale = hint.interpolate({ inputRange: [0, 1], outputRange: [1, 0.95] });

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
        if (isTap) {
          dropUnder();
        } else if (Math.abs(g.dx) > size * 0.25) {
          flingAway(g.dx > 0 ? 1 : -1);
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
                // While dropping under, the front card sinks behind the
                // other two instead of staying on top of them.
                zIndex: isFront && dropping ? 0 : SLOTS.length - slot,
                transform: isFront
                  ? [
                      ...pan.getTranslateTransform(),
                      { rotate: dragRotate },
                      { scale: Animated.multiply(dropScale, hintScale) },
                    ]
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
