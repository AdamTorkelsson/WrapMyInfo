'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Documents', 'data');
    queryInterface.addColumn('Documents', 'data', Sequelize.BLOB);
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Documents', 'data');
    queryInterface.addColumn('Documents', 'data', Sequelize.JSON);
  }
};
