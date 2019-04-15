const Sequelize = require('sequelize/index');
const db = require('../database/connection');

const Todo = db.define('todo', {
	
	id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	},
	content: {
		type: Sequelize.STRING
	}
	
});

module.exports = Todo;