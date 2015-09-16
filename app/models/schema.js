'use strict';
module.exports = function(sequelize, DataTypes) {
  var Schema = sequelize.define('Schema', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING,
    dataRules: DataTypes.JSON,
    maxBlobs: DataTypes.INTEGER,
    maxBlobSize: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Schema.belongsTo(models.Developer);
        Schema.belongsToMany(models.Group, {
          through: models.GroupSchema,
          foreignKey: 'SchemaId'
        });
      }
    },
    paranoid: true,
    timestamps: true
  });
  return Schema;
};