const mongoose = require('mongoose');
const colors = require('colors');

const mongoConfig = require('../config/db_config');

mongoose
	.connect(mongoConfig.MONGO_URI, { useNewUrlParser: true })
	.then(() => {
		console.log('MongoDB database connected ' + 'successfully!'.green);
	})
	.catch(err => console.error('MongoDB'.green + 'database connection error:'.red, err.red));
