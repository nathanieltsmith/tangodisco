import { List, Map, fromJS } from 'immutable'
import _ from 'lodash'

export default function reducer (state, action) {
  switch (action.type) {
    case 'updateDraftTrack':
      return updateDraftTrack(state, action.field, action.value, action.index)
    case 'setSourceTrack':
      return setSourceTrack(state, action.track)
    case 'setSearchResults':
      console.log('Search Results', action.results)
      return state.set('searchResults', action.results)
    case 'setQuery':
      return state.set('query', action.query)
    case 'playVideo':
      return state.set('nowPlaying', fromJS(action.song))
    case 'sortSearch':
      return sortTracks(state, action.sortBy)
    case 'logIn':
      return state.set('user', action.user)
    case 'logOut':
      return state.set('user', undefined)
    default:
      return state
  }
}

function immutableSort (list, sortFn) {
  return fromJS((list.toJS ? list.toJS() : list).sort(sortFn))
}

function keySort (key, order) {
  var flip = order === 'DESC' ? -1 : 1
  return (a, b) => {
    var x = _.get(a, key)
    var y = _.get(b, key)
    return flip * ((x < y) ? -1 : ((x > y) ? 1 : 0))
  }
}

function sortTracks (state, sortBy) {
  const sortDir = state.get('sortDir') === 'ASC' && state.get('sortBy') === sortBy ? 'DESC' : 'ASC'
  return state
    .set('sortBy', sortBy)
    .set('sortDir', sortDir)
    .set('searchResults', immutableSort(state.get('searchResults'), keySort(sortBy, sortDir)))
}

function updateDraftTrack (state, field, value, index) {
  if (index === undefined) {
    return state.setIn(['modifiedTrack', field], value)
  } else if (value === undefined) {
    const list = state.getIn(['modifiedTrack', field])
    const newList = list.delete(index)
    return state.setIn(['modifiedTrack', field], newList)
  } else {
    return state.setIn(['modifiedTrack', field, index], value)
  }

}

function setSourceTrack (state, track) {
  return state.merge({'currentTrack': track,
  'modifiedTrack': track})
}
