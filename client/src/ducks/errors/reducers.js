import types from './types';

const initialState = null;
export default function errorsReducer(state = initialState, action) {
  const { type, error } = action;

  if (type === types.RESET_ERROR) {
    return null;
  } else if (error && error.response) {
    // Print nicely the details of the errors' details if they exist
    console.log(typeof error.response.errors);
    const errorDetails = (Array.isArray(error.response.errors)) ? `: ${error.response.errors.map(item => item.message).join(' - ')}` : '';
    return `${error.response.message}${errorDetails} [${error.response.code} ${error.response.name}]`;
  }

  return state;
}
