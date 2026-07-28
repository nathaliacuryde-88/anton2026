import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { Bilingual, Lang } from '../astro/constants';
import { UI, UIKey } from './strings';

type LanguageValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  /** Fixed UI copy by key. */
  t: (key: UIKey) => string;
  /** Any `{ en, pt }` pair from the astrology data. */
  b: (pair: Bilingual) => string;
};

const LanguageContext = createContext<LanguageValue | null>(null);

export function LanguageProvider({
  children,
  initial = 'en',
}: {
  children: React.ReactNode;
  initial?: Lang;
}) {
  const [lang, setLang] = useState<Lang>(initial);

  const toggle = useCallback(
    () => setLang((l) => (l === 'en' ? 'pt' : l === 'pt' ? 'de' : 'en')),
    [],
  );

  const value = useMemo<LanguageValue>(
    () => ({
      lang,
      setLang,
      toggle,
      t: (key) => UI[key][lang],
      b: (pair) => pair[lang],
    }),
    [lang, toggle],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): LanguageValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside a LanguageProvider');
  return ctx;
}

/**
 * Locale-aware date line, e.g. "26 July 2026" / "26 de julho de 2026" /
 * "26. Juli 2026".
 */
export function formatBirthDate(
  lang: Lang,
  day: number,
  month: number,
  year: number,
): string {
  const en = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const pt = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
  ];
  const de = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
  ];
  if (lang === 'en') return `${day} ${en[month - 1]} ${year}`;
  if (lang === 'de') return `${day}. ${de[month - 1]} ${year}`;
  return `${day} de ${pt[month - 1]} de ${year}`;
}
