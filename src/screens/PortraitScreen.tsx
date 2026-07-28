import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Chart } from '../astro/engine';
import { Body, Card, Divider, Eyebrow, Title } from '../components/ui';
import { buildPortrait } from '../content/portrait';
import { useLang } from '../i18n/LanguageContext';
import { colors, fonts, spacing } from '../theme/theme';

export default function PortraitScreen({ chart }: { chart: Chart }) {
  const { t, lang } = useLang();
  const sections = useMemo(() => buildPortrait(chart, lang), [chart, lang]);

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Title size={30}>{t('navPortrait')}</Title>
      <Body muted italic size={15} style={styles.intro}>
        {t('portraitIntro')}
      </Body>

      <Divider />

      {sections.map((section, i) => (
        <View key={i} style={styles.section}>
          <Eyebrow color={colors.gold}>{section.heading}</Eyebrow>
          {section.paragraphs.map((paragraph, j) => (
            <Body key={j} size={17} style={styles.paragraph}>
              {paragraph}
            </Body>
          ))}
          {section.note && (
            <Card tint={colors.cardTint} style={styles.note}>
              <Body size={14} italic muted>
                {section.note}
              </Body>
            </Card>
          )}
        </View>
      ))}

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
  intro: {
    marginTop: spacing(1),
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
    borderColor: colors.butter,
  },
  signature: {
    textAlign: 'center',
  },
});
