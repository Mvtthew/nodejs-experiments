const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Api routes
app.use('/api', require('./routes/api'));

// Users/auth routes
app.use('/auth', require('./routes/auth'));


// Api INIT
const PORT = 3000;

app.listen(PORT, () => {
	console.log('Api listening on port: ' + PORT);
});