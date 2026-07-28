import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { Lang } from '../astro/constants';
import { useLang } from '../i18n/LanguageContext';
import { colors, fonts, radii, softShadow, spacing, typography } from '../theme/theme';
import { Reveal, Twinkle, useMountAnim } from './motion';

/** Serif body text. */
export function Body({
  children,
  style,
  muted,
  size = 16,
}: {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
  muted?: boolean;
  size?: number;
}) {
  return (
    <Text
      style={[
        {
          fontFamily: fonts.regular,
          fontSize: size,
          lineHeight: size * typography.bodyLineHeight,
          color: muted ? colors.inkSoft : colors.ink,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

/** Large display heading. Settles in with a short fade and lift on mount. */
export function Title({
  children,
  style,
  size = 30,
}: {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
  size?: number;
}) {
  const v = useMountAnim(0, 420);
  return (
    <Animated.Text
      style={[
        {
          fontFamily: fonts.light,
          fontSize: size,
          lineHeight: size * 1.14,
          letterSpacing: typography.displayTracking,
          color: colors.accent,
          opacity: v,
          transform: [
            {
              translateY: v.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }),
            },
          ],
        },
        style,
      ]}
    >
      {children}
    </Animated.Text>
  );
}

/**
 * The headline of a page. One per screen, always this size and always centred,
 * with nothing above it — so every page opens the same way. It fades and
 * lifts into place, the same gesture repeated everywhere a page introduces
 * itself.
 */
export function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <Reveal distance={14}>
      <Text style={styles.pageTitle}>{children}</Text>
    </Reveal>
  );
}

/** Small letter-spaced label above a block. */
export function Eyebrow({
  children,
  style,
  color = colors.inkFaint,
}: {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
  color?: string;
}) {
  return (
    <Text
      style={[
        {
          fontFamily: fonts.semibold,
          fontSize: 12,
          letterSpacing: typography.eyebrowTracking,
          textTransform: 'uppercase',
          color,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

export function Card({
  children,
  style,
  tint,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  tint?: string;
}) {
  return (
    <View
      style={[
        styles.card,
        tint ? { backgroundColor: tint, borderWidth: 0 } : null,
        softShadow,
        style,
      ]}
    >
      {children}
    </View>
  );
}

/** A blue rule with a small star that twinkles, forever, in the middle. */
export function Divider({ style }: { style?: ViewStyle }) {
  return (
    <View style={[styles.dividerRow, style]}>
      <View style={styles.dividerLine} />
      <Twinkle>
        <Text style={styles.dividerMark}>✦</Text>
      </Twinkle>
      <View style={styles.dividerLine} />
    </View>
  );
}

export function Chip({
  label,
  color,
  textColor = colors.ink,
}: {
  label: string;
  color: string;
  textColor?: string;
}) {
  return (
    <View style={[styles.chip, { backgroundColor: color }]}>
      <Text style={[styles.chipText, { color: textColor }]}>{label}</Text>
    </View>
  );
}

const LANGS: Lang[] = ['en', 'pt', 'de'];

/** EN / PT / DE switch — a sliding blue pill over an equal three-way split. */
export function LanguageToggle() {
  const { lang, setLang } = useLang();
  const index = LANGS.indexOf(lang);
  const slide = useRef(new Animated.Value(index)).current;

  useEffect(() => {
    Animated.timing(slide, {
      toValue: index,
      duration: 320,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false, // animating `left` as a percentage, not a transform
    }).start();
  }, [index, slide]);

  const left = slide.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['0%', '33.3333%', '66.6666%'],
  });

  return (
    <View style={styles.toggle}>
      <Animated.View style={[styles.toggleIndicator, { left }]} />
      {LANGS.map((code) => {
        const active = lang === code;
        return (
          <Pressable
            key={code}
            onPress={() => setLang(code)}
            hitSlop={6}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            style={styles.toggleItem}
          >
            <Text style={[styles.toggleText, active && styles.toggleTextActive]}>
              {code.toUpperCase()}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    fontFamily: fonts.light,
    fontSize: typography.pageTitle,
    lineHeight: typography.pageTitle * 1.14,
    letterSpacing: typography.displayTracking,
    color: colors.accent,
    textAlign: 'center',
    marginTop: spacing(2),
    marginBottom: spacing(3),
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    borderWidth: 2,
    borderColor: colors.cyan,
    padding: spacing(2.5),
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(1.5),
    marginVertical: spacing(2),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.dividerLine,
  },
  dividerMark: {
    color: colors.periwinkle,
    fontSize: 10,
    opacity: 0.9,
  },
  chip: {
    paddingHorizontal: spacing(1.25),
    paddingVertical: spacing(0.5),
    borderRadius: radii.sm,
  },
  chipText: {
    fontFamily: fonts.medium,
    fontSize: 13,
  },
  toggle: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: radii.sm,
    padding: 3,
    position: 'relative',
    overflow: 'hidden',
  },
  toggleIndicator: {
    position: 'absolute',
    top: 3,
    bottom: 3,
    width: '33.3333%',
    backgroundColor: colors.accent,
    borderRadius: radii.sm - 3,
  },
  toggleItem: {
    flex: 1,
    paddingVertical: spacing(0.4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    letterSpacing: 1.2,
    color: colors.inkFaint,
  },
  toggleTextActive: {
    color: colors.onVivid,
    fontFamily: fonts.bold,
  },
});
