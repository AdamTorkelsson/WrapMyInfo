'use strict';
module.exports = function(sequelize, DataTypes) {
  var DeveloperToken = sequelize.define('DeveloperToken', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
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