import React from 'react'
import { jsonRequest } from '../requests'
import _ from 'lodash'
import { browserHistory, Link } from 'react-router'
import { fromJS } from 'immutable'
import SearchResults from './compositional/SearchResults'
class SearchPage extends React.Component {

  componentWillMount() {
    const query = _.get(this, 'props.params.query')
    if (_.get(this, 'props.params.query')) {
      this.props.setQuery(query)
      jsonRequest('POST', '/api/recordings', { query})
        .then(this.props.setSearchResults)
        .catch(err => console.error(err))
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
        .catch(err => console.error(err))
    }
  }

  render() {
    const { query, sortBy, setQuery, playVideo, sortResults, searchResults } = this.props
    console.log('sr length', searchResults.length, searchResults)
    return (<div>
          <input value={query} onChange={(e) => setQuery(e.target.value)}/>
          <button className='btn btn-primary' onClick={() => browserHistory.push(`/search/${this.props.query}`)}>Search</button>
          {searchResults.size > 0 ? (<table>
            <tr>
              <th></th>
              <th onClick={() => sortResults('data.song')}>Song</th>
              <th onClick={() => sortResults('data.orchestra')}>Orchestra</th>
              <th onClick={() => sortResults('data.genre')}>Genre</th>
              <th onClick={() => sortResults('data.recorded')}>Recorded</th>
              <th>Singer(s)</th>
              <th></th>
            </tr>
            {searchResults.map(result => (<tr>
                <td>{result.getIn(['data', 'youTubeUrl']) ? <h4><span className={'glyphicon glyphicon-play'} aria-hidden="true" onClick={() => playVideo(result.get('data'))}></span></h4> : ''}</td>
                <td>{result.getIn(['data', 'song'])}</td>
                <td>{result.getIn(['data', 'orchestra'])}</td>
                <td>{result.getIn(['data', 'genre'])}</td>
                <td>{new Date(result.getIn(['data', 'recorded'])).toISOString().slice(0, 10)}</td>
                <td>{result.getIn(['data', 'singers']).toJS().join(', ')}</td>
                <td><Link to={`/edit/${result.get('_id')}`}><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></Link></td>
                </tr>))}
            </table>) : ''}
        </div>)

  }

}

module.exports = SearchResults(SearchPage)
