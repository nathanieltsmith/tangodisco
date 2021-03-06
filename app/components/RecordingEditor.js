import React from 'react'
import { Map, fromJS } from 'immutable'
import immutablediff from 'immutablediff'
import EditRecording from './compositional/EditRecording'
import { jsonRequest } from '../requests'
import _ from 'lodash'
import Authentication from './compositional/Authentication'
import { browserHistory } from 'react-router'

class RecordingEditor extends React.Component {

  componentWillMount() {
    this.updateTracks()
  }

  updateTracks() {
    const id = _.get(this.props, 'params.recordingId')
    if (id) {
      jsonRequest('GET', `/api/recording/${id}`)
        .then(resp => {
          const trimmedTrack = resp.get('data')
            .delete('_id')
            .delete('updatedAt')
            .delete('createdAt')
          this.props.setSourceTrack(trimmedTrack)
        })
    }
  }
  submitChanges() {
    const {source, track} = this.props
    const id = _.get(this, 'props.params.recordingId')
    console.log('Into the thing', source.toJS(), track.toJS())
    const diff = immutablediff(source, track)
    const url = '/api/recording' + (id ? '/' + id : '')
    const method = id ? 'PUT' : 'POST'
    console.log('What the diff', diff.toJS())
    jsonRequest(method, url, diff.toJS())
      .then(console.log)
  }

  render() {
    const { track, update, user } = this.props
    if (!user) {
      browserHistory.push('/login')
    }
    return (<div>
        {
    ['song', 'orchestra', 'genre', 'youTubeUrl', 'recorded']
      .map(field => <StringTrackInput field={field} />)
    }
    <StringArrayTrackInput field={'singers'}/>
    <div onClick={() => this.submitChanges()} >Submit Changes</div>
      </div>)
  }

}

class StringInput extends React.Component {
  shouldComponentUpdate( nextProps, nextState) {
    console.log('SHOULD I?', nextProps.track !== this.props.track || nextProps.update !== this.update)
    return (nextProps.track !== this.props.track || nextProps.update !== this.update)
  }

  render() {
    const {field, track, update} = this.props
    console.log('rendering', field, track.get(field))
    return (<div>
      <label>{field}</label>
      <input value={track.get(field) || ''} onChange={e => update(field, e.target.value)} />
    </div>)
  }
}

class StringArrayInput extends React.Component {

  render() {
    const {field, track, update} = this.props
    return (<div>
        {(track.get(field) || []).map((str, i) => (<div>
                          <label>{field}</label>
                          <input value={track.getIn([field, i])} onChange={e => update(field, e.target.value, i)}/>
                          <span onClick={() => update(field, undefined, i)}>[x]</span>
                          
                        </div>)
    )
    }
    <div onClick={() => update(field, '', track.get(field) ? track.get(field).size : 0)}> add {field}</div>
      </div>)

  }

}

const StringTrackInput = EditRecording(StringInput)
const StringArrayTrackInput = EditRecording(StringArrayInput)
module.exports = Authentication(EditRecording(RecordingEditor))
