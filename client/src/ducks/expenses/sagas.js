import { select, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import types from './types';
import ApiService from '../../services/ApiService';

function* createExpenseSaga(action) {
  try {
    const token = yield select(state => state.auth.user.token);
    const response = yield call(ApiService, `expenses`, 'POST', action.payload, token);
    // Fetch all expenses to update table of expenses
    yield put({ type: types.FETCH_EXPENSES_REQUEST });
    yield put({ type: types.CREATE_EXPENSE_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: types.CREATE_EXPENSE_FAILURE, error });
  }
}

function* fetchExpensesSaga(action) {
  try {
    const token = yield select(state => state.auth.user.token);
    const response = yield call(ApiService, `expenses`, 'GET', null, token);
    yield put({ type: types.FETCH_EXPENSES_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: types.FETCH_EXPENSES_FAILURE, error });
  }
}

export default function* expensesSaga() {
  yield [
    takeLatest(types.CREATE_EXPENSE_REQUEST, createExpenseSaga),
    takeLatest(types.FETCH_EXPENSES_REQUEST, fetchExpensesSaga),
  ];
}
