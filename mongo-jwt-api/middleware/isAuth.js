const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt_config');

module.exports = function(req, res, next) {

	const token = req.headers.authorization;

	if (token) {
		const tokeno = token.split(' ')[1];
		jwt.verify(tokeno, jwtConfig.SECRET, function(err, user){
			if(err) {
				res.json({
					msg: 'This token is bad, realy bad'
				});
			} else {
				req.user = user;
				next();
			}
		});
	} else {
		res.json({
			msg: 'You need to provide a token'
		});
	}

}