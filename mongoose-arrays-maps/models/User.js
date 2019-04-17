const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	todos: [
		{
			content: String,
			done: Boolean,
			date: {
				type: Date,
				default: Date.now
			}
		}
	]
});

module.exports = User = mongoose.model('user', userSchema);