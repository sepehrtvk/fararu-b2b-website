// require("intl");
// require("intl/locale-data/jsonp/fa-IR");
// require("intl/locale-data/jsonp/en-US");
import moment from "moment-jalaali";
// import { fa as momentfa } from "moment/src/locale/fa";
// moment.locale("fa", momentfa);
// moment.loadPersian({ usePersianDigits: true, dialect: "persian-modern" });

import en from "./translations/en.json";
import fa from "./translations/fa.json";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";
// const Localization = new LocalizedStrings({
//   en: en,
//   fa: fa,
// });

export const Localization = {
  en: en,
  fa: fa,
};

i18next.use(initReactI18next).init({
  Localization,
  lng: "fa",
  debug: false,
  fallbackLng: "fa",
  saveMissing: true,
});

export default i18next;

export const toLocaleCurrencyString = (price, displayCurrency) => {
  if (!price && price !== 0) {
    return "---";
  }
  let lang = Localization.getLanguage();
  if (lang === "fa") {
    return (
      new Intl.NumberFormat("fa-IR", {
        style: "decimal",
        minimumFractionDigits: 0,
      }).format(price) + (displayCurrency ? " ریال" : "")
    );
  } else {
    return new Intl.NumberFormat("en-US", {
      style: displayCurrency ? "currency" : "decimal",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  }
};

export const toLocaleNumberString = (number, useGrouping) => {
  if (!useGrouping) {
    useGrouping = false;
  }
  if (!number && number !== 0) {
    return "---";
  }
  let lang = Localization.getLanguage();
  if (lang === "fa") {
    return new Intl.NumberFormat("fa-IR", {
      style: "decimal",
      minimumFractionDigits: 0,
      useGrouping,
    }).format(number);
  } else {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      useGrouping,
    }).format(number);
  }
};

export const toLocaleDateString = (
  value,
  config = { showDate: true, showTime: false }
) => {
  if (!value) {
    return "---";
  }

  try {
    let lang = Localization.getLanguage();
    if (lang === "fa") {
      if (config.showDate && config.showTime) {
        return moment(value).format("jYYYY/jM/jD HH:mm:ss");
      } else if (config.showDate && !config.showTime) {
        return moment(value).format("jYYYY/jM/jD");
      } else if (!config.showDate && config.showTime) {
        return moment(value).format("HH:mm:ss");
      } else {
        return moment(value).format("jYYYY/jM/jD");
      }
    }

    let options = { year: "numeric", month: "numeric", day: "numeric" };
    if (config.showDate && config.showTime) {
      options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
    } else if (config.showDate && !config.showTime) {
      options = { year: "numeric", month: "numeric", day: "numeric" };
    } else if (config.showTime && !config.showDate) {
      options = { hour: "numeric", minute: "numeric", second: "numeric" };
    }

    options.timeZone = "UTC";
    return new Intl.DateTimeFormat("en-US", options).format(value);
  } catch (error) {
    return "---";
  }
};

export const convertPersianCharsToArabic = (text, convertNumbers = true) => {
  if (
    text &&
    text !== "" &&
    text !== null &&
    text !== undefined &&
    text.length > 0
  ) {
    text = text.replace(/ی/g, "ي");
    text = text.replace(/ک/g, "ك");
    text = text.replace(/د/g, "د");
    text = text.replace(/ب/g, "ب");
    text = text.replace(/ز/g, "ز");
    text = text.replace(/ذ/g, "ذ");
    text = text.replace(/ش/g, "ش");
    text = text.replace(/س/g, "س");
    if (convertNumbers) {
      text = text.replace(/۱/g, "١");
      text = text.replace(/۲/g, "٢");
      text = text.replace(/۳/g, "٣");
      text = text.replace(/۴/g, "٤");
      text = text.replace(/۵/g, "٥");
      text = text.replace(/۶/g, "٦");
      text = text.replace(/۷/g, "٧");
      text = text.replace(/۸/g, "٨");
      text = text.replace(/۹/g, "٩");
      text = text.replace(/۰/g, "٠");
    }
  }
  return text;
};

//change persian numbers to english

var persianNumbers = [
  /۰/g,
  /۱/g,
  /۲/g,
  /۳/g,
  /۴/g,
  /۵/g,
  /۶/g,
  /۷/g,
  /۸/g,
  /۹/g,
];
const arabicNumbers = [
  /٠/g,
  /١/g,
  /٢/g,
  /٣/g,
  /٤/g,
  /٥/g,
  /٦/g,
  /٧/g,
  /٨/g,
  /٩/g,
];

const englishNumbers = [
  /0/g,
  /1/g,
  /2/g,
  /3/g,
  /4/g,
  /5/g,
  /6/g,
  /7/g,
  /8/g,
  /9/g,
];

export const convertNumbersToEnglish = function (str) {
  if (typeof str === "string") {
    for (var i = 0; i < 10; i++) {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  return str;
};

var persianNumbersArray = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
export const convertNumbersToPersian = function (str) {
  if (typeof str === "string") {
    for (var i = 0; i < 10; i++) {
      str = str
        .replace(englishNumbers[i], persianNumbersArray[i])
        .replace(arabicNumbers[i], persianNumbersArray[i]);
    }
  }
  return str;
};
