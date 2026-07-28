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
import Constellation from '../components/Constellation';
import Explainer from '../components/Explainer';
import { Emphasis, Pop } from '../components/motion';
import PageHeader from '../components/PageHeader';
import { Body, Card, Divider, Eyebrow, PageTitle, Title } from '../components/ui';
import { BODY_MEANING, HOUSE_MEANING } from '../content/interpretations';
import { useLang } from '../i18n/LanguageContext';
import { colors, elementColors, radii, spacing } from '../theme/theme';

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
      <PageHeader />
      <PageTitle>{t('navChart')}</PageTitle>

      <Explainer titleKey="chartWhat" bodyKey="chartBody" />

      {/* --- wheel --- */}
      <View style={styles.wheelWrap}>
        <Pop>
          <ChartWheel
            chart={chart}
            size={wheelSize}
            selected={selected}
            onSelectBody={(k) => setSelected((cur) => (cur === k ? null : k))}
          />
        </Pop>
      </View>

      {selectedPlacement ? (
        <Card style={styles.selectedCard} tint={colors.vivid}>
          <Eyebrow color={colors.onVividMuted}>
            {b(BODIES[selectedPlacement.key].name)}
          </Eyebrow>
          <Title size={22} style={[styles.selectedTitle, { marginTop: spacing(0.5) }]}>
            {formatDegree(selectedPlacement.degreeInSign)}{' '}
            {SIGNS[selectedPlacement.signIndex].glyph}{' '}
            {b(SIGNS[selectedPlacement.signIndex].name)}
          </Title>
          <Body size={14} style={[styles.selectedBody, { marginTop: spacing(0.5) }]}>
            {b(BODY_MEANING[selectedPlacement.key])} · {t('house')}{' '}
            {selectedPlacement.house} — {b(HOUSE_MEANING[selectedPlacement.house - 1])}
          </Body>
        </Card>
      ) : (
        <Body muted size={13} style={styles.hint}>
          {lang === 'en'
            ? 'Tap a symbol in the wheel'
            : 'Toque em um símbolo na roda'}
        </Body>
      )}

      {/* --- big three --- */}
      <Eyebrow color={colors.accent} style={styles.sectionLabel}>{t('theBigThree')}</Eyebrow>
      <View style={styles.explainerGap}>
        <Explainer titleKey="bigThreeWhat" bodyKey="bigThreeBody" />
      </View>
      <View style={styles.bigThreeRow}>
        {bigThree.map((item) => (
          <Card key={item.key} style={styles.bigThreeCard}>
            <Body size={13} muted style={styles.bigThreeLabel}>
              {item.label}
            </Body>
            <View style={styles.bigThreeGlyph}>
              <Constellation sign={item.sign.key} size={58} />
            </View>
            <Emphasis size={15} color={colors.ink} style={styles.bigThreeSign}>
              {b(item.sign.name)}
            </Emphasis>
            <Body size={12} muted>
              {item.degree}
            </Body>
            <Body size={11} muted style={styles.bigThreeCaption}>
              {item.caption}
            </Body>
          </Card>
        ))}
      </View>

      {/* --- balance --- */}
      <Eyebrow color={colors.accent} style={styles.sectionLabel}>{t('balance')}</Eyebrow>
      <View style={styles.explainerGap}>
        <Explainer titleKey="balanceWhat" bodyKey="balanceBody" defaultOpen={false} />
      </View>
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
              color={[colors.accent, elementColors.water.strong, colors.periwinkle][i]}
              track={[
                elementColors.fire.soft,
                elementColors.water.soft,
                elementColors.air.soft,
              ][i]}
            />
          ))}
        </View>

        <View style={styles.innerDivider} />
        <Body size={14} muted>
          {chart.dayChart ? t('dayChart') : t('nightChart')}
        </Body>
      </Card>
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
    paddingBottom: spacing(14),
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
  selectedTitle: {
    color: colors.onVivid,
  },
  selectedBody: {
    color: colors.onVividMuted,
  },
  sectionLabel: {
    marginTop: spacing(3),
    marginBottom: spacing(1.5),
    textAlign: 'center',
  },
  explainerGap: {
    marginBottom: spacing(1.5),
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
  },
  bigThreeLabel: {
    letterSpacing: 1,
  },
  bigThreeGlyph: {
    marginTop: spacing(0.5),
  },
  bigThreeSign: {
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
});
