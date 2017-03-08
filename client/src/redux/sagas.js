import { fork } from 'redux-saga/effects';

import { authSagas } from '../ducks/auth';

export default function* rootSaga() {
  yield [
    fork(authSagas),
  ];
}
