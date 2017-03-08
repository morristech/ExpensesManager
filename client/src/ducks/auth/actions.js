import types from './types';

const loginRequest = (email, password) => {
  return {
    type: types.LOGIN_REQUEST,
    payload: {
      email,
      password,
    }
  };
};

const logout = () => {
  return {
    types: types.LOGOUT
  };
}

export default {
  loginRequest,
  logout
};
