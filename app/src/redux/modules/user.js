// Constants
const CHANGE_AUTH = 'user/CHANGE_AUTH';
const SET_POST_AUTH_PATH = 'user/SET_POST_AUTH_PATH';

// Actions
export const changeAuthentication = payload => dispatch =>
  dispatch({
    type: CHANGE_AUTH,
    payload,
  });

/**
 * Save Desired Pre-Auth Path to State
 * @function
 * @param {String} payload - The desired path, saved pre-authentication
 * @returns {function}
 */
export const postAuthPath = (payload) => dispatch =>
  dispatch({
    type: SET_POST_AUTH_PATH,
    payload
  });

// Store
const INITIAL_STATE = {
  authenticated: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_AUTH:
    return { ...state, authenticated: action.payload };
  default:
    return state;
  }
}
