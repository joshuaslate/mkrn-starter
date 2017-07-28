import _ from 'lodash';
import { put, post, get, del } from '../../util/http-utils';
import { getCookie, setCookie } from '../../util/cookie-utils';
import { updateStore } from '../../util/store-utils';

// Constants
const CHANGE_AUTH = 'mkrn-starter/user/CHANGE_AUTH';
const SET_POST_AUTH_PATH = 'mkrn-starter/user/SET_POST_AUTH_PATH';

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
export const login = credentials => async (dispatch) => {
  try {
    const response = await post(dispatch, CHANGE_AUTH, `${AUTH_ENDPOINT_BASE}/login`, credentials, false);

    // If the login was successful, set the JWT as a cookie
    setCookie('token', response.token, { maxAge: response.tokenExpiration });
  } catch (err) {
      // TODO: Handle failed login
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

// Store
const INITIAL_STATE = {
  authenticated: Boolean(getCookie('token')),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_AUTH:
      return updateStore(state, action, { authenticated: Boolean(_.get(action, 'payload.token')), user: _.get(action, 'payload.user') });
    default:
      return state;
  }
};
