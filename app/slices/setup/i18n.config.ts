// default i18n.config.ts
// place it in rootDir/configs

// import your translations here.
// you can also use localization services like https://crowdin.com/

// import enUS from "./locales/en-US";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {},
  datetimeFormats: {
    en: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      long: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
      },
      time: {
        hour: 'numeric',
        minute: 'numeric',
      },
    },
    fr: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      long: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
      },
      time: {
        hour: 'numeric',
        minute: 'numeric',
      },
    },
  },
}));
