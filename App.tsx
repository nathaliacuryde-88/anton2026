import {
  InstrumentSerif_400Regular,
  InstrumentSerif_400Regular_Italic,
  useFonts,
} from '@expo-google-fonts/instrument-serif';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { computeChart } from './src/astro/engine';
import { LanguageToggle } from './src/components/ui';
import { ANTON } from './src/data/birth';
import { LanguageProvider, useLang } from './src/i18n/LanguageContext';
import { UIKey } from './src/i18n/strings';
import AspectsScreen from './src/screens/AspectsScreen';
import ChartScreen from './src/screens/ChartScreen';
import HousesScreen from './src/screens/HousesScreen';
import PortraitScreen from './src/screens/PortraitScreen';
import SkyScreen from './src/screens/SkyScreen';
import { colors, fonts, radii, spacing } from './src/theme/theme';

type TabKey = 'chart' | 'sky' | 'houses' | 'aspects' | 'portrait';

// The letter comes first: it is the whole chart in plain words, and it is the
// way in for anyone who has never read one. The detail tabs follow.
const TABS: Array<{ key: TabKey; label: UIKey; glyph: string }> = [
  // U+2756 rather than a pencil: it has no emoji form to fall back to, and it
  // stays legible at tab-bar size.
  { key: 'portrait', label: 'navPortrait', glyph: '❖' },
  { key: 'chart', label: 'navChart', glyph: '✧' },
  { key: 'sky', label: 'navSky', glyph: '☾' },
  { key: 'houses', label: 'navHouses', glyph: '⌂' },
  { key: 'aspects', label: 'navAspects', glyph: '△' },
];

function Shell() {
  const [tab, setTab] = useState<TabKey>('portrait');
  const insets = useSafeAreaInsets();
  const { t } = useLang();

  // The chart depends only on the birth data, so it is computed once.
  const chart = useMemo(() => computeChart(ANTON), []);

  return (
    <LinearGradient
      colors={[colors.paper, '#F9EFE7', '#EDF2E7']}
      locations={[0, 0.5, 1]}
      style={styles.flex}
    >
      <View style={[styles.header, { paddingTop: insets.top + spacing(1) }]}>
        <LanguageToggle />
      </View>

      <View style={styles.flex}>
        {tab === 'chart' && <ChartScreen chart={chart} />}
        {tab === 'sky' && <SkyScreen chart={chart} />}
        {tab === 'houses' && <HousesScreen chart={chart} />}
        {tab === 'aspects' && <AspectsScreen chart={chart} />}
        {tab === 'portrait' && <PortraitScreen chart={chart} />}
      </View>

      <View
        style={[
          styles.tabBar,
          { paddingBottom: Math.max(insets.bottom, spacing(1.25)) },
        ]}
      >
        {TABS.map((item) => {
          const active = tab === item.key;
          return (
            <Pressable
              key={item.key}
              onPress={() => setTab(item.key)}
              style={styles.tabItem}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
            >
              <Text style={[styles.tabGlyph, active && styles.tabGlyphActive]}>
                {item.glyph}
              </Text>
              <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
                {t(item.label)}
              </Text>
              <View style={[styles.tabDot, active && styles.tabDotActive]} />
            </Pressable>
          );
        })}
      </View>

      <StatusBar style="dark" />
    </LinearGradient>
  );
}

export default function App() {
  // Instrument Serif has exactly one weight and one italic, and every alias in
  // `fonts` resolves to one of them.
  const [fontsLoaded, fontError] = useFonts({
    [fonts.regular]: InstrumentSerif_400Regular,
    [fonts.italic]: InstrumentSerif_400Regular_Italic,
  });

  // Render on failure too: if the font files cannot be fetched the platform
  // serif is a perfectly good fallback, and hanging on a spinner forever is not.
  if (!fontsLoaded && !fontError) {
    return (
      <View style={[styles.flex, styles.loading]}>
        <ActivityIndicator color={colors.rose} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <LanguageProvider initial="en">
        <Shell />
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.paper,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing(2.5),
    paddingBottom: spacing(1),
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: spacing(1.25),
    paddingHorizontal: spacing(1),
    backgroundColor: colors.card,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    shadowColor: '#6F6A55',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -6 },
    elevation: 8,
  },
  tabItem: {
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: spacing(0.5),
  },
  tabGlyph: {
    fontSize: 16,
    color: colors.inkFaint,
  },
  tabGlyphActive: {
    color: colors.accent,
  },
  tabLabel: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.inkFaint,
  },
  tabLabelActive: {
    fontFamily: fonts.medium,
    color: colors.ink,
  },
  tabDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 2,
    backgroundColor: 'transparent',
  },
  tabDotActive: {
    backgroundColor: colors.accent,
  },
});
