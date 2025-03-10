import { client } from '../data/repositories/api/client.gen';
import Cookies from 'js-cookie';

export default defineNuxtPlugin((nuxtApp) => {
  client.setConfig({
    auth: () => Cookies.get('API_TOKEN'),
  });
});
