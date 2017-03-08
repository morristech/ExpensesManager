import types from './types';

const initialState = {
  expenses: [],
  showingModal: false,
};
export default function expensesReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.slice().push(action.payload)
      };
    case types.SHOW_MODAL:
      return {
        ...state,
        showingModal: true,
      };
    case types.HIDE_MODAL:
      return {
        ...state,
        showingModal: false,
      }
    default:
      return state;
  }
}
