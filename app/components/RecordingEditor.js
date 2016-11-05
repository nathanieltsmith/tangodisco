import React from 'react'
import immutablediff from 'immutablediff'
import EditRecording from './compositional/EditRecording'

class RecordingEditor extends React.Component {

  submitChanges() {
    const diff = immutablediff(this.props.source, this.props.track)
    diff.map(op => console.log(op.toJS()))
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
    console.log('getfield', track.get(field).toJS())
    return (<div>
	    	{track.get(field).map((str, i) => (<div>
	    										<label>{field}</label>
	    										<input value={track.getIn([field, i])} onChange={e => update(field, e.target.value, i)}/>
	    										<span onClick={() => update(field, undefined, i)}>[x]</span>
	    										
	    									</div>)
    )
    }
    <div onClick={() => update(field, '', track.get(field).size)}> add {field}</div>
	    </div>)

  }

}

const StringTrackInput = EditRecording(StringInput)
const StringArrayTrackInput = EditRecording(StringArrayInput)
module.exports = EditRecording(RecordingEditor)
