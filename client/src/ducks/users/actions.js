import types from './types';

const fetchAllUsers = () => {
  return {
    type: types.FETCH_ALL_USERS_REQUEST,
  };
};

export default {
  fetchAllUsers,
};
