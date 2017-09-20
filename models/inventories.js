module.exports = function(sequelize, DataTypes) {
  var inventories = sequelize.define('inventories', {
    
  })

  inventories.associate = function(models) {
    inventories.belongsTo(models.games, {});
    inventories.belongsTo(models.players, {});
  }

  return inventories;
}