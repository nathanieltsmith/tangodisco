import { connect } from 'react-redux'
import { updateDraftTrack, setSourceTrack } from '../../store/actions'

function mapStateToProps (state) {
  return {
    track: state.get('modifiedTrack'),
    source: state.get('currentTrack')
  }
}

function mapDispatchToProps (dispatch) {
  return {
    update: (field, value, index) => dispatch(updateDraftTrack(field, value, index)),
    setSourceTrack: track => dispatch(setSourceTrack(track))
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)
