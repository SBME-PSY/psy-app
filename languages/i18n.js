import i18next from "i18next";
import english from './English.json';
import arabic from './Arabic.json';
import { initReactI18next } from "react-i18next";
import { I18nManager } from "react-native";
i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    initImmediate: false,
    lng:  I18nManager.isRTL ? 'ar':'en',
    resources:{
        en: english,
        ar: arabic,
    },
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false 
    },
    react:{
        useSuspense:false,
    },
})

export default i18next;