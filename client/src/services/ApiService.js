const BASE_URL = 'http://localhost:8080';

export default function request(endpoint, method = 'GET', body, token) {
  // console.log(`Fetching ${BASE_URL}?${endpoint}&utf8=1`);
  //
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options = { method, headers };
  if (body) {
    options.body = JSON.stringify(body);
  }

  return fetch(`${BASE_URL}/${endpoint}`, options)
  .then((response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new Error('An error occured.')
      error.response = response;
      throw error;
    }
  })
  .then(response => response.json())
  .catch((error) => { throw error; });
}
