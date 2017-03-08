import { select, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import types from './types';
import ApiService from '../../services/ApiService';

function* createExpenseSaga(action) {
  try {
    const token = yield select(state => state.auth.user.token);
    const response = yield call(ApiService, `expenses`, 'POST', action.payload, token);
    yield put({ type: types.CREATE_EXPENSE_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: types.CREATE_EXPENSE_FAILURE, error });
  }
}

export default function* SpotDetailsSaga() {
  yield [
    takeLatest(types.CREATE_EXPENSE_REQUEST, createExpenseSaga),
  ];
}
