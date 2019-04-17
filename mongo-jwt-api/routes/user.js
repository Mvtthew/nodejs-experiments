const express = require('express');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt_config');
const isAuth = require('../middleware/isAuth');
const sha = require('simple-sha256');
const router = express.Router();

// User model
const User = require('../models/User');

router.get('/me', isAuth, (req, res) => {
	res.json(req.user);
});

router.post('/token', (req, res) => {
	const { login, password } = req.body;

	if (login && password) {
		sha(password).then(password => {
			User.findOne({
				login,
				password
			})
				.then(user => {
					if (user) {
						jwt.sign(
							user.toJSON(),
							jwtConfig.SECRET,
							{ expiresIn: '7d' },
							function(err, token) {
								if (err) throw err;
								res.json({
									token_type: 'Bearer',
									token: token
								});
							}
						);
					} else {
						res.json({
							msg: 'Bad credentials'
						});
					}
				})
				.catch(err => console.error('DB User error:', err));
		});
	} else {
		res.json({
			msg: 'No credentials included'
		});
	}
});

// Create user
router.post('/register', (req, res) => {
	const { login, password } = req.body;

	if (login && password) {
		sha(password).then(password => {
			User.create({
				login,
				password
			})
				.then(user => {
					res.json(user);
				})
				.catch(err => console.error('DB User error:', err));
		});
	} else {
		res.json({
			msg: 'All fields are required'
		});
	}
});

module.exports = router;
