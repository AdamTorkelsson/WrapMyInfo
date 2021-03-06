'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Document);
        User.belongsTo(models.Developer);
        User.belongsToMany(models.Group, {
          as: 'OwnerGroup',
          through: models.UserOwnerGroup,
          foreignKey: 'UserId'
        });
        User.belongsToMany(models.Group, {
          as: 'MemberGroup',
          through: models.UserMemberGroup,
          foreignKey: 'UserId'
        });
      }
    },
    paranoid: true,
    timestamps: true
  });
  return User;
};