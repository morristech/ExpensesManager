import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import types from './types';
import ApiService from '../../services/ApiService';

function* loginRequestSaga(action) {
  try {
    const response = yield call(ApiService, `auth/local`, 'POST', action.payload);
    yield put({ type: types.LOGIN_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: types.LOGIN_FAILURE, error });
  }
}

export default function* SpotDetailsSaga() {
  yield takeLatest(types.LOGIN_REQUEST, loginRequestSaga);
}
