'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, t, TranslationKey } from './i18n';

const VALID_LANGS: Language[] = ['en', 'nl', 'pl', 'tr'];

function getInitialLang(): Language {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem('cd_lang') as Language | null;
  if (stored && VALID_LANGS.includes(stored)) return stored;
  return 'en';
}

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(getInitialLang);

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem('cd_lang', l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: (key: TranslationKey) => t(lang, key) }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
