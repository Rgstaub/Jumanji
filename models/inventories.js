module.exports = function(sequelize, DataTypes) {
  var inventories = sequelize.define('inventories', {});

  inventories.associate = function(models) {
    inventories.belongsTo(models.players, {});
    inventories.belongsTo(models.items, {});
  }

  return inventories;
}