'use strict';
module.exports = function(sequelize, DataTypes) {
  var Developer = sequelize.define('Developer', {
    username: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Developer;
};