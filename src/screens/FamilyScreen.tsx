import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Chart } from '../astro/engine';
import Explainer from '../components/Explainer';
import PageHeader from '../components/PageHeader';
import { Body, Divider, Eyebrow, PageTitle, Title } from '../components/ui';
import { buildFamily } from '../content/family';
import { useLang } from '../i18n/LanguageContext';
import { colors, spacing } from '../theme/theme';

export default function FamilyScreen({ chart }: { chart: Chart }) {
  const { t, lang } = useLang();
  const sections = useMemo(() => buildFamily(chart, lang), [chart, lang]);

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <PageHeader />
      <PageTitle>{t('navFamily')}</PageTitle>

      {/* The framing comes before anything else: this page is about him, not
          about the two people raising him. */}
      <Explainer titleKey="familyWhat" bodyKey="familyBody" />

      <Divider />

      {sections.map((section, i) => (
        <View key={i} style={styles.section}>
          {section.kicker && (
            <Eyebrow color={colors.accent}>{section.kicker}</Eyebrow>
          )}
          <Title size={24} style={styles.heading}>
            {section.heading}
          </Title>
          {section.paragraphs.map((paragraph, j) => (
            <Body key={j} size={16} style={styles.paragraph}>
              {paragraph}
            </Body>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing(2.5),
    paddingBottom: spacing(14),
  },
  section: {
    marginBottom: spacing(3.5),
  },
  heading: {
    marginTop: spacing(0.75),
  },
  paragraph: {
    marginTop: spacing(1.5),
    lineHeight: 26,
  },
});
