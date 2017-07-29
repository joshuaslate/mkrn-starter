import _ from 'lodash';
import { put, post, get, del } from '../../util/http-utils';
import { deleteCookie, getCookie, setCookie } from '../../util/cookie-utils';
import { updateStore, buildGenericInitialState, handleError } from '../../util/store-utils';
import { getAppUrl } from '../../util/environment-utils';

// Constants
export const CHANGE_AUTH = 'mkrn-starter/user/CHANGE_AUTH';
export const SET_POST_AUTH_PATH = 'mkrn-starter/user/SET_POST_AUTH_PATH';

const AUTH_ENDPOINT_BASE = '/auth';

// Actions
export const changeAuthentication = payload => dispatch =>
  dispatch({
    type: CHANGE_AUTH,
    payload,
  });

/**
 * login - Authenticate a user with an email and password
 * @param {Object} credentials  Login credentials (email, password)
 *
 * @returns {Promise}
 */
export const login = (credentials, desiredPath) => async (dispatch) => {
  try {
    const response = await post(dispatch, CHANGE_AUTH, `${AUTH_ENDPOINT_BASE}/login`, credentials, false);

    // If the login was successful, set the JWT as a cookie
    if (response) {
      setCookie('token', response.token, { maxAge: response.tokenExpiration });

      if (desiredPath) {
        window.location.href = `${getAppUrl()}${desiredPath}`;
      } else {
        window.location.href = `${getAppUrl()}/dashboard`;
      }
    }
  } catch (err) {
    await handleError(dispatch, err, CHANGE_AUTH);
  }
};

/**
 * Save Desired Pre-Auth Path to State
 * @param {String} payload - The desired path, saved pre-authentication
 * @returns {function}
 */
export const postAuthPath = payload => dispatch =>
  dispatch({
    type: SET_POST_AUTH_PATH,
    payload,
  });

/**
 * logoutUser  - Log user out by clearing auth state and token cookie
 */
export const logoutUser = () => (dispatch) => {
  dispatch({ type: CHANGE_AUTH, payload: {} });
  deleteCookie('token');

  window.location.href = `${getAppUrl()}/login`;
};

// Store
const INITIAL_STATE = {
  authenticated: Boolean(getCookie('token')),
  ...buildGenericInitialState([CHANGE_AUTH, SET_POST_AUTH_PATH]),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_AUTH:
      return updateStore(state, action, { authenticated: Boolean(_.get(action, 'payload.token')), user: _.get(action, 'payload.user') });
    default:
      return state;
  }
};
