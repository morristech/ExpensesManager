import types from './types';

const initialState = null;
export default function errorsReducer(state = initialState, action) {
  const { type, error } = action;

  if (type === types.RESET_ERROR) {
    return null;
  } else if (error && error.response) {
    // Print nicely the details of the errors' details if they exist
    let errorDetails = '';
    if (Array.isArray(error.response.errors)) {
      errorDetails = `: ${error.response.errors.map(item => item.message).join(' - ')}`;
    } else if (typeof error.response.errors === 'object' && error.response.errors !== null) {
      errorDetails = `: ${error.response.errors.message}`;
    }
    return `${error.response.message}${errorDetails} [${error.response.code} ${error.response.name}]`;
  } else if (error) {
    return error.message || error;
  }

  return state;
}
