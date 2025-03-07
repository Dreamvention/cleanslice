// import { createVuetify } from 'vuetify';
// import * as components from 'vuetify/components';
// import * as directives from 'vuetify/directives';
import { RouterLink } from 'vue-router';
import { createI18n } from 'vue-i18n';
import defineI18nConfig from '#setup/i18n.config';

const i18nConfig = await defineI18nConfig();

// const vuetify = createVuetify({
//   components,
//   directives,
// });
const i18n = createI18n(i18nConfig);

global.ResizeObserver = require('resize-observer-polyfill');

export const globalOptions = {
  global: {
    plugins: [
      // vuetify,
      i18n,
    ],
    components: { RouterLink },
  },
};
