import React, { useEffect, useRef } from 'react';
import { Animated, Easing, TextStyle } from 'react-native';

import { colors, fonts } from '../theme/theme';

/**
 * A value that eases from 0 to 1 once, on mount. Every entrance animation in
 * the app shares this timing so they feel like one language rather than a
 * pile of unrelated effects.
 */
export function useMountAnim(delay = 0, duration = 520) {
  const value = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(value, {
      toValue: 1,
      duration,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [value, delay, duration]);
  return value;
}

/**
 * Fades and lifts its children into place on mount. Used for every headline,
 * so a page never just appears — it settles.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 10,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  style?: any;
}) {
  const v = useMountAnim(delay);
  return (
    <Animated.View
      style={[
        style,
        {
          opacity: v,
          transform: [
            {
              translateY: v.interpolate({
                inputRange: [0, 1],
                outputRange: [distance, 0],
              }),
            },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

/**
 * A short inline phrase that arrives bold and in the accent colour, with a
 * small settling pop — the "important word" treatment used inside otherwise
 * plain sentences (a planet's name, a sign, a tab label).
 */
export function Emphasis({
  children,
  size = 16,
  color = colors.accent,
  delay = 100,
  style,
}: {
  children: React.ReactNode;
  size?: number;
  color?: string;
  delay?: number;
  style?: TextStyle;
}) {
  const v = useMountAnim(delay, 420);
  const base: TextStyle = {
    fontFamily: fonts.bold,
    fontSize: size,
  };
  return (
    <Animated.Text
      style={[
        base,
        style,
        {
          color,
          opacity: v,
          transform: [
            {
              scale: v.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1] }),
            },
          ],
        },
      ]}
    >
      {children}
    </Animated.Text>
  );
}

/**
 * Fades in with a small scale-and-rotate settle — a bit more entrance than
 * `Reveal`, reserved for the one thing on a page that deserves an arrival:
 * the chart wheel.
 */
export function Pop({
  children,
  style,
  duration = 720,
  delay = 0,
}: {
  children: React.ReactNode;
  style?: any;
  duration?: number;
  delay?: number;
}) {
  const v = useMountAnim(delay, duration);
  return (
    <Animated.View
      style={[
        style,
        {
          opacity: v,
          transform: [
            { scale: v.interpolate({ inputRange: [0, 1], outputRange: [0.86, 1] }) },
            {
              rotate: v.interpolate({
                inputRange: [0, 1],
                outputRange: ['-6deg', '0deg'],
              }),
            },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

/** A value that oscillates 0→1→0 forever, eased like a slow breath. */
function useLoopAnim(periodMs: number) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(v, {
          toValue: 1,
          duration: periodMs / 2,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(v, {
          toValue: 0,
          duration: periodMs / 2,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [v, periodMs]);
  return v;
}

/**
 * Bobs its children gently up and down, forever — used for the small
 * illustrations that sit beside a photo, so they read as alive rather than
 * static stickers.
 */
export function Float({
  children,
  periodMs = 3600,
  distance = 5,
  style,
}: {
  children: React.ReactNode;
  periodMs?: number;
  distance?: number;
  style?: any;
}) {
  const v = useLoopAnim(periodMs);
  const translateY = v.interpolate({ inputRange: [0, 1], outputRange: [0, -distance] });
  return (
    <Animated.View style={[style, { transform: [{ translateY }] }]}>{children}</Animated.View>
  );
}

/**
 * Swells its children very slightly, forever — a slow breath used on the
 * photo, so the one real, still thing on the page never feels frozen.
 */
export function Breathe({
  children,
  periodMs = 4200,
  scale = 1.03,
  style,
}: {
  children: React.ReactNode;
  periodMs?: number;
  scale?: number;
  style?: any;
}) {
  const v = useLoopAnim(periodMs);
  const s = v.interpolate({ inputRange: [0, 1], outputRange: [1, scale] });
  return <Animated.View style={[style, { transform: [{ scale: s }] }]}>{children}</Animated.View>;
}

/**
 * Spins its children slowly and forever. Used for the small star in the
 * page divider — the one piece of the app that never sits still.
 */
export function SpinForever({
  children,
  periodMs = 9000,
  style,
}: {
  children: React.ReactNode;
  periodMs?: number;
  style?: any;
}) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(v, {
        toValue: 1,
        duration: periodMs,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [v, periodMs]);

  const rotate = v.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  return (
    <Animated.View style={[style, { transform: [{ rotate }] }]}>{children}</Animated.View>
  );
}
