'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Documents', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      SchemaId: {
        type: Sequelize.UUID,
        reference: {
          model: 'Schemas'
        }
      },
      UserId: {
        type: Sequelize.UUID,
        references: {
          model: 'Users'
        }
      },
      meta: {
        type: Sequelize.JSON
      },
      data: {
        type: Sequelize.JSON
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
    return queryInterface.dropTable('Documents');
  }
};