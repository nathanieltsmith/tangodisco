export function updateDraftTrack (field, value, index) {
  return {
    type: 'updateDraftTrack',
    field,
    value,
  index}
}

export function setSourceTrack (track) {
  return {
    type: 'setSourceTrack',
  track}
}

export function setSearchResults (results) {
  return {
    type: 'setSearchResults',
  results}
}

export function setQuery (query) {
  return {
    type: 'setQuery',
  query}
}
