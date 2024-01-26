import i18n from 'i18next';

import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
import enJSON from './translations/en';
import faJSON from './translations/fa';

const resources = {
  en: { translation: enJSON },
  fa: { translation: faJSON },
};

i18n
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    // compatibilityJSON: 'v3',
    // pluralSeparator: '-',
    keySeparator: false,
    lng: 'fa',
    fallbackLng: 'en',
    react: {
      useSuspense: true
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
