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

const registerRequest = (email, password) => {
  return {
    type: types.REGISTER_REQUEST,
    payload: {
      email,
      password,
    }
  };
};

const logout = () => {
  return {
    type: types.LOGOUT
  };
};

export default {
  loginRequest,
  registerRequest,
  logout
};
