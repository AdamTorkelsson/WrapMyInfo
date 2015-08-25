'use strict';
module.exports = function(sequelize, DataTypes) {
  var Schema = sequelize.define('Schema', {
    name: DataTypes.STRING,
    json: DataTypes.JSON,
    maxBlobs: DataTypes.INTEGER,
    maxBlobSize: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Schema.belongsTo(models.Developer);
      }
    },
    paranoid: true,
    timestamps: true
  });
  return Schema;
};