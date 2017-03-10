import { select, call, put, takeLatest } from 'redux-saga/effects';

import types from './types';
import ApiService from '../../services/ApiService';

/**
 * Make an API call to Create an expense
 * @param {Object} action        action.payload is the body of the new expense
 */
function* createExpenseSaga(action) {
  try {
    const token = yield select(state => state.auth.user.token);
    const response = yield call(ApiService, `expenses`, 'POST', action.payload, token);
    // Fetch all expenses to update table of expenses
    // yield put({ type: types.FETCH_EXPENSES_REQUEST });
    yield put({ type: types.CREATE_EXPENSE_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: types.CREATE_EXPENSE_FAILURE, error });
  }
}

/**
 * Make an API call to List all user's expenses
 */
function* fetchExpensesSaga() {
  try {
    const token = yield select(state => state.auth.user.token);
    const response = yield call(ApiService, `expenses?$limit=20&$sort[datetime]=1`, 'GET', null, token);
    yield put({ type: types.FETCH_EXPENSES_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: types.FETCH_EXPENSES_FAILURE, error });
  }
}

/**
 * Make an API call to List every expenses in the database
 * Backend only allows Admin to do this
 */
function* fetchAllExpensesSaga() {
  try {
    const token = yield select(state => state.auth.user.token);
    const response = yield call(ApiService, `expenses?all=true&$limit=20&$sort[datetime]=1`, 'GET', null, token);
    yield put({ type: types.FETCH_ALL_EXPENSES_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: types.FETCH_ALL_EXPENSES_FAILURE, error });
  }
}

/**
 * Make an API call to Update an expense
 * @param {String} action.payload.id    The id of the expense to be updated
 * @param {Object} action.payload.body  The body of the expense to be updated
 */
function* updateExpenseSaga(action) {
  try {
    const token = yield select(state => state.auth.user.token);
    yield call(ApiService, `expenses/${action.payload.id}`, 'PATCH', action.payload.body, token);
    // Fetch all expenses to update table of expenses
    // yield put({ type: types.FETCH_EXPENSES_REQUEST });
    yield put({ type: types.UPDATE_EXPENSE_SUCCESS });
  } catch (error) {
    yield put({ type: types.UPDATE_EXPENSE_FAILURE, error });
  }
}

/**
 * Make an API call to Delete an expense
 * @param {Object} action        action.payload is the id of the expense of be deleted
 */
function* deleteExpenseSaga(action) {
  try {
    const token = yield select(state => state.auth.user.token);
    yield call(ApiService, `expenses/${action.payload}`, 'DELETE', null, token);
    // Fetch all expenses to update table of expenses
    // yield put({ type: types.FETCH_EXPENSES_REQUEST });
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
    takeLatest(types.FETCH_ALL_EXPENSES_REQUEST, fetchAllExpensesSaga),
  ];
}
