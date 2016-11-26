import { connect } from 'react-redux'

function mapStateToProps (state) {
  return {
    videoId: state.getIn(['nowPlaying', 'youTubeUrl'])
  }
}

module.exports = connect(mapStateToProps)
