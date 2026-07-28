import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useLang } from '../i18n/LanguageContext';
import { NavProps, TABS } from '../navigation';
import { colors, fonts, radii, spacing, typography } from '../theme/theme';
import { Body, Divider, LanguageToggle } from './ui';

/**
 * The menu.
 *
 * It sits at the end of each page's content rather than floating over it, so
 * nothing is pinned to the bottom of the screen and the reading area stays
 * whole. Because switching tabs remounts the screen, every jump also lands
 * back at the top of the new page.
 */
export default function PageNav({ tab, onNavigate }: NavProps) {
  const { t } = useLang();

  return (
    <View style={styles.wrap}>
      <Divider />

      <Text style={styles.wordmark}>{t('appTitle')}</Text>

      <View style={styles.items}>
        {TABS.map((item) => {
          const active = tab === item.key;
          return (
            <Pressable
              key={item.key}
              onPress={() => onNavigate(item.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              style={[styles.item, active && styles.itemActive]}
            >
              <Text style={[styles.glyph, active && styles.glyphActive]}>
                {item.glyph}
              </Text>
              <Body size={14} style={active ? styles.labelActive : styles.label}>
                {t(item.label)}
              </Body>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.footer}>
        <LanguageToggle />
      </View>

      <Body size={12} muted style={styles.credit}>
        {t('madeWith')}
      </Body>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: spacing(3),
    alignItems: 'center',
  },
  wordmark: {
    fontFamily: fonts.medium,
    fontSize: 22,
    letterSpacing: typography.displayTracking,
    color: colors.ink,
    marginBottom: spacing(2),
  },
  items: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing(1),
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(0.75),
    paddingVertical: spacing(0.75),
    paddingHorizontal: spacing(1.5),
    borderRadius: radii.sm,
    backgroundColor: colors.card,
  },
  itemActive: {
    backgroundColor: colors.accentSoft,
  },
  glyph: {
    fontSize: 14,
    color: colors.inkFaint,
  },
  glyphActive: {
    color: colors.accent,
  },
  label: {
    color: colors.inkSoft,
  },
  labelActive: {
    color: colors.accent,
  },
  footer: {
    marginTop: spacing(2.5),
  },
  credit: {
    marginTop: spacing(2),
    textAlign: 'center',
  },
});
