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
 * of whoever doesn't. The header is always the app's own blue pill — every
 * info surface speaks with the same voice — and the answer, once opened,
 * is its own plain white card underneath, framed in the app's cyan.
 */
export default function Explainer({
  titleKey,
  bodyKey,
  defaultOpen = false,
}: {
  titleKey: GuideKey;
  bodyKey: GuideKey;
  defaultOpen?: boolean;
}) {
  const { b } = useLang();
  const [open, setOpen] = useState(defaultOpen);
  const pop = useRef(new Animated.Value(1)).current;

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((o) => !o);
    pop.setValue(0.8);
    Animated.spring(pop, { toValue: 1, useNativeDriver: true, friction: 5 }).start();
  };

  return (
    <View>
      <Pressable
        onPress={toggle}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        style={styles.pill}
      >
        <View style={styles.header}>
          <View style={styles.mark}>
            <Body size={13} style={styles.markText}>
              i
            </Body>
          </View>
          <Body size={15} style={styles.title}>
            {b(GUIDE[titleKey])}
          </Body>
        </View>
        <Animated.Text style={[styles.toggle, { transform: [{ scale: pop }] }]}>
          {open ? '−' : '+'}
        </Animated.Text>
      </Pressable>

      {open && (
        <View style={styles.body}>
          <Body size={14} style={styles.bodyText}>
            {b(GUIDE[bodyKey])}
          </Body>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(1.5),
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(1.25),
  },
  mark: {
    width: 22,
    height: 22,
    borderRadius: 11,
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
    fontFamily: fonts.medium,
    color: colors.onVivid,
  },
  toggle: {
    fontSize: 18,
    lineHeight: 18,
    color: colors.onVivid,
  },
  body: {
    marginTop: spacing(1.25),
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.cyan,
    borderRadius: radii.md,
    padding: spacing(1.75),
  },
  bodyText: {
    lineHeight: 22,
    color: colors.ink,
  },
});
