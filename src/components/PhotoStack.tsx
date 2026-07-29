import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, Pressable, StyleSheet, View } from 'react-native';

import { useLang } from '../i18n/LanguageContext';
import { colors, fonts, radii, softShadow, spacing } from '../theme/theme';
import ThemeIcon, { ThemeIconKind } from './ThemeIcons';

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

const REACTION_KINDS: ThemeIconKind[] = ['heart', 'sparkle'];

/**
 * A small pile of real photos — the parents with Anton — that advances on
 * its own every few seconds, and can also be tapped through by hand. A tap
 * (or the automatic advance) tucks the front print under the pile and
 * scatters a couple of small blue reactions around it. Only the front
 * card is ever pressable — the rest sit still underneath at a fixed tilt
 * until their turn comes to the top.
 */
export default function PhotoStack({ size = 280 }: { size?: number }) {
  const { lang } = useLang();
  const [order, setOrder] = useState(() => PHOTOS.map((_, i) => i));
  const [dropping, setDropping] = useState(false);
  const [reactions, setReactions] = useState<
    { id: number; kind: ThemeIconKind; left: number; top: number }[]
  >([]);
  const nextReactionId = useRef(0);
  const dropY = useRef(new Animated.Value(0)).current;
  const dropScale = useRef(new Animated.Value(1)).current;
  const paused = useRef(false);
  const height = size * 1.2;

  const spawnReactions = () => {
    const count = 2 + Math.round(Math.random());
    const spawned = Array.from({ length: count }, () => {
      nextReactionId.current += 1;
      return {
        id: nextReactionId.current,
        kind: REACTION_KINDS[Math.floor(Math.random() * REACTION_KINDS.length)],
        left: size * (Math.random() * 1.15 - 0.15),
        top: height * (Math.random() * 0.75 - 0.05),
      };
    });
    setReactions((r) => [...r, ...spawned]);
  };

  const cycle = () => {
    dropY.setValue(0);
    dropScale.setValue(1);
    setDropping(false);
    setOrder((o) => [...o.slice(1), o[0]]);
  };

  /** Tucks the front print down and behind the pile — the only way through
   * the stack now that side-to-side swiping is off. */
  const dropUnder = () => {
    setDropping(true);
    spawnReactions();
    Animated.parallel([
      Animated.timing(dropY, {
        toValue: size * 0.24,
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

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) dropUnder();
    }, 3800);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A little unprompted wiggle shortly after the stack appears, with a
  // small "tap" label riding along with it, so the gesture explains itself.
  const hint = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const pulse = () => [
      Animated.timing(hint, {
        toValue: 1,
        duration: 160,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(hint, {
        toValue: 0,
        duration: 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ];
    const loop = Animated.loop(
      Animated.sequence([Animated.delay(1100), ...pulse(), Animated.delay(160), ...pulse()]),
      { iterations: 2 },
    );
    loop.start();
    return () => loop.stop();
  }, [hint]);
  const hintScale = hint.interpolate({ inputRange: [0, 1], outputRange: [1, 0.95] });

  return (
    <View style={[styles.wrap, { width: size, height: height + 24 }]}>
      {order.map((photoIndex, slot) => {
        if (slot > 2) return null;
        const isFront = slot === 0;
        const base = SLOTS[slot];
        return (
          <Animated.View
            key={photoIndex}
            style={[
              styles.card,
              {
                width: size,
                height,
                // While dropping under, the front card sinks behind the
                // other two instead of staying on top of them.
                zIndex: isFront && dropping ? 0 : SLOTS.length - slot,
                transform: isFront
                  ? [{ translateY: dropY }, { scale: Animated.multiply(dropScale, hintScale) }]
                  : [
                      { translateY: base.translateY },
                      { rotate: base.rotate },
                      { scale: base.scale },
                    ],
              },
            ]}
          >
            <Pressable
              onPress={isFront ? dropUnder : undefined}
              disabled={!isFront}
              style={styles.pressable}
            >
              <Image
                source={PHOTOS[photoIndex]}
                resizeMode="cover"
                style={[
                  styles.image,
                  { width: size - FRAME_PAD * 2, height: height - FRAME_PAD - FRAME_PAD_BOTTOM },
                ]}
              />
              {isFront && (
                <Animated.View pointerEvents="none" style={[styles.hintTag, { opacity: hint }]}>
                  <Animated.Text style={styles.hintText}>
                    {lang === 'en' ? 'tap' : lang === 'de' ? 'tippen' : 'toque'}
                  </Animated.Text>
                </Animated.View>
              )}
            </Pressable>
          </Animated.View>
        );
      })}

      {reactions.map((r) => (
        <Reaction
          key={r.id}
          kind={r.kind}
          left={r.left}
          top={r.top}
          onDone={() => setReactions((rs) => rs.filter((x) => x.id !== r.id))}
        />
      ))}
    </View>
  );
}

/** One scattered blue reaction, popping up and fading out once, on its own. */
function Reaction({
  kind,
  left,
  top,
  onDone,
}: {
  kind: ThemeIconKind;
  left: number;
  top: number;
  onDone: () => void;
}) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(v, {
      toValue: 1,
      duration: 950,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(onDone);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scale = v.interpolate({ inputRange: [0, 0.2, 1], outputRange: [0.3, 1.15, 0.9] });
  const translateY = v.interpolate({ inputRange: [0, 1], outputRange: [0, -48] });
  const opacity = v.interpolate({ inputRange: [0, 0.15, 0.7, 1], outputRange: [0, 1, 1, 0] });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.reaction,
        { left, top, opacity, transform: [{ translateY }, { scale }] },
      ]}
    >
      <ThemeIcon kind={kind} size={26} />
    </Animated.View>
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
  pressable: {
    flex: 1,
  },
  image: {
    borderRadius: radii.sm,
  },
  hintTag: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: FRAME_PAD_BOTTOM + spacing(1),
    backgroundColor: 'rgba(26,23,196,0.85)',
    borderRadius: radii.sm,
    paddingHorizontal: spacing(1.25),
    paddingVertical: spacing(0.4),
  },
  hintText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.onVivid,
  },
  reaction: {
    position: 'absolute',
    zIndex: 20,
  },
});
