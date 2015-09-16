'use strict';
module.exports = function(sequelize, DataTypes) {
  var Blob = sequelize.define('Blob', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    meta: DataTypes.JSON,
    blob: DataTypes.BLOB
  }, {
    classMethods: {
      associate: function(models) {
        Blob.belongsTo(models.Document);
      }
    },
    paranoid: true,
    timestamps: true
  });
  return Blob;
};