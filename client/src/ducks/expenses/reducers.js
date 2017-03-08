import types from './types';

const initialState = {
  expenses: [],
  showingModal: false,
};
export default function expensesReducer(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_EXPENSE_SUCCESS:
      return {
        ...state,
        showingModal: false,
      };
    case types.FETCH_EXPENSES_SUCCESS:
      return {
        ...state,
        expenses: action.payload
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
