import {
  InstrumentSerif_400Regular,
  useFonts,
} from '@expo-google-fonts/instrument-serif';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { computeChart } from './src/astro/engine';
import TabBar from './src/components/TabBar';
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

  // The chart depends only on the birth data, so it is computed once.
  const chart = useMemo(() => computeChart(ANTON), []);

  return (
    <View style={styles.background}>
      <View style={styles.flex}>
        {tab === 'portrait' && <PortraitScreen chart={chart} />}
        {tab === 'chart' && <ChartScreen chart={chart} />}
        {tab === 'sky' && <SkyScreen chart={chart} />}
        {tab === 'houses' && <HousesScreen chart={chart} />}
        {tab === 'aspects' && <AspectsScreen chart={chart} />}
        {tab === 'family' && <FamilyScreen chart={chart} />}
      </View>

      <TabBar tab={tab} onNavigate={setTab} bottomInset={insets.bottom} />

      <StatusBar style="dark" />
    </View>
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
      <View style={[styles.background, styles.loading]}>
        <ActivityIndicator color={colors.accent} />
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
  background: {
    flex: 1,
    // Solid and yellow, always — no gradient.
    backgroundColor: colors.yellow,
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
