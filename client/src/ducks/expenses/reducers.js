import types from './types';

const initialState = {
  isFetching: false,
  expenses: [],
  filter: '',
  showingModal: false,
};
export default function expensesReducer(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_EXPENSE_REQUEST:
    case types.UPDATE_EXPENSE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.CREATE_EXPENSE_SUCCESS:
    case types.UPDATE_EXPENSE_SUCCESS:
      return {
        ...state,
        showingModal: false,
        isFetching: false,
      };
    case types.FETCH_ALL_EXPENSES_SUCCESS:
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
      };
    case types.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case types.FETCH_EXPENSES_REQUEST:
    case types.FETCH_ALL_EXPENSES_REQUEST:
    case types.CREATE_EXPENSE_FAILURE:
    case types.FETCH_EXPENSES_FAILURE:
    case types.UPDATE_EXPENSE_FAILURE:
    case types.DELETE_EXPENSE_FAILURE:
    case types.FETCH_ALL_EXPENSES_FAILURE:
      return {
        ...state,
        expenses: [],
        isFetching: false,
      };
    default:
      return state;
  }
}
