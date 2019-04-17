const jwt = require('jsonwebtoken');
const jwt_config = require('../config/jwt_config');

module.exports = function(req, res, next) {

	const token = req.headers.authorization.split(' ')[1];

	jwt.verify(token, jwt_config.JWT_KEY, (err, user) => {
		if (err) {
			res.sendStatus(403);
		} else {
			req.user = user;
			next();
		}
	});

}