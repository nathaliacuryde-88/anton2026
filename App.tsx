import {
  InstrumentSerif_400Regular,
  useFonts,
} from '@expo-google-fonts/instrument-serif';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { computeChart } from './src/astro/engine';
import { ANTON } from './src/data/birth';
import { LanguageProvider } from './src/i18n/LanguageContext';
import { TabKey } from './src/navigation';
import AspectsScreen from './src/screens/AspectsScreen';
import ChartScreen from './src/screens/ChartScreen';
import FamilyScreen from './src/screens/FamilyScreen';
import HousesScreen from './src/screens/HousesScreen';
import PortraitScreen from './src/screens/PortraitScreen';
import SkyScreen from './src/screens/SkyScreen';
import { colors, fonts } from './src/theme/theme';

function Shell() {
  const [tab, setTab] = useState<TabKey>('portrait');
  const insets = useSafeAreaInsets();
  const nav = { tab, onNavigate: setTab };

  // The chart depends only on the birth data, so it is computed once.
  const chart = useMemo(() => computeChart(ANTON), []);

  return (
    <LinearGradient
      colors={[colors.paper, '#FAF6DE', '#E9F4F3']}
      locations={[0, 0.5, 1]}
      style={styles.flex}
    >
      <View style={[styles.flex, { paddingTop: insets.top }]}>
        {tab === 'portrait' && <PortraitScreen chart={chart} {...nav} />}
        {tab === 'chart' && <ChartScreen chart={chart} {...nav} />}
        {tab === 'sky' && <SkyScreen chart={chart} {...nav} />}
        {tab === 'houses' && <HousesScreen chart={chart} {...nav} />}
        {tab === 'aspects' && <AspectsScreen chart={chart} {...nav} />}
        {tab === 'family' && <FamilyScreen chart={chart} {...nav} />}
      </View>

      <StatusBar style="dark" />
    </LinearGradient>
  );
}

export default function App() {
  // One face, no italic: every alias in `fonts` resolves to it.
  const [fontsLoaded, fontError] = useFonts({
    [fonts.regular]: InstrumentSerif_400Regular,
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
});
