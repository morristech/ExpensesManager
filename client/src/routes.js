import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App/App';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './containers/LoginPage/LoginPage';
import RegisterPage from './containers/RegisterPage/RegisterPage';
import ExpensesPage from './containers/ExpensesPage/ExpensesPageContainer';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

const requireAuth = store => (nextState, replace) => {
  if (!store.getState().auth.isLoggedIn) {
    replace({
      pathname: '/login',
    });
  }
};

export default store => (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="login" component={LoginPage} />
    <Route path="register" component={RegisterPage} />
    <Route path="expenses" component={ExpensesPage} onEnter={requireAuth(store)}/>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
