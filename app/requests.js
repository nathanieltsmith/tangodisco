import 'whatwg-fetch'

export function jsonRequest (method, route, body) {
  return fetch(route, {
    method: method,
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(function (response) {
      return response.json()
    })
}
