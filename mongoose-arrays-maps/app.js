const express = require('express');

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connect
require('./database/connection');

// Routes
app.use('/', require('./routes/routes'));
app.use('/user', require('./routes/user'));

// Init APP
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log('Started app on port: ' + PORT));
