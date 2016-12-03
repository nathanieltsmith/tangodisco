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

export function playVideo (song) {
  return {
    type: 'playVideo',
  song}
}

export function sortSearch (sortBy) {
  return {
    type: 'sortSearch',
  sortBy}
}

export function logIn (user) {
  return {
    type: 'logIn',
    user: user
  }
}

export function logOut () {
  return {
    type: 'logOut'
  }
}
