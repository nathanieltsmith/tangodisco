import mongoose from 'mongoose'

const recordingSchema = mongoose.Schema({
		song: {type: String, required: true},
		orchestraLeader: {type: String, required: true},
		orchestra: {type: String, required: true},
		singers: [String],
		genre: {type: String, default: 'Tango'},
		youTubeUrl: String,
		recorded: { type: Date, default: Date.now },
        trackEdits: {type: [recordingEditSchema],default: []}
})
const recordingEditSchema = mongoose.Schema({
	user: { type: String, required: true}
	date: { type: Date, default: Date.now }
})



// create the model for users and expose it to our app
module.exports = mongoose.model('recording', userSchema);
