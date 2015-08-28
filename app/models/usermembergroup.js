'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserMemberGroup = sequelize.define('UserMemberGroup', {
  }, {
    classMethods: {
      associate: function(models) {
        UserMemberGroup.belongsTo(models.User);
        UserMemberGroup.belongsTo(models.Group);
      }
    },
    paranoid: true,
    timestamps: true
  });
  return UserMemberGroup;
};