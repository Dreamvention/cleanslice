import Cookies from 'js-cookie';

/**
 * Handle API authentication
 * @param token - pass token to authenticate API or leave it empty to logout API
 */
export const handleApiAuthentication = (token?: string) => {
  if (token) {
    Cookies.set('API_TOKEN', token, { expires: 30, secure: true });
  } else {
    //Logout API
    Cookies.remove(process.env.API_TOKEN || 'TOKEN');
  }
};
