const mongoose = require('mongoose');
const dbConfig = require('../config/db_config');

mongoose
	.connect(dbConfig.MONGO_URI, {useNewUrlParser: true})
	.then(() => console.log('MongoDB connected!'))
	.catch(err => {
		console.error('MongoDB error:', err);
	});