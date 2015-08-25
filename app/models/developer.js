'use strict';
module.exports = function(sequelize, DataTypes) {
  var Developer = sequelize.define('Developer', {
    key: DataTypes.CHAR(44)
  }, {
    classMethods: {
      associate: function(models) {
        Developer.hasMany(models.Schema);
        Developer.hasMany(models.User);
        Developer.hasMany(models.Group);
        Developer.hasMany(models.DeveloperToken);
      }
    },
    paranoid: true,
    timestamps: true
  });
  return Developer;
};