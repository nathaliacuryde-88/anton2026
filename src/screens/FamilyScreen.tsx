import React, { useMemo } from 'react';
import { Animated, StyleSheet, useWindowDimensions, View } from 'react-native';

import { Chart } from '../astro/engine';
import Constellation from '../components/Constellation';
import Explainer from '../components/Explainer';
import { Parallax, useParallaxScroll } from '../components/motion';
import PageHeader from '../components/PageHeader';
import PhotoStack from '../components/PhotoStack';
import { Body, Divider, Eyebrow, PageTitle, Title } from '../components/ui';
import { buildFamily } from '../content/family';
import { useLang } from '../i18n/LanguageContext';
import { colors, spacing } from '../theme/theme';

export default function FamilyScreen({ chart }: { chart: Chart }) {
  const { t, lang } = useLang();
  const { width } = useWindowDimensions();
  const sections = useMemo(() => buildFamily(chart, lang), [chart, lang]);
  const { scrollY, onScroll } = useParallaxScroll();
  const stackSize = Math.min(width - spacing(6), 288);

  return (
    <Animated.ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      onScroll={onScroll}
      scrollEventThrottle={16}
    >
      <PageHeader />
      <PageTitle>{t('navFamily')}</PageTitle>

      <View style={styles.stackWrap}>
        <PhotoStack size={stackSize} />
      </View>

      {/* The framing comes before anything else: this page is about him, not
          about the two people raising him. */}
      <Explainer titleKey="familyWhat" bodyKey="familyBody" />

      <Divider />

      {sections.map((section, i) => {
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
                      size={88}
                      style={[
                        styles.sectionIllu,
                        { transform: [{ rotate: reverse ? '6deg' : '-6deg' }] },
                      ]}
                    />
                  </Parallax>
                )}
                <View style={styles.sectionHeadText}>
                  {section.kicker && (
                    <Eyebrow color={colors.accent}>{section.kicker}</Eyebrow>
                  )}
                  <Title size={24} style={styles.heading}>
                    {section.heading}
                  </Title>
                </View>
              </View>
              {section.paragraphs.map((paragraph, j) => (
                <Body key={j} size={16} style={styles.paragraph}>
                  {paragraph}
                </Body>
              ))}
            </View>
          </View>
        );
      })}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing(2.5),
    paddingBottom: spacing(14),
  },
  stackWrap: {
    alignItems: 'center',
    marginTop: spacing(1.5),
    marginBottom: spacing(3),
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
  heading: {
    marginTop: spacing(0.25),
  },
  paragraph: {
    marginTop: spacing(1.5),
    lineHeight: 26,
  },
});
