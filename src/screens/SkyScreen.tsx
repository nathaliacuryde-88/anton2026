import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { BODIES, BODY_KEYS, SIGNS } from '../astro/constants';
import { Chart, formatDegree } from '../astro/engine';
import { Body, Card, Divider, Eyebrow, Title } from '../components/ui';
import { BODY_MEANING, HOUSE_MEANING } from '../content/interpretations';
import { useLang } from '../i18n/LanguageContext';
import { colors, elementColors, fonts, radii, spacing } from '../theme/theme';

export default function SkyScreen({ chart }: { chart: Chart }) {
  const { t, b } = useLang();

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Title size={30}>{t('navSky')}</Title>
      <Body muted italic size={15} style={styles.intro}>
        {t('skyIntro')}
      </Body>

      <Divider />

      <View style={styles.list}>
        {BODY_KEYS.map((key) => {
          const p = chart.placements[key];
          const sign = SIGNS[p.signIndex];
          const def = BODIES[key];
          return (
            <Card key={key} style={styles.row}>
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
                      <Body size={11} style={{ color: colors.gold }}>
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

                <Body size={13} muted italic style={styles.meaning}>
                  {b(BODY_MEANING[key])} — {b(HOUSE_MEANING[p.house - 1]).toLowerCase()}
                </Body>
              </View>
            </Card>
          );
        })}
      </View>

      <Divider />

      <Card tint={colors.cardTint}>
        <Eyebrow color={colors.gold}>{t('aboutTitle')}</Eyebrow>
        <Body size={14} muted style={{ marginTop: spacing(1) }}>
          {t('aboutBody')}
        </Body>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing(2),
    paddingBottom: spacing(5),
    paddingTop: spacing(1),
  },
  intro: {
    marginTop: spacing(1),
  },
  list: {
    gap: spacing(1.25),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(1.75),
    paddingVertical: spacing(2),
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
    backgroundColor: colors.butter,
    paddingHorizontal: spacing(0.75),
    paddingVertical: 1,
    borderRadius: radii.sm,
  },
  position: {
    marginTop: spacing(0.25),
  },
  meaning: {
    marginTop: spacing(0.5),
  },
});
