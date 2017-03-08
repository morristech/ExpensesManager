import types from './types';

const addExpense = expense => {
  return {
    type: types.ADD_EXPENSE,
    payload: expense
  };
};

const showModal = () => {
  return {
    type: types.SHOW_MODAL
  };
}

const hideModal = () => {
  return {
    type: types.HIDE_MODAL
  };
}

export default {
  addExpense,
  showModal,
  hideModal,
};
