// import your translations here.
// you can also use localization services like https://crowdin.com/

// import enUS from "./locales/en-US";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      welcome: 'Welcome',
    },
    fr: {
      welcome: 'Bienvenue',
    },
  },
}));
