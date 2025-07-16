import { client } from '../data/repositories/api/client.gen';
/**
 * Handle API authentication
 * @param token - pass token to authenticate API or leave it empty to logout API
 */
export const handleApiAuthentication = (token?: string) => {
  if (token) {
    client.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete client.instance.defaults.headers.common['Authorization'];
  }
};
