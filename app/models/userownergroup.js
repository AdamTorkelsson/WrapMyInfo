'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserOwnerGroup = sequelize.define('UserOwnerGroup', {
  }, {
    classMethods: {
      associate: function(models) {
        UserOwnerGroup.belongsTo(models.User);
        UserOwnerGroup.belongsTo(models.Group);
      }
    },
    paranoid: true,
    timestamps: true
  });
  return UserOwnerGroup;
};