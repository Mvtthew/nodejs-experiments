const express = require('express');
const {check, validationResult} = require('express-validator/check');
const router = express.Router();

const User = require('../models/User');

// Creating user
router.post('/register', [
	check('login').isLength({
		min: 4,
		max: 32
	}),
	check('email').isEmail(),
	check('password').isLength({
		min: 4,
		max: 32
	})
], (req, res) => {
	
	const errors = validationResult(req);
	
	if(!errors.isEmpty()) {
		return res.status(422).json({
			errors: errors.array()
		});
	}

	User.create({
		
		login: req.body.login,
		email: req.body.email,
		password: req.body.password

	}).then(user => res.json(user));
	
});


module.exports = router;