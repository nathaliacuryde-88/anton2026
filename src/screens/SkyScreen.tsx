import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { BODIES, BODY_KEYS, SIGNS } from '../astro/constants';
import { Chart, formatDegree } from '../astro/engine';
import PageNav from '../components/PageNav';
import Explainer from '../components/Explainer';
import { Body, Card, Divider, Eyebrow, PageTitle } from '../components/ui';
import { GUIDE } from '../content/guide';
import { BODY_MEANING, HOUSE_MEANING } from '../content/interpretations';
import { useLang } from '../i18n/LanguageContext';
import { NavProps } from '../navigation';
import { colors, elementColors, fonts, radii, spacing } from '../theme/theme';

export default function SkyScreen({
  chart,
  ...nav
}: { chart: Chart } & NavProps) {
  const { t, b, lang } = useLang();

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <PageTitle>{t('navSky')}</PageTitle>

      <View style={styles.explainers}>
        <Explainer titleKey="skyWhat" bodyKey="skyBody" />
        <Explainer titleKey="degreesWhat" bodyKey="degreesBody" defaultOpen={false} />
        <Explainer titleKey="retrogradeWhat" bodyKey="retrogradeBody" defaultOpen={false} />
        <Explainer titleKey="stationaryWhat" bodyKey="stationaryBody" defaultOpen={false} />
      </View>

      <Divider />

      <View style={styles.list}>
        {BODY_KEYS.map((key) => {
          const p = chart.placements[key];
          const sign = SIGNS[p.signIndex];
          const def = BODIES[key];
          return (
            <Card key={key} style={styles.row}>
              <View style={styles.rowHead}>
                <View
                  style={[
                    styles.glyphBubble,
                    { backgroundColor: elementColors[sign.element].soft },
                  ]}
                >
                  <Body size={22}>{def.glyph}</Body>
                </View>

                <View style={styles.rowBody}>
                  <View style={styles.rowTop}>
                    <Body size={17} style={{ fontFamily: fonts.medium }}>
                      {b(def.name)}
                    </Body>
                    {p.retrograde && (
                      <View style={styles.rxBadge}>
                        <Body size={11} style={{ color: colors.rose }}>
                          ℞ {t('retrograde')}
                        </Body>
                      </View>
                    )}
                    {p.stationary && (
                      <View style={styles.statBadge}>
                        <Body size={11} style={{ color: colors.accent }}>
                          {t('stationary')}
                        </Body>
                      </View>
                    )}
                  </View>

                  <Body size={15} muted style={styles.position}>
                    {formatDegree(p.degreeInSign)} {sign.glyph} {b(sign.name)}
                    {'   ·   '}
                    {t('house')} {p.house}
                  </Body>
                </View>
              </View>

              {/* The placement spelled out as a sentence, so the three columns
                  above actually mean something to a first-time reader. */}
              <View style={styles.sentence}>
                <Body size={14} muted style={styles.sentenceText}>
                  <Body size={14} style={{ fontFamily: fonts.medium }}>
                    {b(def.name)}
                  </Body>
                  {lang === 'en' ? ' looks after ' : ' cuida de '}
                  {b(BODY_MEANING[key])}
                  {lang === 'en' ? '. In ' : '. Em '}
                  <Body size={14} style={{ fontFamily: fonts.medium }}>
                    {b(sign.name)}
                  </Body>
                  {lang === 'en' ? ' that happens in a ' : ' isso acontece de um jeito '}
                  {b(sign.keywords)}
                  {lang === 'en' ? ' way, and it plays out around: ' : ', e se desenrola em: '}
                  {b(HOUSE_MEANING[p.house - 1]).toLowerCase()}.
                </Body>
              </View>

              {p.retrograde && (
                <Body size={12} muted style={styles.stateNote}>
                  {lang === 'en'
                    ? 'Moving backwards from where we stand — turned inward, which is common and not a flaw.'
                    : 'Andando para trás visto daqui — voltado para dentro, o que é comum e não é defeito.'}
                </Body>
              )}
              {p.stationary && (
                <Body size={12} muted style={styles.stateNote}>
                  {lang === 'en'
                    ? 'Almost motionless that day, on the turn — rare, and it gives this planet extra weight.'
                    : 'Quase imóvel naquele dia, virando de direção — raro, e dá um peso extra a este planeta.'}
                </Body>
              )}
            </Card>
          );
        })}
      </View>

      <View style={{ marginTop: spacing(2) }}>
        <Explainer titleKey="pointsWhat" bodyKey="pointsBody" defaultOpen={false} />
      </View>

      <Divider />

      <Card tint={colors.cardTint}>
        <Eyebrow color={colors.accent}>{t('aboutTitle')}</Eyebrow>
        <Body size={14} muted style={{ marginTop: spacing(1) }}>
          {t('aboutBody')}
        </Body>
      </Card>
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
  list: {
    gap: spacing(1.25),
  },
  row: {
    gap: spacing(1.5),
    paddingVertical: spacing(2),
  },
  rowHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(1.75),
  },
  glyphBubble: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowBody: {
    flex: 1,
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(1),
    flexWrap: 'wrap',
  },
  rxBadge: {
    backgroundColor: colors.blush,
    paddingHorizontal: spacing(0.75),
    paddingVertical: 1,
    borderRadius: radii.sm,
  },
  statBadge: {
    backgroundColor: colors.accentSoft,
    paddingHorizontal: spacing(0.75),
    paddingVertical: 1,
    borderRadius: radii.sm,
  },
  position: {
    marginTop: spacing(0.25),
  },
  sentence: {
    backgroundColor: colors.paperDeep,
    borderRadius: radii.md,
    padding: spacing(1.5),
  },
  sentenceText: {
    lineHeight: 22,
  },
  stateNote: {
    lineHeight: 18,
  },
});
