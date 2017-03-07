import types from './types';

const initialState = {
  loggedIn: false,
  user: null
};
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.payload
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        loggedIn: false,
        user: null
      };
    default:
      return state;
  }
}
