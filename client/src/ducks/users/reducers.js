import types from './types';

const initialState = {
  isFetching: false,
  users: [],
  filter: '',
  showingModal: false,
};
export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_USER_REQUEST:
    case types.UPDATE_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.CREATE_USER_SUCCESS:
    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        showingModal: false,
        isFetching: false,
      };
    case types.FETCH_ALL_USERS_SUCCESS:
    case types.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload
      };
    case types.SHOW_MODAL:
      return {
        ...state,
        showingModal: true,
      };
    case types.HIDE_MODAL:
      return {
        ...state,
        showingModal: false,
      };
    case types.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case types.FETCH_USERS_REQUEST:
    case types.CREATE_USER_FAILURE:
    case types.FETCH_USERS_FAILURE:
    case types.UPDATE_USER_FAILURE:
    case types.DELETE_USER_FAILURE:
      return {
        ...state,
        users: [],
        isFetching: false,
      };
    default:
      return state;
  }
}
