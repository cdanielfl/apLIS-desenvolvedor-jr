import { createContext, useContext, useMemo, useState } from "react";
import { translations } from "./translations";

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [language, setLanguageState] = useState(() => localStorage.getItem("app_lang") || "pt");

  function setLanguage(nextLanguage) {
    const lang = nextLanguage === "en" ? "en" : "pt";
    localStorage.setItem("app_lang", lang);
    document.documentElement.lang = lang;
    setLanguageState(lang);
  }

  const value = useMemo(() => {
    function t(key) {
      return translations[language]?.[key] || translations.pt[key] || key;
    }

    return {
      language,
      setLanguage,
      t,
    };
  }, [language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n precisa estar dentro de I18nProvider");
  }
  return context;
}
