import React from 'react'
import { Map, fromJS } from 'immutable'
import immutablediff from 'immutablediff'
import EditRecording from './compositional/EditRecording'
import { jsonRequest } from '../requests'
import _ from 'lodash'

class RecordingEditor extends React.Component {

  componentWillMount() {
    const id = _.get(this, 'props.params.recordingId')
    this.props.setSourceTrack(Map({}))
    if (id) {
      jsonRequest('GET', `/api/recording/${id}`)
        .then(resp => {
          console.log('RESP', resp)
          const track = fromJS(resp.data)
          console.log('TRACK', track.toJS())
          const trimmedTrack = track
            .delete('_id')
            .delete('updatedAt')
            .delete('createdAt')
          this.props.setSourceTrack(trimmedTrack)
        })
    }
  }

  submitChanges() {
    const id = _.get(this, 'props.params.recordingId')
    const diff = immutablediff(this.props.source, this.props.track)
    const url = '/api/recording' + (id ? '/' + id : '')
    const method = id ? 'PUT' : 'POST'
    jsonRequest(method, url, diff.toJS())
      .then(console.log)
  }

  render() {
    const { track, update } = this.props
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
  render() {
    const {field, track, update} = this.props
    return (<div>
      <label>{field}</label>
      <input value={track.get(field)} onChange={e => update(field, e.target.value)} />
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
module.exports = EditRecording(RecordingEditor)
