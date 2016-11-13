import { connect } from 'react-redux'
import { setSearchResults, setQuery } from '../../store/actions'

function mapStateToProps (state) {
  return {
    searchResults: state.get('searchResults'),
    query: state.get('query')
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setSearchResults: (results) => dispatch(setSearchResults(results)),
    setQuery: query => dispatch(setQuery(query))
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)
