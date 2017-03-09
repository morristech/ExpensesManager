// Set up your root reducer here...
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';

import auth from '../ducks/auth';
import expenses from '../ducks/expenses';
import users from '../ducks/users';
import errors from '../ducks/errors';


const rootReducer = combineReducers({
  auth,
  expenses,
  users,
  routing: routerReducer,
  form: reduxFormReducer,
  errors,
});

export default rootReducer;
