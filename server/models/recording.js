import mongoose from 'mongoose'
import patch from 'immutablepatch'
import { Map, fromJS } from 'immutable'
import { deepRemoveAccents } from '../../utilities/language/removeAccents'
import { concatAllStrings } from '../../utilities/string'

const recordingDataSchema = new mongoose.Schema({
  song: {type: String, required: true},
  orchestraLeader: {type: String},
  orchestra: {type: String, required: true},
  singers: [String],
  genre: {type: String, default: 'Tango'},
  youTubeUrl: String,
  recorded: Date
}, {
  timestamps: true
})

const queryDataSchema = new mongoose.Schema({
  song: {type: String, required: true},
  orchestraLeader: {type: String},
  orchestra: {type: String, required: true},
  singers: {type: String, default: 'Instrumental'},
  genre: String,
  recorded: Date,
  queryText: String
})

const recordingEditSchema = new mongoose.Schema({
  user: { type: String}
}, {
  timestamps: true
})

const recordingSchema = mongoose.Schema({
  queryData: queryDataSchema,
  data: recordingDataSchema,
  trackEdits: {type: [recordingEditSchema],default: []},
  created: { type: Date }
})

recordingSchema.methods.addEdits = function (user, newEdits) {
  const edits = fromJS(this.trackEdits).push(...newEdits.map(edit => edit.set('user', user)))
  const recording = patch(Map({}), edits)
  const query = deepRemoveAccents(recording)
  const summarizedQuery = query.set('summary', concatAllStrings(query))
  this.trackEdits = edits.toJS()
  this.data = recording.toJS()
  this.queryData = summarizedQuery.toJS()
  return this.save()
}

// create the model for users and expose it to our app
module.exports = mongoose.model('recording', recordingSchema)
