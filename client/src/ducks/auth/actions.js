import types from './types';

const loginRequest = (username, password) => {
  return {
    type: types.LOGIN_REQUEST,
    payload: {
      username,
      password
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
  logout,
};
