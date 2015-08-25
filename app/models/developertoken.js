'use strict';
module.exports = function(sequelize, DataTypes) {
  var DeveloperToken = sequelize.define('DeveloperToken', {
    token: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        DeveloperToken.belongsTo(models.Developer);
      }
    },
    paranoid: true,
    timestamps: true
  });
  return DeveloperToken;
};