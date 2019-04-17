const express = require('express');
const colors = require('colors');
const cors = require('cors');

const app = express();

// Cors for all origins
app.use(cors());

// Post form parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
require('./database/connection');

// Routes init
app.use(require('./routes'));

// Init API
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log('Api listening on port ' + colors.red(PORT));
});
