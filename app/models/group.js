'use strict';
module.exports = function(sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Group.belongsTo(models.Developer);
        Group.belongsToMany(models.Schema, {
          through: models.GroupSchema,
          foreignKey: 'GroupId'
        });
        Group.belongsToMany(models.User, {
          as: 'GroupOwner',
          through: models.UserOwnerGroup,
          foreignKey: 'GroupId'
        });
        Group.belongsToMany(models.User, {
          as: 'GroupMember',
          through: models.UserMemberGroup,
          foreignKey: 'GroupId'
        });
      }
    },
    paranoid: true,
    timestamps: true
  });
  return Group;
};