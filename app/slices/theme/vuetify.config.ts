// default vuetify.config.ts
// place it in rootDir/configs

import colors from './assets/scss/util/colors';

export default {
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.deepOrange.darken1,
          secondary: colors.blue.darken4,
        },
      },
    },
  },
};
