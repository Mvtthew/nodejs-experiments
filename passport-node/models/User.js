const Sequelize = require('sequelize');
const db = require('../database');

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
	email: {
		type: Sequelize.STRING,
		allowNull: false
	}
	
});

module.exports = User;