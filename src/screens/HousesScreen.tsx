import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { BODIES, BODY_KEYS, SIGNS } from '../astro/constants';
import { Chart, formatDegree, splitLongitude } from '../astro/engine';
import { Body, Card, Divider, Eyebrow, Title } from '../components/ui';
import { HOUSE_MEANING } from '../content/interpretations';
import { useLang } from '../i18n/LanguageContext';
import { colors, elementColors, fonts, radii, spacing } from '../theme/theme';

/** House numbers whose cusps are the four angles of the chart. */
const ANGULAR = new Set([1, 4, 7, 10]);
const ANGLE_TAG: Record<number, string> = { 1: 'ASC', 4: 'IC', 7: 'DSC', 10: 'MC' };

export default function HousesScreen({ chart }: { chart: Chart }) {
  const { t, b } = useLang();

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Title size={30}>{t('navHouses')}</Title>
      <Body muted italic size={15} style={styles.intro}>
        {t('housesIntro')}
      </Body>
      <Eyebrow style={{ marginTop: spacing(1.5) }}>{t('housesSystem')}</Eyebrow>

      <Divider />

      <View style={styles.list}>
        {chart.cusps.map((cusp, i) => {
          const houseNumber = i + 1;
          const { sign, degreeInSign } = splitLongitude(cusp);
          const occupants = BODY_KEYS.filter(
            (k) => chart.placements[k].house === houseNumber,
          );
          const angular = ANGULAR.has(houseNumber);

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
                        <Body size={10} style={{ color: colors.gold, letterSpacing: 1 }}>
                          {ANGLE_TAG[houseNumber]}
                        </Body>
                      </View>
                    )}
                  </View>
                  <Body size={13} muted italic>
                    {b(HOUSE_MEANING[i])}
                  </Body>
                </View>
              </View>

              <View style={styles.occupants}>
                {occupants.length ? (
                  occupants.map((k) => (
                    <View key={k} style={styles.occupantChip}>
                      <Body size={15}>{BODIES[k].glyph}</Body>
                      <Body size={12} muted>
                        {b(BODIES[k].name)}
                      </Body>
                    </View>
                  ))
                ) : (
                  <Body size={12} muted italic>
                    {t('empty')}
                  </Body>
                )}
              </View>
            </Card>
          );
        })}
      </View>
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
  card: {
    gap: spacing(1.5),
  },
  angularCard: {
    borderColor: colors.butter,
    borderWidth: 1.5,
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
    backgroundColor: colors.butter,
    paddingHorizontal: spacing(0.75),
    paddingVertical: 1,
    borderRadius: radii.sm,
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
});
