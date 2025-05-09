// src/context/language-context.tsx
'use client';

import type { PropsWithChildren } from 'react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, type Locale, type TranslationKey } from '@/lib/i18n';

interface LanguageContextType {
  language: Locale;
  setLanguage: (language: Locale) => void;
  t: (key: TranslationKey, replacements?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguageState] = useState<Locale>('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('alyka-lang') as Locale | null;
    if (storedLang && (storedLang === 'en' || storedLang === 'ja')) {
      setLanguageState(storedLang);
      document.documentElement.lang = storedLang;
    } else {
      document.documentElement.lang = 'en';
    }
  }, []);

  const setLanguage = useCallback((lang: Locale) => {
    setLanguageState(lang);
    localStorage.setItem('alyka-lang', lang);
    document.documentElement.lang = lang;
  }, []);

  const t = useCallback((key: TranslationKey, replacements?: Record<string, string>): string => {
    const langTranslations = translations[language];
    const keys = key.split('.') as string[];
    let text: any = langTranslations;

    for (const k of keys) {
      if (text && typeof text === 'object' && k in text) {
        text = text[k];
      } else {
        // Fallback to English if key not found in current language or if path is wrong
        let fallbackText: any = translations.en;
        for (const fk of keys) {
            if (fallbackText && typeof fallbackText === 'object' && fk in fallbackText) {
                fallbackText = fallbackText[fk];
            } else {
                return key; // Return the key itself if not found in English either
            }
        }
        text = fallbackText;
        break;
      }
    }
    
    if (typeof text !== 'string') {
        // If after traversing, text is not a string, try to find it in English
        let fallbackText: any = translations.en;
        for (const fk of keys) {
            if (fallbackText && typeof fallbackText === 'object' && fk in fallbackText) {
                fallbackText = fallbackText[fk];
            } else {
                return key; // Return the key itself
            }
        }
        if (typeof fallbackText === 'string') {
            text = fallbackText;
        } else {
            return key; // Return the key itself if not a string
        }
    }


    if (replacements) {
      Object.entries(replacements).forEach(([placeholder, value]) => {
        text = (text as string).replace(new RegExp(`{{${placeholder}}}`, 'g'), value);
      });
    }
    return text as string;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
