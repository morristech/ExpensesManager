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
  .then(response => response.json())
  .then((response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      console.log(response)
      const error = new Error(`[${response.code}]${response.name}: ${response.message}.`)
      error.response = response;
      throw error;
    }
  })
  .catch((error) => { throw error; });
}
