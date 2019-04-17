const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.json({
		msg: 'Hey'
	});
});

router.use('/user', require('./user'));

module.exports = router;
