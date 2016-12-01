import 'whatwg-fetch'
import _ from 'lodash'

export function jsonRequest (method, route, body) {
  return fetch(route, {
    method: method,
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(_.get(body, 'toJS') ? body.toJS() : body)
  })
    .then(function (response) {
      return response.json()
    })
}
