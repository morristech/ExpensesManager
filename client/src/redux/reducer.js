// Set up your root reducer here...
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import expenses from '../ducks/expenses';

const rootReducer = combineReducers({
  expenses,
  routing: routerReducer
});

export default rootReducer;
