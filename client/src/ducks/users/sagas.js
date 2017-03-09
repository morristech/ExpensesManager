import { select, call, put, takeLatest } from 'redux-saga/effects';

import types from './types';
import ApiService from '../../services/ApiService';

/**
 * Make an API call to List every USERS in the database
 * Backend only allows Managers to do this
 */
function* fetchAllUsersSaga() {
  try {
    const token = yield select(state => state.auth.user.token);
    const response = yield call(ApiService, `users`, 'GET', null, token);
    yield put({ type: types.FETCH_ALL_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: types.FETCH_ALL_USERS_FAILURE, error });
  }
}

export default function* usersSaga() {
  yield [
    takeLatest(types.FETCH_ALL_USERS_REQUEST, fetchAllUsersSaga),
  ];
}
