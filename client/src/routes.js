import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App/App';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './containers/LoginPage/LoginPage';
import RegisterPage from './containers/RegisterPage/RegisterPage';
import Dashboard from './components/Dashboard/Dashboard';
import AdminPage from './containers/AdminPage/AdminPageContainer';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

const requireAuth = store => (nextState, replace) => {
  if (!store.getState().auth.isLoggedIn) {
    return replace({
      pathname: '/login',
    });
  }
};

const requireAdmin = store => (nextState, replace) => {
  const auth = store.getState().auth;
  // Redirect to login page if not logged in
  if (!auth.isLoggedIn) {
    return replace({
      pathname: '/login'
    });
  }
  // Redirect to homepage if not admin/manager
  if (auth.user.data.roles.indexOf('manager') === -1 && auth.user.data.roles.indexOf('admin') === -1) {
    return replace({
      pathname: '/',
    });
  }
};

const getRoutes = store => (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="login" component={LoginPage} />
    <Route path="register" component={RegisterPage} />
    <Route path="dashboard" component={Dashboard} onEnter={requireAuth(store)}/>
    <Route path="admin" component={AdminPage} onEnter={requireAdmin(store)}/>
    <Route path="*" component={NotFoundPage} />
  </Route>
);

export default getRoutes;
