import _ from 'lodash';
import { PENDING, SUCCESS, ERROR } from './redux-constants';

export const updateStore = (state, action, extraValues = {}) => {
  const { type = '', payload = {}, meta = { status: '' } } = action;
  switch (meta.status) {
    case SUCCESS:
      return {
        ...state,
        ...extraValues,
        messages: { ...state.messages, [type]: _.get(payload, 'message') },
        loading: { ...state.loading, [type]: false },
        errors: { ...state.errors, [type]: [] },
      };
    case ERROR:
      return {
        ...state,
        messages: { ...state.messages, [type]: '' },
        loading: { ...state.loading, [type]: false },
        errors: { ...state.errors, [type]: _.get(payload, 'data.errors') || _.get(payload, 'errors') || action.payload || [] },
      };
    case PENDING:
    default:
      return {
        ...state,
        messages: { ...state.messages, [type]: '' },
        loading: { ...state.loading, [type]: true },
        errors: { ...state.errors, [type]: [] },
      };
  }
};
