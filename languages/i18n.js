import i18next from "i18next";
import english from './English.json';
import arabic from './Arabic.json';
import { initReactI18next } from "react-i18next";
import { I18nManager } from "react-native";

I18nManager.allowRTL(false);
// I18nManager.forceRTL(false); 

i18next.use(initReactI18next).init({
    lng: 'en',
    resources:{
        en: english,
        ar:arabic,
    },
    react:{
        useSuspense:false,
    },
})

export default i18next;