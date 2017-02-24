import types from './types';

const addExpense = expense => {
  return {
    type: types.ADD_EXPENSE,
    payload: expense
  }
}

export default {
  addExpense,
}
