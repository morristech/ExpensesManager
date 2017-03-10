import types from './types';

const createUser = (email, password, roles) => {
  return {
    type: types.CREATE_USER_REQUEST,
    payload: {
      email,
      password,
      roles
    }
  };
};

const fetchUsers = () => {
  return {
    type: types.FETCH_USERS_REQUEST,
  };
};

const updateUser = (id, email, roles) => {
  return {
    type: types.UPDATE_USER_REQUEST,
    payload: {
      id,
      body: {
        email,
        roles
      }
    }
  };
};

// variant of updateUser, only change password
const updateUserPassword = (id, password) => {
  return {
    type: types.UPDATE_USER_REQUEST,
    payload: {
      id,
      body: {
        password
      }
    }
  };
};

const deleteUser = userId => {
  return {
    type: types.DELETE_USER_REQUEST,
    payload: userId,
  };
};

const showModal = () => {
  return {
    type: types.SHOW_MODAL
  };
};

const hideModal = () => {
  return {
    type: types.HIDE_MODAL
  };
};

export default {
  createUser,
  fetchUsers,
  updateUser,
  updateUserPassword,
  deleteUser,
  showModal,
  hideModal,
};
