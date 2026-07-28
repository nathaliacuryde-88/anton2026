import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { useLang } from '../i18n/LanguageContext';
import { colors, fonts, radii, softShadow, spacing } from '../theme/theme';

/** Serif body text. */
export function Body({
  children,
  style,
  muted,
  italic,
  size = 16,
}: {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
  muted?: boolean;
  italic?: boolean;
  size?: number;
}) {
  return (
    <Text
      style={[
        {
          fontFamily: italic ? fonts.italic : fonts.regular,
          fontSize: size,
          lineHeight: size * 1.5,
          color: muted ? colors.inkSoft : colors.ink,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

/** Large display heading. */
export function Title({
  children,
  style,
  size = 30,
}: {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
  size?: number;
}) {
  return (
    <Text
      style={[
        {
          fontFamily: fonts.light,
          fontSize: size,
          lineHeight: size * 1.2,
          color: colors.ink,
        },
        style,
      ]}
    >
      {children}
    </Text>
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
          fontSize: 11,
          letterSpacing: 2.2,
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
        tint ? { backgroundColor: tint } : null,
        softShadow,
        style,
      ]}
    >
      {children}
    </View>
  );
}

/** A hairline rule with a small diamond in the middle. */
export function Divider({ style }: { style?: ViewStyle }) {
  return (
    <View style={[styles.dividerRow, style]}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerMark}>✦</Text>
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
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: spacing(2.5),
    borderWidth: 1,
    borderColor: colors.hairline,
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
    backgroundColor: colors.hairline,
  },
  dividerMark: {
    color: colors.gold,
    fontSize: 10,
    opacity: 0.8,
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
    borderWidth: 1,
    borderColor: colors.hairline,
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
