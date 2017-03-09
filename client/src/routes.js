import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App/App';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './containers/LoginPage/LoginPage';
import RegisterPage from './containers/RegisterPage/RegisterPage';
import ExpensesPage from './containers/ExpensesPage/ExpensesPageContainer';
import AdminPage from './containers/AdminPage/AdminPageContainer';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

const requireAuth = store => (nextState, replace) => {
  if (!store.getState().auth.isLoggedIn) {
    replace({
      pathname: '/login',
    });
  }
};

const requireAdmin = store => (nextState, replace) => {
  const auth = store.getState().auth;
  if (!auth.isLoggedIn || (auth.user.data.roles.indexOf('manager') === -1 && auth.user.data.roles.indexOf('admin') === -1)) {
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
    <Route path="dashboard" component={ExpensesPage} onEnter={requireAuth(store)}/>
    <Route path="admin" component={AdminPage} onEnter={requireAdmin(store)}/>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
