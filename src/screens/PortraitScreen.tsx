import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';

import { SIGNS } from '../astro/constants';
import { Chart } from '../astro/engine';
import Constellation from '../components/Constellation';
import { Breathe, Emphasis, Pop, Reveal } from '../components/motion';
import { MoonStarOrnament, SunburstOrnament } from '../components/Ornaments';
import PageHeader from '../components/PageHeader';
import { Body, Card, Divider, Eyebrow } from '../components/ui';
import { GUIDE } from '../content/guide';
import { buildPortrait } from '../content/portrait';
import { formatBirthDate, useLang } from '../i18n/LanguageContext';
import { colors, fonts, spacing, typography } from '../theme/theme';

export default function PortraitScreen({ chart }: { chart: Chart }) {
  const { t, b, lang } = useLang();
  const { width } = useWindowDimensions();
  const sections = useMemo(() => buildPortrait(chart, lang), [chart, lang]);

  const photoSize = Math.min(width - spacing(9), 260);
  const [firstName, ...restName] = chart.birth.name.split(' ');
  const sunSign = SIGNS[chart.placements.sun.signIndex];

  const caption = [
    formatBirthDate(lang, chart.birth.day, chart.birth.month, chart.birth.year),
    `${String(chart.birth.hour).padStart(2, '0')}:${String(chart.birth.minute).padStart(2, '0')}h`,
    b(chart.birth.place),
  ].join('  ·  ');

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <PageHeader />

      {/* The opening screen of the app, so it introduces him first. */}
      <Reveal distance={14}>
        <View style={styles.nameBlock}>
          <Body size={typography.pageTitle} style={styles.nameLine}>
            {firstName}
          </Body>
          {restName.length > 0 && (
            <Body size={typography.pageTitle} style={styles.nameLine}>
              {restName.join(' ')}
            </Body>
          )}
        </View>
      </Reveal>

      <View style={styles.photoWrap}>
        <Pop duration={760}>
          <Breathe periodMs={4600} scale={1.025}>
            <View
              style={[
                styles.photoCircle,
                { width: photoSize, height: photoSize, borderRadius: photoSize / 2 },
              ]}
            >
              <Constellation sign={sunSign.key} size={photoSize * 0.55} />
            </View>
          </Breathe>
        </Pop>
        <View style={[styles.ornamentTop, { right: photoSize * 0.04 }]}>
          <SunburstOrnament size={Math.round(photoSize * 0.32)} />
        </View>
        <View style={[styles.ornamentBottom, { left: photoSize * 0.02 }]}>
          <MoonStarOrnament size={Math.round(photoSize * 0.32)} />
        </View>
      </View>

      <Body muted size={14} style={styles.caption}>
        {caption}
      </Body>

      <Divider />

      {sections.map((section, i) => (
        <View key={i}>
          {i > 0 && <Divider />}
          <View style={styles.section}>
            <View style={styles.sectionHead}>
              <Eyebrow color={colors.accent} style={styles.sectionEyebrow}>
                {section.heading}
              </Eyebrow>
              {section.sign && <Constellation sign={section.sign} size={40} />}
            </View>
            {section.paragraphs.map((paragraph, j) => (
              <Body key={j} size={17} style={styles.paragraph}>
                {paragraph}
              </Body>
            ))}
            {section.note && (
              <Card tint={colors.accent} style={styles.note}>
                <Body size={14} style={styles.noteText}>
                  {section.note}
                </Body>
              </Card>
            )}
          </View>
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
            ['♡', 'navFamily', GUIDE.nextFamily],
          ] as const
        ).map(([glyph, labelKey, note]) => (
          <View key={labelKey} style={styles.nextRow}>
            <Body size={15} style={styles.nextGlyph}>
              {glyph}
            </Body>
            <Body size={14} muted style={styles.nextText}>
              <Emphasis size={14} color={colors.ink} delay={0}>
                {t(labelKey)}
              </Emphasis>
              {' — '}
              {b(note)}
            </Body>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing(2.5),
    paddingBottom: spacing(14),
  },
  nameBlock: {
    alignItems: 'center',
    marginTop: spacing(2),
  },
  nameLine: {
    fontFamily: fonts.light,
    lineHeight: typography.pageTitle * 1.14,
    letterSpacing: typography.displayTracking,
    color: colors.accent,
    textAlign: 'center',
  },
  photoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing(3),
  },
  photoCircle: {
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.cyanBright,
  },
  ornamentTop: {
    position: 'absolute',
    top: 0,
  },
  ornamentBottom: {
    position: 'absolute',
    bottom: 0,
  },
  caption: {
    textAlign: 'center',
    marginTop: spacing(2),
  },
  section: {
    marginBottom: spacing(3.5),
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionEyebrow: {
    flex: 1,
  },
  paragraph: {
    marginTop: spacing(1.5),
    lineHeight: 28,
  },
  note: {
    marginTop: spacing(1.75),
  },
  noteText: {
    color: colors.onVividMuted,
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
