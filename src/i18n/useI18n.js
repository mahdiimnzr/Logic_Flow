import { useState, useEffect } from "react";
import { getLang, setLang, t, subscribe } from "./index";

export const useI18n = () => {
  const [lang, setLangState] = useState(getLang);

  useEffect(() => {
    const unsubscribe = subscribe((newLang) => setLangState(newLang));
    return unsubscribe;
  }, []);

  return {
    t,
    lang,
    changeLang: setLang,
  };
};
