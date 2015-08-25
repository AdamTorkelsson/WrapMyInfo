'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserOwnerGroup = sequelize.define('UserOwnerGroup', {
    userId: DataTypes.STRING,
    groupId: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    paranoid: true,
    timestamps: true
  });
  return UserOwnerGroup;
};