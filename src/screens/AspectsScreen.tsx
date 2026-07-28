import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ASPECTS, BODIES, BodyKey } from '../astro/constants';
import { Aspect, Chart } from '../astro/engine';
import PageNav from '../components/PageNav';
import Explainer from '../components/Explainer';
import { Body, Card, Divider, Eyebrow, PageTitle } from '../components/ui';
import { ASPECT_MEANING, BODY_MEANING } from '../content/interpretations';
import { useLang } from '../i18n/LanguageContext';
import { NavProps } from '../navigation';
import { aspectColors, colors, fonts, radii, spacing } from '../theme/theme';

export default function AspectsScreen({
  chart,
  ...nav
}: { chart: Chart } & NavProps) {
  const { t, b, lang } = useLang();

  const nameOf = (key: Aspect['a']) =>
    key === 'asc'
      ? lang === 'en'
        ? 'Ascendant'
        : 'Ascendente'
      : key === 'mc'
        ? lang === 'en'
          ? 'Midheaven'
          : 'Meio do Céu'
        : b(BODIES[key as BodyKey].name);

  const glyphOf = (key: Aspect['a']) =>
    key === 'asc' ? 'ASC' : key === 'mc' ? 'MC' : BODIES[key as BodyKey].glyph;

  /** What the point governs, phrased for someone reading their first chart. */
  const meaningOf = (key: Aspect['a']) =>
    key === 'asc'
      ? lang === 'en'
        ? 'the way he meets the world'
        : 'o jeito como ele encontra o mundo'
      : key === 'mc'
        ? lang === 'en'
          ? 'what the world will see'
          : 'o que o mundo vai ver'
        : b(BODY_MEANING[key as BodyKey]);

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <PageTitle>{t('navAspects')}</PageTitle>

      <View style={styles.explainers}>
        <Explainer titleKey="aspectsWhat" bodyKey="aspectsBody" />
        <Explainer
          titleKey="tensionWhat"
          bodyKey="tensionBody"
          tint={colors.accentSoft + '55'}
        />
        <Explainer titleKey="orbWhat" bodyKey="orbBody" defaultOpen={false} />
        <Explainer titleKey="applyingWhat" bodyKey="applyingBody" defaultOpen={false} />
      </View>

      <Divider />

      <Eyebrow style={styles.sectionLabel}>{t('tightest')}</Eyebrow>

      <View style={styles.list}>
        {chart.aspects.map((aspect, i) => {
          const def = ASPECTS.find((d) => d.key === aspect.key)!;
          const tone = aspectColors[def.tone];
          return (
            <Card key={i} style={styles.card}>
              <View style={styles.headline}>
                <Body size={19}>{glyphOf(aspect.a)}</Body>
                <View style={[styles.aspectBadge, { backgroundColor: tone + '33' }]}>
                  <Body size={15} style={{ color: colors.ink }}>
                    {def.glyph}
                  </Body>
                </View>
                <Body size={19}>{glyphOf(aspect.b)}</Body>

                <View style={{ flex: 1 }} />

                <Body size={12} muted>
                  {t('orb')} {aspect.orb.toFixed(1)}°
                </Body>
              </View>

              <Body size={15} style={styles.names}>
                {nameOf(aspect.a)} {def.glyph} {nameOf(aspect.b)}
              </Body>

              <View style={styles.metaRow}>
                <View style={[styles.toneTag, { backgroundColor: tone + '2E' }]}>
                  <Body size={11} style={{ color: colors.ink }}>
                    {b(def.name)}
                  </Body>
                </View>
                <Body size={11} muted>
                  {aspect.applying ? t('applying') : t('separating')}
                </Body>
              </View>

              <Body size={13} muted style={styles.meaning}>
                {b(ASPECT_MEANING[aspect.key])}
              </Body>

              {/* Spelled out, so the glyphs are not the only explanation. */}
              <View style={styles.sentence}>
                <Body size={13} muted style={styles.sentenceText}>
                  {meaningOf(aspect.a)}
                  {lang === 'en' ? ' meeting ' : ' encontrando '}
                  {meaningOf(aspect.b)}
                  {lang === 'en' ? ', at ' : ', a '}
                  {def.angle}°
                  {lang === 'en' ? ' apart.' : ' de distância.'}
                </Body>
              </View>

              {/* orb strength: full bar means exact */}
              <View style={styles.track}>
                <View
                  style={[
                    styles.fill,
                    {
                      backgroundColor: tone,
                      width: `${Math.round((1 - aspect.looseness) * 100)}%`,
                    },
                  ]}
                />
              </View>
            </Card>
          );
        })}
      </View>

      <PageNav {...nav} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing(2),
    paddingBottom: spacing(5),
    paddingTop: spacing(1),
  },
  explainers: {
    marginTop: spacing(2),
    gap: spacing(1),
  },
  sectionLabel: {
    marginBottom: spacing(1.5),
  },
  sentence: {
    backgroundColor: colors.paperDeep,
    borderRadius: radii.md,
    padding: spacing(1.25),
    marginTop: spacing(0.25),
  },
  sentenceText: {
    lineHeight: 20,
  },
  list: {
    gap: spacing(1.25),
  },
  card: {
    gap: spacing(0.75),
  },
  headline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(1),
  },
  aspectBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  names: {
    fontFamily: fonts.medium,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(1),
  },
  toneTag: {
    paddingHorizontal: spacing(1),
    paddingVertical: 2,
    borderRadius: radii.sm,
  },
  meaning: {
    marginTop: spacing(0.25),
  },
  track: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.paperDeep,
    overflow: 'hidden',
    marginTop: spacing(0.5),
  },
  fill: {
    height: '100%',
    borderRadius: 2,
  },
});
