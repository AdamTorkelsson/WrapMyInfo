'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Users', 'key');
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Users', 'key', Sequelize.CHAR(44));
  }
};
