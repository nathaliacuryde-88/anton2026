import React from 'react';
import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { useLang } from '../i18n/LanguageContext';
import { colors, fonts, radii, softShadow, spacing, typography } from '../theme/theme';
import { Reveal, SpinForever, useMountAnim } from './motion';

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

/** A blue rule with a small star that turns, slowly and forever, in the middle. */
export function Divider({ style }: { style?: ViewStyle }) {
  return (
    <View style={[styles.dividerRow, style]}>
      <View style={styles.dividerLine} />
      <SpinForever>
        <Text style={styles.dividerMark}>✦</Text>
      </SpinForever>
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

/** EN / PT switch. */
export function LanguageToggle() {
  const { lang, setLang } = useLang();
  return (
    <View style={styles.toggle}>
      {(['en', 'pt'] as const).map((code) => {
        const active = lang === code;
        return (
          <Pressable
            key={code}
            onPress={() => setLang(code)}
            hitSlop={6}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            style={[styles.toggleItem, active && styles.toggleItemActive]}
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
    backgroundColor: colors.paperDeep,
    borderRadius: radii.sm,
    padding: 3,
  },
  toggleItem: {
    paddingHorizontal: spacing(1.25),
    paddingVertical: spacing(0.4),
    borderRadius: radii.sm - 3,
  },
  toggleItemActive: {
    backgroundColor: colors.card,
  },
  toggleText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    letterSpacing: 1.2,
    color: colors.inkFaint,
  },
  toggleTextActive: {
    color: colors.ink,
  },
});
