'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn('Developers', 'key', Sequelize.STRING);
  },

  down: function (queryInterface, Sequelize) {
    //queryInterface.changeColumn('Developers', 'key', Sequelize.CHAR(44));
  }
};
