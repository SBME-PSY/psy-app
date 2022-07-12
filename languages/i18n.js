import i18next from 'i18next';
import english from './English.json';
import arabic from './Arabic.json';
import { initReactI18next } from "react-i18next";
import { I18nManager } from 'react-native';
i18next.use(initReactI18next).init({
    compatibilityJSON:'v3',
    resources:{
        en: english,
        ar: arabic
    },
    lng: I18nManager.isRTL ? 'ar':'en',
    fallbackLng: 'ar',
    interpolation:{
        escapeValue:false
    },
    cleanCode:true
})

export default i18next;