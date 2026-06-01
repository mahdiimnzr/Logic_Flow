import translations from "./translations.js";

const DEFAULT_LANG = "fa";

let currentLang =
  (typeof window !== "undefined" ? localStorage.getItem("lang") : null) ||
  DEFAULT_LANG;

const listeners = new Set();

export const getLang = () => {
  return currentLang;
};

export const setLang = (lang) => {
  if (!translations[lang]) {
    console.warn(`Language "${lang}" not found.`);
    return;
  }
  currentLang = lang;
  localStorage.setItem("lang", lang);
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  listeners.forEach((fn) => fn(lang));
};

export const t = (key, vars = {}) => {
  const langData = translations[currentLang] || translations[DEFAULT_LANG];
  let text = key.split(".").reduce((obj, k) => obj?.[k], langData) ?? key;
  Object.entries(vars).forEach(([k, v]) => {
    text = text.replaceAll(`{${k}}`, v);
  });
  return text;
};

export const subscribe = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
