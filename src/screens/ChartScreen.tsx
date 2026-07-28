import React, { useState } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';

import {
  BODIES,
  BodyKey,
  ELEMENT_NAMES,
  Element,
  MODALITY_NAMES,
  Modality,
  SIGNS,
} from '../astro/constants';
import { Chart, formatDegree, splitLongitude } from '../astro/engine';
import ChartWheel from '../components/ChartWheel';
import { Body, Card, Divider, Eyebrow, Title } from '../components/ui';
import { BODY_MEANING, HOUSE_MEANING } from '../content/interpretations';
import { formatBirthDate, useLang } from '../i18n/LanguageContext';
import { colors, elementColors, fonts, radii, spacing } from '../theme/theme';

export default function ChartScreen({ chart }: { chart: Chart }) {
  const { t, b, lang } = useLang();
  const { width } = useWindowDimensions();
  const [selected, setSelected] = useState<BodyKey | null>(null);

  const wheelSize = Math.min(width - spacing(4), 420);
  const sun = chart.placements.sun;
  const moon = chart.placements.moon;
  const asc = splitLongitude(chart.asc);

  const bigThree = [
    {
      key: 'sun' as const,
      label: t('sunLabel'),
      caption: t('sunCaption'),
      glyph: '☉',
      sign: SIGNS[sun.signIndex],
      degree: formatDegree(sun.degreeInSign),
    },
    {
      key: 'moon' as const,
      label: t('moonLabel'),
      caption: t('moonCaption'),
      glyph: '☽',
      sign: SIGNS[moon.signIndex],
      degree: formatDegree(moon.degreeInSign),
    },
    {
      key: 'asc' as const,
      label: t('risingLabel'),
      caption: t('risingCaption'),
      glyph: 'ASC',
      sign: asc.sign,
      degree: formatDegree(asc.degreeInSign),
    },
  ];

  const selectedPlacement = selected ? chart.placements[selected] : null;

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* --- hero --- */}
      <View style={styles.hero}>
        <Eyebrow color={colors.gold}>{t('subtitle')}</Eyebrow>
        <Title size={40} style={styles.name}>
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

      <Divider />

      {/* --- wheel --- */}
      <View style={styles.wheelWrap}>
        <ChartWheel
          chart={chart}
          size={wheelSize}
          selected={selected}
          onSelectBody={(k) => setSelected((cur) => (cur === k ? null : k))}
        />
      </View>

      {selectedPlacement ? (
        <Card style={styles.selectedCard} tint={colors.cardTint}>
          <Eyebrow color={colors.gold}>
            {b(BODIES[selectedPlacement.key].name)}
          </Eyebrow>
          <Title size={22} style={{ marginTop: spacing(0.5) }}>
            {formatDegree(selectedPlacement.degreeInSign)}{' '}
            {SIGNS[selectedPlacement.signIndex].glyph}{' '}
            {b(SIGNS[selectedPlacement.signIndex].name)}
          </Title>
          <Body muted italic size={14} style={{ marginTop: spacing(0.5) }}>
            {b(BODY_MEANING[selectedPlacement.key])} · {t('house')}{' '}
            {selectedPlacement.house} — {b(HOUSE_MEANING[selectedPlacement.house - 1])}
          </Body>
        </Card>
      ) : (
        <Body muted italic size={13} style={styles.hint}>
          {lang === 'en'
            ? 'Tap a symbol in the wheel'
            : 'Toque em um símbolo na roda'}
        </Body>
      )}

      {/* --- big three --- */}
      <Eyebrow style={styles.sectionLabel}>{t('theBigThree')}</Eyebrow>
      <View style={styles.bigThreeRow}>
        {bigThree.map((item) => (
          <Card
            key={item.key}
            style={styles.bigThreeCard}
            tint={elementColors[item.sign.element].soft}
          >
            <Body size={13} muted style={styles.bigThreeLabel}>
              {item.label}
            </Body>
            <Body size={26} style={styles.bigThreeGlyph}>
              {item.sign.glyph}
            </Body>
            <Body size={15} style={styles.bigThreeSign}>
              {b(item.sign.name)}
            </Body>
            <Body size={12} muted>
              {item.degree}
            </Body>
            <Body size={11} muted italic style={styles.bigThreeCaption}>
              {item.caption}
            </Body>
          </Card>
        ))}
      </View>

      {/* --- balance --- */}
      <Eyebrow style={styles.sectionLabel}>{t('balance')}</Eyebrow>
      <Card>
        <Body size={12} muted style={{ letterSpacing: 1 }}>
          {t('elements')}
        </Body>
        <View style={styles.barRow}>
          {(['fire', 'earth', 'air', 'water'] as Element[]).map((el) => (
            <BalanceBar
              key={el}
              label={b(ELEMENT_NAMES[el])}
              value={chart.elementCounts[el]}
              total={11}
              color={elementColors[el].strong}
              track={elementColors[el].soft}
            />
          ))}
        </View>

        <View style={styles.innerDivider} />

        <Body size={12} muted style={{ letterSpacing: 1 }}>
          {t('modalities')}
        </Body>
        <View style={styles.barRow}>
          {(['cardinal', 'fixed', 'mutable'] as Modality[]).map((m, i) => (
            <BalanceBar
              key={m}
              label={b(MODALITY_NAMES[m])}
              value={chart.modalityCounts[m]}
              total={11}
              color={[colors.rose, colors.blue, colors.green][i]}
              track={[colors.blush, colors.sky, colors.mint][i]}
            />
          ))}
        </View>

        <View style={styles.innerDivider} />
        <Body size={14} italic muted>
          {chart.dayChart ? t('dayChart') : t('nightChart')}
        </Body>
      </Card>

      <Divider />
      <Body size={12} muted italic style={styles.footer}>
        {t('madeWith')}
      </Body>
    </ScrollView>
  );
}

function BalanceBar({
  label,
  value,
  total,
  color,
  track,
}: {
  label: string;
  value: number;
  total: number;
  color: string;
  track: string;
}) {
  return (
    <View style={styles.barItem}>
      <View style={styles.barHeader}>
        <Body size={14}>{label}</Body>
        <Body size={14} muted>
          {value}
        </Body>
      </View>
      <View style={[styles.barTrack, { backgroundColor: track }]}>
        <View
          style={[
            styles.barFill,
            {
              backgroundColor: color,
              width: `${Math.round((value / total) * 100)}%`,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing(2),
    paddingBottom: spacing(5),
  },
  hero: {
    alignItems: 'center',
    paddingTop: spacing(1),
    gap: spacing(0.5),
  },
  name: {
    textAlign: 'center',
    marginTop: spacing(1),
  },
  birthLine: {
    marginTop: spacing(0.5),
  },
  wheelWrap: {
    alignItems: 'center',
    marginVertical: spacing(1),
  },
  hint: {
    textAlign: 'center',
    marginTop: spacing(1),
  },
  selectedCard: {
    marginTop: spacing(1.5),
  },
  sectionLabel: {
    marginTop: spacing(3),
    marginBottom: spacing(1.5),
    textAlign: 'center',
  },
  bigThreeRow: {
    flexDirection: 'row',
    gap: spacing(1.25),
  },
  bigThreeCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing(2),
    paddingHorizontal: spacing(1),
    borderColor: 'transparent',
  },
  bigThreeLabel: {
    letterSpacing: 1,
  },
  bigThreeGlyph: {
    marginTop: spacing(0.5),
  },
  bigThreeSign: {
    fontFamily: fonts.medium,
    marginTop: spacing(0.25),
    textAlign: 'center',
  },
  bigThreeCaption: {
    marginTop: spacing(0.75),
    textAlign: 'center',
  },
  barRow: {
    marginTop: spacing(1.25),
    gap: spacing(1.25),
  },
  barItem: {
    gap: spacing(0.5),
  },
  barHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  barTrack: {
    height: 7,
    borderRadius: radii.sm,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: radii.sm,
  },
  innerDivider: {
    height: 1,
    backgroundColor: colors.hairline,
    marginVertical: spacing(2),
  },
  footer: {
    textAlign: 'center',
  },
});
