'use strict';
module.exports = function(sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Group.belongsTo(models.Developer);
        Group.belongsToMany(models.Schema, {as: 'schemas', through: models.GroupSchema, foreignKey: 'groupId'});
        Group.belongsToMany(models.User, {as: 'owners', through: models.UserOwnerGroup, foreignKey: 'groupId'});
        Group.belongsToMany(models.User, {as: 'members', through: models.UserMemberGroup, foreignKey: 'groupId'});
      }
    },
    paranoid: true,
    timestamps: true
  });
  return Group;
};