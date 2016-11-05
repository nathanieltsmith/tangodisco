import { connect } from 'react-redux'
import { updateDraftTrack } from '../../store/actions'

function mapStateToProps (state) {
  return {
    track: state.get('modifiedTrack'),
    source: state.get('currentTrack')
  }
}

function mapDispatchToProps (dispatch) {
  return {
    update: (field, value, index) => dispatch(updateDraftTrack(field, value, index))
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)
