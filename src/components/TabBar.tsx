import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useLang } from '../i18n/LanguageContext';
import { NavProps, TABS } from '../navigation';
import { colors, radii, spacing } from '../theme/theme';
import { Body } from './ui';

/**
 * The bottom navigation. Fixed to the foot of the screen — unlike the header,
 * it never scrolls away, so the six pages are always one tap apart.
 */
export default function TabBar({
  tab,
  onNavigate,
  bottomInset,
}: NavProps & { bottomInset: number }) {
  const { t } = useLang();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(bottomInset, spacing(1)) }]}>
      {TABS.map((item) => {
        const active = tab === item.key;
        return (
          <Pressable
            key={item.key}
            onPress={() => onNavigate(item.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            style={styles.item}
          >
            <Text style={[styles.glyph, active && styles.glyphActive]}>{item.glyph}</Text>
            <Body size={11} style={active ? styles.labelActive : styles.label}>
              {t(item.label)}
            </Body>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: spacing(1.25),
    paddingHorizontal: spacing(0.5),
    backgroundColor: colors.card,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    shadowColor: '#4A5560',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -4 },
    elevation: 6,
  },
  item: {
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: spacing(0.4),
    paddingBottom: spacing(0.5),
  },
  glyph: {
    fontSize: 15,
    color: colors.inkFaint,
  },
  glyphActive: {
    color: colors.accent,
  },
  label: {
    color: colors.inkFaint,
  },
  labelActive: {
    color: colors.accent,
    fontWeight: '700',
  },
});
