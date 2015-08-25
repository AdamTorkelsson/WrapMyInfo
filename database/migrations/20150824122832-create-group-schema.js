'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('GroupSchemas', {
      GroupId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Groups'
        }
      },
      SchemaId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Schemas'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('GroupSchemas');
  }
};