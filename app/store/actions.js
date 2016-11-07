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
