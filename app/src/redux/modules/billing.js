import _ from 'lodash';
import { APP_NAMESPACE } from '../../util/redux-constants';
import { put, post, get, del } from '../../util/http-utils';
import { updateStore, buildGenericInitialState, handleError } from '../../util/store-utils';

const BILLING_ENDPOINT_BASE = 'billing';
const typeBase = `${APP_NAMESPACE}/${BILLING_ENDPOINT_BASE}/`;

// Constants
export const CREATE_SUBSCRIPTION = `${typeBase}CREATE_SUBSCRIPTION`;

// Actions

/**
 * createSubscription - Create a new Stripe subscription
 * @param {Object} formData {stripeToken, plan, isTrial, quantity}
 */
export const createSubscription = formData => async (dispatch) => {
  try {
    await post(dispatch, CREATE_SUBSCRIPTION, `${BILLING_ENDPOINT_BASE}/subscription`, formData, true);
  } catch (err) {
    await handleError(dispatch, err, CREATE_SUBSCRIPTION);
  }
};

// Store
const INITIAL_STATE = {
  ...buildGenericInitialState([CREATE_SUBSCRIPTION]),
  id: '',
  sources: [],
  subscriptions: [],
  invoices: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_SUBSCRIPTION:
      return updateStore(state, action, _.get(action, 'payload.customer')
        ? {
          id: action.payload.customer.id,
          sources: _.get(action, 'payload.customer.sources.data') || [],
          subscriptions: _.get(action, 'payload.customer.subscriptions.data') || [],
        }
        : {});
    default:
      return state;
  }
};
