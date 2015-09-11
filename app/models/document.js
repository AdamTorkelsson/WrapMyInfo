'use strict';
module.exports = function(sequelize, DataTypes) {
  var Document = sequelize.define('Document', {
    meta: DataTypes.JSON,
    data: DataTypes.BLOB
  }, {
    classMethods: {
      associate: function(models) {
        Document.belongsTo(models.Schema);
        Document.belongsTo(models.User);
        Document.hasMany(models.Blob);
      }
    },
    paranoid: true,
    timestamps: true
  });
  return Document;
};