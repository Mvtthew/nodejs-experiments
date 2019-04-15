'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		
		return queryInterface.createTable('users', {

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
			},

			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE

		});
		
	},
	
	down: (queryInterface, Sequelize) => {
		
		return queryInterface.dropTable('users');

	}
};
