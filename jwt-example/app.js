const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// connect to db


const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

app.post('/api/posts', verifyToken, {}, (req, res) => {

    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created!',
                authData
            });
        }
    });
});

app.post('/api/login', (req, res) => {

    // Mock user
    const user = {
        id: 1,
        username: 'brad',
        email: 'brad@example.com'
    };

    jwt.sign({user}, 'secretKey', (err, token) => {
        res.json({
            token
        });
    });
});

// Format of token
// Authorization: Bearer access_token

// verify token
function verifyToken(req, res, next) {

    // Get auth header value
    const bearerHeader = req.headers['Authorization'];

    // If token is sent
    if (typeof bearerHeader !== "undefined") {

        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Set the token
        req.token = bearer[1];
        // Next middleware
        next();

    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

app.listen(5000, () => {
    console.log('Server started :5000');
});