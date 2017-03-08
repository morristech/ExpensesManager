import types from './types';

const initialState = {
  isLoggedIn: false,
  user: null
};
export default function expensesReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload
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
