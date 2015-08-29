'use strict';
module.exports = function(sequelize, DataTypes) {
  var GroupSchema = sequelize.define('GroupSchema', {
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