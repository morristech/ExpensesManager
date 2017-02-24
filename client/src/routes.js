import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App/App';
import HomePage from './components/HomePage/HomePage';
import ExpensesPage from './containers/ExpensesPage/ExpensesPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="expenses" component={ExpensesPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
