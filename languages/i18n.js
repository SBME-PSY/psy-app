import i18next from "i18next";
import english from './English.json';
import arabic from './Arabic.json';
import { initReactI18next } from "react-i18next";

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