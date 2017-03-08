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

function* updateExpenseSaga(action) {
  try {
    const token = yield select(state => state.auth.user.token);
    const response = yield call(ApiService, `expenses/${action.payload.id}`, 'PATCH', action.payload.body, token);
    // Fetch all expenses to update table of expenses
    yield put({ type: types.FETCH_EXPENSES_REQUEST });
    yield put({ type: types.UPDATE_EXPENSE_SUCCESS });
  } catch (error) {
    yield put({ type: types.UPDATE_EXPENSE_FAILURE, error });
  }
}

function* deleteExpenseSaga(action) {
  try {
    const token = yield select(state => state.auth.user.token);
    const response = yield call(ApiService, `expenses/${action.payload}`, 'DELETE', null, token);
    // Fetch all expenses to update table of expenses
    yield put({ type: types.FETCH_EXPENSES_REQUEST });
    yield put({ type: types.DELETE_EXPENSE_SUCCESS });
  } catch (error) {
    yield put({ type: types.DELETE_EXPENSE_FAILURE, error });
  }
}

export default function* expensesSaga() {
  yield [
    takeLatest(types.CREATE_EXPENSE_REQUEST, createExpenseSaga),
    takeLatest(types.FETCH_EXPENSES_REQUEST, fetchExpensesSaga),
    takeLatest(types.UPDATE_EXPENSE_REQUEST, updateExpenseSaga),
    takeLatest(types.DELETE_EXPENSE_REQUEST, deleteExpenseSaga),
  ];
}
