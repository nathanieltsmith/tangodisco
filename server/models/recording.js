import mongoose from 'mongoose'
import patch from 'immutablepatch'
import { Map, fromJS } from 'immutable'
import { deepRemoveAccents } from '../../utilities/language/removeAccents'
import { concatAllStrings } from '../../utilities/string'

const recordingDataSchema = new mongoose.Schema({
  song: {type: String, required: true},
  orchestra: {type: String, required: true},
  singers: [String],
  lyricists: [String],
  composers: [String],
  genre: {type: String, default: 'Tango'},
  duration: String,
  youTubeUrl: String,
  recorded: Date
}, {
  timestamps: true
})

const queryDataSchema = new mongoose.Schema({
  song: {type: String, required: true},
  orchestra: {type: String, required: true},
  singers: [String],
  lyricists: [String],
  composers: [String],
  genre: String,
})

const recordingEditSchema = new mongoose.Schema({
  user: String,
  op: String,
  path: String,
  value: Object
}, {
  timestamps: true
})

const recordingSchema = mongoose.Schema({
  data: recordingDataSchema,
  trackEdits: {type: [recordingEditSchema],default: []},
  queryData: queryDataSchema
}, {
  timestamps: true
})

recordingSchema.methods.addEdits = function (user, newEdits) {
  const edits = fromJS(this.trackEdits).push(...newEdits.map(edit => edit.set('user', user)))
  const recording = patch(Map({}), edits)
  const query = deepRemoveAccents(recording)
  this.trackEdits = edits.toJS()
  this.data = recording.toJS()
  this.queryData = query.toJS()
  return this.save()
}

recordingSchema.index({'$**': 'text'})

// create the model for users and expose it to our app
module.exports = mongoose.model('recording', recordingSchema)
