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

const updateExpense = (id, datetime, description, comment, amount) => {
  return {
    type: types.UPDATE_EXPENSE_REQUEST,
    payload: {
      id,
      body: {
        datetime,
        description,
        comment,
        amount
      }
    }
  };
};

const deleteExpense = expenseId => {
  return {
    type: types.DELETE_EXPENSE_REQUEST,
    payload: expenseId,
  };
};

const fetchAllExpenses = () => {
  return {
    type: types.FETCH_ALL_EXPENSES_REQUEST,
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

const setFilter = filter => {
  return {
    type: types.SET_FILTER,
    payload: filter,
  };
}

export default {
  createExpense,
  fetchExpenses,
  updateExpense,
  deleteExpense,
  fetchAllExpenses,
  showModal,
  hideModal,
  setFilter,
};
