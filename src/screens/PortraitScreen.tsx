import React, { useMemo } from 'react';
import { Animated, Image, StyleSheet, useWindowDimensions, View } from 'react-native';

import { Chart } from '../astro/engine';
import Constellation from '../components/Constellation';
import { Breathe, Emphasis, Parallax, Pop, Reveal, useParallaxScroll } from '../components/motion';
import { MoonStarOrnament, SunburstOrnament } from '../components/Ornaments';
import PageHeader from '../components/PageHeader';
import ThemeIcon from '../components/ThemeIcons';
import { Body, Card, Divider, Eyebrow } from '../components/ui';
import { GUIDE } from '../content/guide';
import { buildPortrait } from '../content/portrait';
import { formatBirthDate, useLang } from '../i18n/LanguageContext';
import { colors, fonts, spacing, typography } from '../theme/theme';

export default function PortraitScreen({ chart }: { chart: Chart }) {
  const { t, b, lang } = useLang();
  const { width } = useWindowDimensions();
  const sections = useMemo(() => buildPortrait(chart, lang), [chart, lang]);
  const { scrollY, onScroll } = useParallaxScroll();

  const photoSize = Math.min(width - spacing(9), 260);
  const [firstName, ...restName] = chart.birth.name.split(' ');

  const caption = [
    formatBirthDate(lang, chart.birth.day, chart.birth.month, chart.birth.year),
    `${String(chart.birth.hour).padStart(2, '0')}:${String(chart.birth.minute).padStart(2, '0')}h`,
    b(chart.birth.place),
  ].join('  ·  ');

  return (
    <Animated.ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      onScroll={onScroll}
      scrollEventThrottle={16}
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
              <Image
                source={require('../../assets/anton-photo.png')}
                resizeMode="cover"
                style={{ width: photoSize, height: photoSize, borderRadius: photoSize / 2 }}
              />
            </View>
          </Breathe>
        </Pop>
        <View style={[styles.ornamentTop, { right: photoSize * 0.04 }]}>
          <Parallax scrollY={scrollY} factor={-0.1}>
            <SunburstOrnament size={Math.round(photoSize * 0.32)} />
          </Parallax>
        </View>
        <View style={[styles.ornamentBottom, { left: photoSize * 0.02 }]}>
          <Parallax scrollY={scrollY} factor={-0.07}>
            <MoonStarOrnament size={Math.round(photoSize * 0.32)} />
          </Parallax>
        </View>
      </View>

      <Body muted size={14} style={styles.caption}>
        {caption}
      </Body>

      <Divider />

      {sections.map((section, i) => {
        const [firstParagraph, ...restParagraphs] = section.paragraphs;
        const reverse = i % 2 === 1;
        return (
          <View key={i}>
            {i > 0 && <Divider />}
            <View style={styles.section}>
              <View style={[styles.sectionHead, reverse && styles.sectionHeadReverse]}>
                {section.sign && (
                  <Parallax scrollY={scrollY} factor={reverse ? -0.08 : -0.05}>
                    <Constellation
                      sign={section.sign}
                      size={92}
                      style={[
                        styles.sectionIllu,
                        { transform: [{ rotate: reverse ? '6deg' : '-6deg' }] },
                      ]}
                    />
                  </Parallax>
                )}
                {section.icon && (
                  <Breathe periodMs={2400} scale={1.1}>
                    <ThemeIcon
                      kind={section.icon}
                      size={48}
                      style={[
                        styles.sectionIllu,
                        { transform: [{ rotate: reverse ? '6deg' : '-6deg' }] },
                      ]}
                    />
                  </Breathe>
                )}
                <View style={styles.sectionHeadText}>
                  <Eyebrow color={colors.accent}>{section.heading}</Eyebrow>
                  {firstParagraph && (
                    <Body size={17} style={styles.paragraph}>
                      {firstParagraph}
                    </Body>
                  )}
                </View>
              </View>
              {restParagraphs.map((paragraph, j) => (
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
        );
      })}

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
    </Animated.ScrollView>
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
    alignItems: 'flex-start',
    gap: spacing(2),
  },
  sectionHeadReverse: {
    flexDirection: 'row-reverse',
  },
  sectionIllu: {
    flexShrink: 0,
    marginTop: spacing(0.25),
  },
  sectionHeadText: {
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
