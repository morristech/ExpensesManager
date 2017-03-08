const BASE_URL = 'http://localhost:8080';

export default function request(endpoint, method = 'GET', body) {
  // console.log(`Fetching ${BASE_URL}?${endpoint}&utf8=1`);
  return fetch(`${BASE_URL}/${endpoint}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
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
