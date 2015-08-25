'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserMemberGroup = sequelize.define('UserMemberGroup', {
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
  return UserMemberGroup;
};