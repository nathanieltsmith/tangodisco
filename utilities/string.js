import { Map, Iterable } from 'immutable'

export function deepStringModify (fn, str) {
  if (typeof str === 'string') {
    return fn(str)
  } else if (str instanceof Map) {
    return str.reduce((map, value, key) => map.set(key, deepStringModify(fn, value)), str)
  } else if (str instanceof Iterable) {
    return str.map(x => deepStringModify(fn, x))
  } else {
    return str
  }
}

export function concatAllStrings (obj) {
  if (typeof obj === 'string') {
    return obj
  } else if (obj.reduce) {
    return obj.reduce((str, val) => str + ' ' + concatAllStrings(val), '')
  } else {
    return ''
  }
}
