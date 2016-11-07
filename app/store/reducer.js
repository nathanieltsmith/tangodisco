import { List, Map } from 'immutable'

export default function reducer (state, action) {
  switch (action.type) {
    case 'updateDraftTrack':
      return updateDraftTrack(state, action.field, action.value, action.index)
    case 'setSourceTrack':
      return setSourceTrack(state, action.track)
    default:
      return state
  }
}

function updateDraftTrack (state, field, value, index) {
  console.log(state, field, value, index)
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
