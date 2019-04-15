const Sequelize = require('sequelize/index');
const db = require('../database/connection');

const User = db.define('user', {

	id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	},
	login: {
		type: Sequelize.STRING(32),
		allowNull: false,
		unique: true
	},
	password: {
		type: Sequelize.STRING(32),
		allowNull: false
	}

});

module.exports = User;