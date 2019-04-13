const express = require('express');
const mongoose = require('mongoose');
const app = express();

// MongoDB connect
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
});

// Routing
const routes = require('./routes');
app.get('/', routes.allItems);
app.get('/add', routes.addItem);

app.listen(3000);