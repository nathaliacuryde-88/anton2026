import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Chart } from '../astro/engine';
import { Body, Card, Divider, Eyebrow, Title } from '../components/ui';
import { GUIDE } from '../content/guide';
import { buildPortrait } from '../content/portrait';
import { formatBirthDate, useLang } from '../i18n/LanguageContext';
import { colors, fonts, spacing } from '../theme/theme';

export default function PortraitScreen({ chart }: { chart: Chart }) {
  const { t, b, lang } = useLang();
  const sections = useMemo(() => buildPortrait(chart, lang), [chart, lang]);

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* This is the opening screen of the app, so it introduces him first. */}
      <View style={styles.hero}>
        <Eyebrow color={colors.accent}>{t('subtitle')}</Eyebrow>
        <Title size={38} style={styles.name}>
          {chart.birth.name}
        </Title>
        <Body muted italic size={15} style={styles.birthLine}>
          {formatBirthDate(lang, chart.birth.day, chart.birth.month, chart.birth.year)}
          {'  ·  '}
          {String(chart.birth.hour).padStart(2, '0')}:
          {String(chart.birth.minute).padStart(2, '0')}
        </Body>
        <Body muted italic size={15}>
          {b(chart.birth.place)}
        </Body>
      </View>

      <Body muted italic size={15} style={styles.intro}>
        {t('portraitIntro')}
      </Body>

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
              <Body size={14} italic muted>
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

      <Divider />

      <Body size={13} muted italic style={styles.signature}>
        {t('madeWith')}
      </Body>
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
  name: {
    textAlign: 'center',
    marginTop: spacing(1),
  },
  birthLine: {
    marginTop: spacing(0.5),
  },
  intro: {
    marginTop: spacing(1),
    textAlign: 'center',
    marginBottom: spacing(2),
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
  signature: {
    textAlign: 'center',
  },
});
