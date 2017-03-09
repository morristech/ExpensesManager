import types from './types';

const initialState = {
  isLoggedIn: false,
  isFetching: false,
  user: null
};
export default function expensesReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
    case types.REGISTER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.LOGIN_SUCCESS:
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isFetching: false,
        user: action.payload
      };
    case types.LOGIN_FAILURE:
    case types.REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case types.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };
    default:
      return state;
  }
}
