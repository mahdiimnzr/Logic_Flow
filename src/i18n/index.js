import translations from "./translations.json";

const DEFAULT_LANG = "fa";

let currentLang = localStorage.getItem("lang") || DEFAULT_LANG;

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
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr"; // RTL support
  listeners.forEach((fn) => fn(lang));
};

export const t = (key, vars = {}) => {
  const langData = translations[currentLang] || translations[DEFAULT_LANG];
  let text = langData[key] ?? key;
  Object.entries(vars).forEach(([k, v]) => {
    text = text.replace(`{${k}}`, v);
  });
  return text;
};

export const subscribe = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
