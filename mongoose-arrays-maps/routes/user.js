const express = require('express');
const encrypt = require('simple-sha256');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwt_config = require('../config/jwt_config');

const isAuthorized = require('../middleware/isAuthorized');
const User = require('../models/User');

router.post('/register', (req, res) => {
	const { name, email, password } = req.body;

	if (name && email && password) {
		encrypt(password).then(hashed => {
			User.create({
				name,
				email,
				password: hashed
			}).then(user => res.json(user));
		});
	} else {
		res.json({
			msg: 'all fields are required'
		});
	}
});

router.post('/token', (req, res) => {
	const { email, password } = req.body;
	if (email && password) {
		// Check credentials
		encrypt(password).then(hashed => {
			User.findOne({
				email,
				password: hashed
			})
				.then(user => {
					if (user) {
						token = jwt.sign(user.toJSON(), jwt_config.JWT_KEY, {
							expiresIn: '1d'
						});
						res.json({
							tokenType: 'Bearer',
							token
						});
					} else {
						res.json({
							msg: 'bad user credentials'
						});
					}
				})
				.catch(err => console.error('error: ', err));
		});
	} else {
		res.json({
			msg: 'all fields are required'
		});
	}
});

router.get('/me', isAuthorized, (req, res) => {
	res.json(req.user);
});

module.exports = router;
