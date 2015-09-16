'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserToken = sequelize.define('UserToken', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    token: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        UserToken.belongsTo(models.User);
      }
    },
    paranoid: true,
    timestamps: true
  });
  return UserToken;
};