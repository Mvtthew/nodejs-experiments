const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User creation
router.post('/register', (req, res) => {

	const login = req.body.login;
	const password = req.body.password;

	User.create({
		login,
		password
	}).then(user => res.json(user));

});

// User get token
router.post('/token', (req, res) => {

	const login = req.body.login;
	const password = req.body.password;

	User.findOne({
		where: {
			login,
			password
		}
	}).then(user => {

		if (user !== null) {

			// Auth!
	
			jwt.sign({user}, 'secret', {expiresIn: '24h'}, (err, token) => {
	
				res.json({
					token
				});
	
				console.error('Error:', err);
	
			});
	
		} else {
			// Bad credentials
			res.json({
				status: 403,
				message: 'bad credentials'
			})
		}

	});

});

module.exports = router;