// Set up your root reducer here...
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { feathersAuthentication } from '../feathers';
import expenses from '../ducks/expenses';


const rootReducer = combineReducers({
  auth: feathersAuthentication.reducer,
  expenses,
  routing: routerReducer
});

export default rootReducer;
