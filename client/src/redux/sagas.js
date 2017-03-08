import { fork } from 'redux-saga/effects';

import { authSagas } from '../ducks/auth';
import { expensesSagas } from '../ducks/expenses';

export default function* rootSaga() {
  yield [
    fork(authSagas),
    fork(expensesSagas),
  ];
}
