import types from './types';

const initialState = {
  expenses: []
};
export default function expensesReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.slice().push(action.payload)
      }
    default:
      return state;
  }
}
