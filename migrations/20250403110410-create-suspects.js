'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Suspects', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      known_aliases: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_seen_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      last_seen_location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      case_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Cases', 
          key: 'id',
        },
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Suspects');
  },
};
