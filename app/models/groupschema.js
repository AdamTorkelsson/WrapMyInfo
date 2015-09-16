'use strict';
module.exports = function(sequelize, DataTypes) {
  var GroupSchema = sequelize.define('GroupSchema', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        GroupSchema.belongsTo(models.Group);
        GroupSchema.belongsTo(models.Schema);
      }
    },
    paranoid: true,
    timestamps: true
  });
  return GroupSchema;
};