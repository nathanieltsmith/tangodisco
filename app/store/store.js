import { Map, List } from 'immutable'
import { createStore } from 'redux'
import reducer from './reducer'

var startingState = Map({
  currentTrack: Map({}),
  modifiedTrack: Map({}),
  searchResults: List([]),
  query: ''
})

module.exports = createStore(reducer, startingState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
