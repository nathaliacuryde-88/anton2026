import React, { useRef, useState } from 'react';
import {
  Animated,
  Easing,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  UIManager,
  View,
} from 'react-native';

import { GUIDE, GuideKey } from '../content/guide';
import { useLang } from '../i18n/LanguageContext';
import { colors, fonts, radii, spacing } from '../theme/theme';
import { Body } from './ui';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * A collapsible note that explains a piece of jargon in plain words.
 *
 * Closed by default: these are here for whoever wants them, not in the way
 * of whoever doesn't. The vivid blue marks it as a distinct kind of surface —
 * an aside, not a content card — so it reads the same everywhere it appears.
 */
export default function Explainer({
  titleKey,
  bodyKey,
  tint = colors.vividGreen,
  defaultOpen = false,
}: {
  titleKey: GuideKey;
  bodyKey: GuideKey;
  tint?: string;
  defaultOpen?: boolean;
}) {
  const { b } = useLang();
  const [open, setOpen] = useState(defaultOpen);
  const spin = useRef(new Animated.Value(defaultOpen ? 1 : 0)).current;

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((o) => {
      const next = !o;
      Animated.timing(spin, {
        toValue: next ? 1 : 0,
        duration: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
      return next;
    });
  };

  // A single "+" rotated 45° reads as "×" — one glyph doing both jobs.
  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '45deg'] });

  return (
    <View style={[styles.card, { backgroundColor: tint }]}>
      <Pressable
        onPress={toggle}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        style={styles.header}
      >
        <View style={styles.mark}>
          <Body size={12} style={styles.markText}>
            i
          </Body>
        </View>
        <Body size={15} style={styles.title}>
          {b(GUIDE[titleKey])}
        </Body>
        <Animated.Text style={[styles.toggle, { transform: [{ rotate }] }]}>
          +
        </Animated.Text>
      </Pressable>

      {open && (
        <Body size={14} style={styles.body}>
          {b(GUIDE[bodyKey])}
        </Body>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(1.5),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(1.25),
  },
  mark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.onVividChip,
  },
  markText: {
    color: colors.onVivid,
    fontFamily: fonts.bold,
  },
  title: {
    flex: 1,
    fontFamily: fonts.bold,
    color: colors.onVivid,
  },
  toggle: {
    fontSize: 18,
    lineHeight: 18,
    color: colors.onVividMuted,
  },
  body: {
    marginTop: spacing(1.25),
    lineHeight: 22,
    color: colors.onVividMuted,
  },
});
