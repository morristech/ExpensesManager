import types from './types';

const createExpense = (datetime, description, comment, amount) => {
  return {
    type: types.CREATE_EXPENSE_REQUEST,
    payload: {
      datetime,
      description,
      comment,
      amount
    }
  };
};

const fetchExpenses = () => {
  return {
    type: types.FETCH_EXPENSES_REQUEST,
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
  createExpense,
  fetchExpenses,
  showModal,
  hideModal,
};
