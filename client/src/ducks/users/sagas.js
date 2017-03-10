import { select, call, put, takeLatest } from 'redux-saga/effects';

import types from './types';
import expensesTypes from '../expenses/types';
import ApiService from '../../services/ApiService';

/**
 * Make an API call to Create an User
 * @param {Object} action        action.payload is the body of the new User
 */
function* createUserSaga(action) {
  try {
    const token = yield select(state => state.auth.user.token);
    const response = yield call(ApiService, `users`, 'POST', action.payload, token);
    // Fetch all Users to update table of Users
    yield put({ type: types.FETCH_USERS_REQUEST });
    yield put({ type: types.CREATE_USER_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: types.CREATE_USER_FAILURE, error });
  }
}

/**
 * Make an API call to List all user's Users
 */
function* fetchUsersSaga() {
  try {
    const token = yield select(state => state.auth.user.token);
    const response = yield call(ApiService, `users`, 'GET', null, token);
    yield put({ type: types.FETCH_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: types.FETCH_USERS_FAILURE, error });
  }
}

/**
 * Make an API call to Update an User
 * @param {String} action.payload.id    The id of the User to be updated
 * @param {Object} action.payload.body  The body of the User to be updated
 */
function* updateUserSaga(action) {
  try {
    const token = yield select(state => state.auth.user.token);
    yield call(ApiService, `Users/${action.payload.id}`, 'PATCH', action.payload.body, token);
    // Fetch all Users to update table of Users
    yield put({ type: types.FETCH_USERS_REQUEST });
    yield put({ type: types.UPDATE_USER_SUCCESS });
  } catch (error) {
    yield put({ type: types.UPDATE_USER_FAILURE, error });
  }
}

/**
 * Make an API call to Delete an User
 * @param {Object} action        action.payload is the id of the User of be deleted
 */
function* deleteUserSaga(action) {
  try {
    const token = yield select(state => state.auth.user.token);
    yield call(ApiService, `Users/${action.payload}`, 'DELETE', null, token);
    // Fetch all Users to update table of Users
    yield put({ type: types.FETCH_USERS_REQUEST });
    // if admin, we also refetch all the expenses in the AdminPage
    const roles = yield select(state => state.auth.user.data.roles);
    if (roles.indexOf('admin') >= 0) {
      yield put({ type: expensesTypes.FETCH_ALL_EXPENSES_REQUEST });
    }
    yield put({ type: types.DELETE_USER_SUCCESS });
  } catch (error) {
    yield put({ type: types.DELETE_USER_FAILURE, error });
  }
}

export default function* UsersSaga() {
  yield [
    takeLatest(types.CREATE_USER_REQUEST, createUserSaga),
    takeLatest(types.FETCH_USERS_REQUEST, fetchUsersSaga),
    takeLatest(types.UPDATE_USER_REQUEST, updateUserSaga),
    takeLatest(types.DELETE_USER_REQUEST, deleteUserSaga),
  ];
}
