import mongoose from 'mongoose'

const recordingSchema = mongoose.Schema({
		queryData: queryDataSchema,
		data: recordingDataSchema,
        trackEdits: {type: [recordingEditSchema],default: []}
        created: { type: Date, default: Date.now }
})

const recordingDataSchema = new mongoose.Schema({
		song: {type: String, required: true},
		orchestraLeader: {type: String, required: true},
		orchestra: {type: String, required: true},
		singers: [String],
		genre: {type: String, default: 'Tango'},
		youTubeUrl: String,
		recorded: Date
},{
	timestamps: true
})

const queryDataSchema = new mongoose.Schema({
	song: {type: String, required: true},
	orchestraLeader: {type: String, required: true},
	orchestra: {type: String, required: true},
	singers: {type: String, default:'Instrumental'},
	genre: String,
	recorded: Date,
	queryText: String
})

const recordingEditSchema = new mongoose.Schema({
	user: { type: String, required: true},
	kind: { type: String, default: 'Edit'}
	edit: {}, 
}, {
	timestamps: true
})



// create the model for users and expose it to our app
module.exports = mongoose.model('recording', userSchema);
