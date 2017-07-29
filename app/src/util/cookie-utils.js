import Cookies from 'universal-cookie';
import { getEnvironment } from './environment-utils';

const cookies = new Cookies();

/**
 * setCookie  - Sets a cookie in the user's browser
 * @param {String} name     Name/key of cookie to save
 * @param {String} value    Value to save in cookie
 * @param {Object} options  Options to override defaults
 */
export const setCookie = (name, value, options = {}) =>
  cookies.set(name, value, Object.assign({
    path: '/',
    maxAge: 604800,
    secure: getEnvironment() === 'production',
  }, options));


/**
 * getCookie  - Retrieves a cookie. Not super necessary, but it
 *              keeps things uniform
 * @param {String} name Name of cookie to get
 *
 * @returns {String}
 */
export const getCookie = name => cookies.get(name);

/**
 * deleteCookie  - Removes a cookie. Not super necessary, but it
 *                 keeps things uniform
 * @param {String} name Name of cookie to get
 */
export const deleteCookie = name => cookies.remove(name);
