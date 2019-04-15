const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Auth routes
app.use('/auth', require('./routes/auth'));

// API INIT
const PORT = 3000;
app.listen(PORT, () => {
	console.log('Api starting on port ' + PORT);
});