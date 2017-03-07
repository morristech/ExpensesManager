// Set up your root reducer here...
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from '../ducks/auth';
import expenses from '../ducks/expenses';

const rootReducer = combineReducers({
  auth,
  expenses,
  routing: routerReducer
});

export default rootReducer;
