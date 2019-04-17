const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	login: {
		type: String
	},
	password: {
		type: String
	}
});

module.exports = User = mongoose.model('user', userSchema);