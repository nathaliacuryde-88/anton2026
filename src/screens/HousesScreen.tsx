import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { BODIES, BODY_KEYS, SIGNS, SIGN_RULER } from '../astro/constants';
import { Chart, formatDegree, splitLongitude } from '../astro/engine';
import PageNav from '../components/PageNav';
import Explainer from '../components/Explainer';
import { Body, Card, Divider, Eyebrow, PageTitle } from '../components/ui';
import { GUIDE } from '../content/guide';
import { HOUSE_MEANING } from '../content/interpretations';
import { useLang } from '../i18n/LanguageContext';
import { NavProps } from '../navigation';
import { colors, elementColors, fonts, radii, spacing } from '../theme/theme';

/** House numbers whose cusps are the four angles of the chart. */
const ANGULAR = new Set([1, 4, 7, 10]);
const ANGLE_TAG: Record<number, string> = { 1: 'ASC', 4: 'IC', 7: 'DSC', 10: 'MC' };

export default function HousesScreen({
  chart,
  ...nav
}: { chart: Chart } & NavProps) {
  const { t, b, lang } = useLang();

  const emptyCount = chart.cusps.filter(
    (_, i) => !BODY_KEYS.some((k) => chart.placements[k].house === i + 1),
  ).length;

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <PageTitle>{t('navHouses')}</PageTitle>

      <View style={styles.explainers}>
        <Explainer titleKey="housesWhat" bodyKey="housesBody" />
        <Explainer titleKey="emptyHouseWhat" bodyKey="emptyHouseBody" tint={colors.accentSoft + '55'} />
        <Explainer titleKey="angularWhat" bodyKey="angularBody" defaultOpen={false} />
      </View>

      <Body size={13} muted style={styles.tally}>
        {lang === 'en'
          ? `${emptyCount} of the twelve are quiet in this chart — an ordinary number.`
          : `${emptyCount} das doze estão tranquilas neste mapa — um número comum.`}
      </Body>

      <Divider />
      <Eyebrow style={styles.systemLabel}>{t('housesSystem')}</Eyebrow>

      <View style={styles.list}>
        {chart.cusps.map((cusp, i) => {
          const houseNumber = i + 1;
          const { sign, degreeInSign } = splitLongitude(cusp);
          const occupants = BODY_KEYS.filter(
            (k) => chart.placements[k].house === houseNumber,
          );
          const angular = ANGULAR.has(houseNumber);

          // For a house with nobody in it, the sign's ruling planet is the
          // thread to follow — so show where that planet actually landed.
          const rulerKey = SIGN_RULER[sign.key];
          const ruler = chart.placements[rulerKey];
          const rulerSign = SIGNS[ruler.signIndex];

          return (
            <Card
              key={houseNumber}
              style={[styles.card, angular && styles.angularCard]}
            >
              <View style={styles.cardHeader}>
                <View
                  style={[
                    styles.numberBubble,
                    { backgroundColor: elementColors[sign.element].soft },
                  ]}
                >
                  <Body size={16} style={{ fontFamily: fonts.medium }}>
                    {houseNumber}
                  </Body>
                </View>

                <View style={{ flex: 1 }}>
                  <View style={styles.headerTop}>
                    <Body size={16} style={{ fontFamily: fonts.medium }}>
                      {formatDegree(degreeInSign)} {sign.glyph} {b(sign.name)}
                    </Body>
                    {angular && (
                      <View style={styles.angleTag}>
                        <Body size={10} style={{ color: colors.accent, letterSpacing: 1 }}>
                          {ANGLE_TAG[houseNumber]}
                        </Body>
                      </View>
                    )}
                  </View>
                  <Body size={13} muted>
                    {b(HOUSE_MEANING[i])}
                  </Body>
                </View>
              </View>

              {occupants.length ? (
                <View>
                  <Body size={12} muted style={styles.sectionHint}>
                    {lang === 'en' ? 'Living here' : 'Morando aqui'}
                  </Body>
                  <View style={styles.occupants}>
                    {occupants.map((k) => (
                      <View key={k} style={styles.occupantChip}>
                        <Body size={15}>{BODIES[k].glyph}</Body>
                        <Body size={12} muted>
                          {b(BODIES[k].name)}
                        </Body>
                      </View>
                    ))}
                  </View>
                </View>
              ) : (
                <View style={styles.quiet}>
                  <Body size={13} muted style={styles.quietLead}>
                    {b(GUIDE.emptyHouseShort)}
                  </Body>
                  <Body size={13} muted style={styles.rulerLine}>
                    {b(GUIDE.rulerNote)}{' '}
                    <Body size={13} style={{ fontFamily: fonts.medium }}>
                      {BODIES[rulerKey].glyph} {b(BODIES[rulerKey].name)}
                    </Body>
                    {lang === 'en' ? ' in ' : ' em '}
                    {b(rulerSign.name)}
                    {lang === 'en'
                      ? `, house ${ruler.house}`
                      : `, casa ${ruler.house}`}
                  </Body>
                </View>
              )}
            </Card>
          );
        })}
      </View>

      <View style={{ marginTop: spacing(2) }}>
        <Explainer titleKey="rulerWhat" bodyKey="rulerHint" defaultOpen={false} />
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
  tally: {
    marginTop: spacing(1.5),
    textAlign: 'center',
  },
  systemLabel: {
    marginBottom: spacing(1.5),
    textAlign: 'center',
  },
  list: {
    gap: spacing(1.25),
  },
  card: {
    gap: spacing(1.5),
  },
  angularCard: {
    backgroundColor: colors.cardWarm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(1.5),
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(1),
  },
  numberBubble: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  angleTag: {
    backgroundColor: colors.card,
    paddingHorizontal: spacing(0.75),
    paddingVertical: 1,
    borderRadius: radii.sm,
  },
  sectionHint: {
    letterSpacing: 1,
    marginBottom: spacing(0.75),
  },
  occupants: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing(1),
  },
  occupantChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(0.5),
    backgroundColor: colors.paperDeep,
    paddingHorizontal: spacing(1),
    paddingVertical: spacing(0.5),
    borderRadius: radii.sm,
  },
  quiet: {
    backgroundColor: colors.paperDeep,
    borderRadius: radii.md,
    padding: spacing(1.5),
    gap: spacing(0.75),
  },
  quietLead: {
    lineHeight: 20,
  },
  rulerLine: {
    lineHeight: 20,
  },
});
