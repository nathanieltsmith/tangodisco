import 'whatwg-fetch'
import _ from 'lodash'
import { fromJS } from 'immutable'

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
    .then((json) => {
      console.log('json', json)
      return fromJS(json)
    })
}
