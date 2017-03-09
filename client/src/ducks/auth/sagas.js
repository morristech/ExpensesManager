import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import types from './types';
import ApiService from '../../services/ApiService';

/**
 * Make an API call to /auth/local to request a token
 * @param {Object} action        action.payload is a { email, password } Object
 */
function* loginRequestSaga(action) {
  try {
    const response = yield call(ApiService, `auth/local`, 'POST', action.payload);
    yield put({ type: types.LOGIN_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: types.LOGIN_FAILURE, error });
  }
}

/**
 * Make an API call to /users to create a new user
 * @param {Object} action        action.payload the body of the new user
 */
function* registerRequestSaga(action) {
  try {
    const response = yield call(ApiService, `users`, 'POST', action.payload);
    yield put({ type: types.LOGIN_REQUEST, payload: action.payload });
  } catch (error) {
    yield put({ type: types.REGISTER_FAILURE, error });
  }
}

/**
 * Redirect to /login on logout
 */
function* logoutSaga() {
  yield put(push('/login'));
}


export default function* SpotDetailsSaga() {
  yield [
    takeLatest(types.LOGIN_REQUEST, loginRequestSaga),
    takeLatest(types.REGISTER_REQUEST, registerRequestSaga),
    takeLatest(types.LOGOUT, logoutSaga),
  ];
}
