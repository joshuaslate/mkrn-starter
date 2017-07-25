import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';
import userReducer from './modules/user';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const rootReducer = combineReducers({
  user: userReducer,
});

const configureStore = (initialState) => createStoreWithMiddleware(rootReducer, initialState);
export default configureStore;
