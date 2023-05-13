import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../common/translations/en.json";
import fa from "../common/translations/fa.json";

const resources = {
  en: {
    translation: en,
  },
  fa: {
    translation: fa,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "fa",
  debug: false,
  fallbackLng: "fa",
  saveMissing: true,
});

export default i18next;
