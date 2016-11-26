import React from 'react'
import { jsonRequest } from '../requests'
import _ from 'lodash'
import { browserHistory, Link } from 'react-router'
import SearchResults from './compositional/SearchResults'
class SearchPage extends React.Component {

  componentWillMount() {
    const query = _.get(this, 'props.params.query')
    if (_.get(this, 'props.params.query')) {
      this.props.setQuery(query)
      jsonRequest('POST', '/api/recordings', { query})
        .then(this.props.setSearchResults)
        .catch(err => console.err(err))
    }
  }

  componentWillReceiveProps( nextProps) {
    console.log('props', this.props.params, nextProps.params)
    const query = _.get(this, 'props.params.query')
    const newQuery = _.get(nextProps, 'params.query')
    if (newQuery && newQuery !== query) {
      console.log('querying', newQuery)
      jsonRequest('POST', '/api/recordings', { query: newQuery})
        .then(this.props.setSearchResults)
        .catch(err => console.err(err))
    }
  }

  render() {
    const { query, sortBy, setQuery, playVideo, sortResults } = this.props
    return (<div>
          <input value={query} onChange={(e) => setQuery(e.target.value)}/>
          <div className="btn btn-primary" onClick={() => browserHistory.push(`/search/${this.props.query}`)}>Search</div>
          <table>
          <tr>
            <th></th>
            <th onClick={() => sortResults('data.song')}>Song</th>
            <th onClick={() => sortResults('data.orchestra')}>Orchestra</th>
            <th onClick={() => sortResults('data.genre')}>Genre</th>
            <th onClick={() => sortResults('data.recorded')}>Recorded</th>
            <th>Singer(s)</th>
            <th></th>
          </tr>
          {this.props.searchResults.map(result => (<tr>
              <td>{result.data.youTubeUrl ? <button className={'btn btn-primary'} onClick={() => playVideo(result.data)}>Play</button> : ''}</td>
              <td>{result.data.song}</td>
              <td>{result.data.orchestra}</td>
              <td>{result.data.genre}</td>
              <td>{new Date(result.data.recorded).toISOString().slice(0, 10)}</td>
              <td>{result.data.singers.join(', ')}</td>
              <td><Link to={`/edit/${result._id}`}>Edit</Link></td>
              </tr>))}
          </table>
        </div>)

  }

}

module.exports = SearchResults(SearchPage)
