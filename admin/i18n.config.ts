import enUS from "./locales/en-US";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en: enUS,
    fr: {
      home: "Bienvenue",
    },
  },
}));
