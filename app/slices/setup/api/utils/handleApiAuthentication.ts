import Cookies from 'js-cookie';
import { client } from '../data/repositories/api/client.gen';
/**
 * Handle API authentication
 * @param token - pass token to authenticate API or leave it empty to logout API
 */
export const handleApiAuthentication = (token?: string) => {
  if (token) {
    Cookies.set(process.env.API_TOKEN || 'API_TOKEN', token, {
      expires: 30,
      secure: process.env.NODE_ENV !== 'development',
      domain: process.env.NODE_ENV === 'development' ? 'localhost' : undefined,
    });
    client.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    //Logout API
    Cookies.remove(process.env.API_TOKEN || 'API_TOKEN');
    delete client.instance.defaults.headers.common['Authorization'];
  }
};
