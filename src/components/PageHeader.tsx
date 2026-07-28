import React, { useEffect, useRef, useState } from 'react';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GUIDE } from '../content/guide';
import { useLang } from '../i18n/LanguageContext';
import { colors, fonts, radii, spacing, typography } from '../theme/theme';
import { Body, LanguageToggle } from './ui';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * The top of every page: the site name, and a hamburger that opens onto the
 * language switch and a short word about the project. It lives inside each
 * screen's scrolling content, so it moves away as the page scrolls — only the
 * tab bar at the bottom stays put.
 */
export default function PageHeader() {
  const { b } = useLang();
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((o) => !o);
  };

  return (
    <View style={{ paddingTop: insets.top + spacing(1.5) }}>
      <View style={styles.row}>
        <Body size={19} style={styles.wordmark}>
          Anton’s Sky
        </Body>
        <Pressable
          onPress={toggle}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Menu"
          accessibilityState={{ expanded: open }}
        >
          <HamburgerIcon open={open} />
        </Pressable>
      </View>

      {open && (
        <View style={styles.panel}>
          <LanguageToggle />
          <View style={styles.panelDivider} />
          <Body size={14} style={styles.panelHeading}>
            {b(GUIDE.aboutHeading)}
          </Body>
          <Body size={13} style={styles.panelBody}>
            {b(GUIDE.aboutProjectBody)}
          </Body>
        </View>
      )}
    </View>
  );
}

/** A hamburger that morphs into an × as it opens. */
function HamburgerIcon({ open }: { open: boolean }) {
  const anim = useRef(new Animated.Value(open ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: open ? 1 : 0,
      duration: 260,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [open, anim]);

  const topStyle = {
    transform: [
      { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, 6] }) },
      { rotate: anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '45deg'] }) },
    ],
  };
  const midStyle = {
    opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
  };
  const botStyle = {
    transform: [
      { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, -6] }) },
      { rotate: anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-45deg'] }) },
    ],
  };

  return (
    <View style={styles.burger}>
      <Animated.View style={[styles.bar, topStyle]} />
      <Animated.View style={[styles.bar, midStyle]} />
      <Animated.View style={[styles.bar, botStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing(2.5),
  },
  wordmark: {
    fontFamily: fonts.medium,
    letterSpacing: typography.displayTracking,
  },
  burger: {
    width: 22,
    height: 16,
    justifyContent: 'space-between',
  },
  bar: {
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.ink,
  },
  panel: {
    marginTop: spacing(1.5),
    marginHorizontal: spacing(2.5),
    backgroundColor: colors.vivid,
    borderRadius: radii.lg,
    padding: spacing(2.25),
  },
  panelDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginVertical: spacing(1.75),
  },
  panelHeading: {
    fontFamily: fonts.semibold,
    color: colors.onVivid,
    letterSpacing: typography.eyebrowTracking,
    textTransform: 'uppercase',
    fontSize: 11,
  },
  panelBody: {
    marginTop: spacing(1),
    lineHeight: 20,
    color: colors.onVividMuted,
  },
});
