import types from './types';

const resetError = () => {
  return {
    type: types.RESET_ERROR,
  };
};

export default {
  resetError,
};
