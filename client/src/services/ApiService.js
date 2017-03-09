// TODO put this into env variables
const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://expenses-server.herokuapp.com' : 'http://localhost:8080';

/**
 * Helper function to make an API call to the backend. Using fetch.
 * @param  {String} endpoint The API endpoint to call.
 * @param  {String} method   The HTTP method to use (defaults to GET).
 * @param  {Object} body     Optional. The body of the request.
 * @param  {String} token    Optional. A token to be added to the Authorization header.
 * @return {Promise}         A promise with the response of the error of the request.
 */
export default function request(endpoint, method = 'GET', body, token) {
  // console.log(`Fetching ${BASE_URL}?${endpoint}&utf8=1`);

  // Set the headers, add token is necessary
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options = { method, headers };

  // Set the body is necessary
  if (body) {
    options.body = JSON.stringify(body);
  }

  return fetch(`${BASE_URL}/${endpoint}`, options)
  // Try to parse the response
  .then(response =>
    response.json().then(json => ({
      raw: response,
      json
    })
  ))
  .then((response) => {
    if (response.raw.ok) {
      return response.json;
    } else {
      const error = new Error();
      error.response = response.json;
      throw error;
    }
  })
  .catch((error) => { throw error; });
}
