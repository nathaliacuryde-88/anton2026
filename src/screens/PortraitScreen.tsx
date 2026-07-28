import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Chart } from '../astro/engine';
import PageNav from '../components/PageNav';
import { Body, Card, Divider, Eyebrow, PageTitle } from '../components/ui';
import { GUIDE } from '../content/guide';
import { buildPortrait } from '../content/portrait';
import { formatBirthDate, useLang } from '../i18n/LanguageContext';
import { NavProps } from '../navigation';
import { colors, fonts, spacing } from '../theme/theme';

export default function PortraitScreen({
  chart,
  ...nav
}: { chart: Chart } & NavProps) {
  const { t, b, lang } = useLang();
  const sections = useMemo(() => buildPortrait(chart, lang), [chart, lang]);

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* The opening screen of the app, so it introduces him first. */}
      <PageTitle>{chart.birth.name}</PageTitle>
      <View style={styles.hero}>
        <Body muted size={15} style={styles.birthLine}>
          {formatBirthDate(lang, chart.birth.day, chart.birth.month, chart.birth.year)}
          {'  ·  '}
          {String(chart.birth.hour).padStart(2, '0')}:
          {String(chart.birth.minute).padStart(2, '0')}
        </Body>
        <Body muted size={15}>
          {b(chart.birth.place)}
        </Body>
      </View>

      <Divider />

      {sections.map((section, i) => (
        <View key={i} style={styles.section}>
          <Eyebrow color={colors.accent}>{section.heading}</Eyebrow>
          {section.paragraphs.map((paragraph, j) => (
            <Body key={j} size={17} style={styles.paragraph}>
              {paragraph}
            </Body>
          ))}
          {section.note && (
            <Card tint={colors.cardWarm} style={styles.note}>
              <Body size={14} muted>
                {section.note}
              </Body>
            </Card>
          )}
        </View>
      ))}

      <Divider />

      {/* This is the first tab, so it doubles as the way into the rest. */}
      <Eyebrow color={colors.accent}>{b(GUIDE.whereNext)}</Eyebrow>
      <View style={styles.nextList}>
        {(
          [
            ['✧', 'navChart', GUIDE.nextChart],
            ['☾', 'navSky', GUIDE.nextSky],
            ['⌂', 'navHouses', GUIDE.nextHouses],
            ['△', 'navAspects', GUIDE.nextAspects],
          ] as const
        ).map(([glyph, labelKey, note]) => (
          <View key={labelKey} style={styles.nextRow}>
            <Body size={15} style={styles.nextGlyph}>
              {glyph}
            </Body>
            <Body size={14} muted style={styles.nextText}>
              <Body size={14} style={{ fontFamily: fonts.medium }}>
                {t(labelKey)}
              </Body>
              {' — '}
              {b(note)}
            </Body>
          </View>
        ))}
      </View>

      <PageNav {...nav} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing(2.5),
    paddingBottom: spacing(5),
    paddingTop: spacing(1),
  },
  hero: {
    alignItems: 'center',
    gap: spacing(0.5),
    marginBottom: spacing(2),
  },
  birthLine: {
    marginTop: spacing(0.5),
  },
  section: {
    marginBottom: spacing(3.5),
  },
  paragraph: {
    marginTop: spacing(1.5),
    lineHeight: 28,
    fontFamily: fonts.light,
  },
  note: {
    marginTop: spacing(1.75),
  },
  nextList: {
    marginTop: spacing(1.5),
    gap: spacing(1.25),
  },
  nextRow: {
    flexDirection: 'row',
    gap: spacing(1.25),
  },
  nextGlyph: {
    color: colors.accent,
    width: 18,
  },
  nextText: {
    flex: 1,
    lineHeight: 21,
  },
});
