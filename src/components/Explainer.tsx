import React, { useState } from 'react';
import { LayoutAnimation, Platform, Pressable, StyleSheet, UIManager, View } from 'react-native';

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
 * A soft, collapsible note that explains a piece of jargon in plain words.
 *
 * Open by default: the whole point is that someone who has never read a chart
 * should not have to know to tap anything.
 */
export default function Explainer({
  titleKey,
  bodyKey,
  tint = colors.cardCool,
  defaultOpen = true,
}: {
  titleKey: GuideKey;
  bodyKey: GuideKey;
  tint?: string;
  defaultOpen?: boolean;
}) {
  const { b } = useLang();
  const [open, setOpen] = useState(defaultOpen);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((o) => !o);
  };

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
            ?
          </Body>
        </View>
        <Body size={15} style={styles.title}>
          {b(GUIDE[titleKey])}
        </Body>
        <Body size={12} muted>
          {open ? '−' : '+'}
        </Body>
      </Pressable>

      {open && (
        <Body size={14} muted style={styles.body}>
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
    backgroundColor: colors.accentSoft,
  },
  markText: {
    color: colors.accent,
    fontFamily: fonts.semibold,
  },
  title: {
    flex: 1,
    fontFamily: fonts.medium,
  },
  body: {
    marginTop: spacing(1.25),
    lineHeight: 22,
  },
});
