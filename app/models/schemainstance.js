'use strict';
module.exports = function(sequelize, DataTypes) {
  var SchemaInstance = sequelize.define('SchemaInstance', {
    meta: DataTypes.JSON,
    json: DataTypes.JSON
  }, {
    classMethods: {
      associate: function(models) {
        SchemaInstance.belongsTo(models.Schema);
        SchemaInstance.belongsTo(models.User);
        SchemaInstance.hasMany(models.Blob);
      }
    },
    paranoid: true,
    timestamps: true
  });
  return SchemaInstance;
};