import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const schema = new mongoose.Schema({
	state: {
		type: Boolean,
		required: true
	},
	spotify_token: {
		type: String,
		required: true
	}
}, { timestamps: true });

export default mongoose.model('Alarm', schema);