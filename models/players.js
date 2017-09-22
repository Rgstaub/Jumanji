module.exports = function(sequelize, DataTypes) {
  var players = sequelize.define('players', {
    turn: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    position: DataTypes.INTEGER
  })

  players.associate = function(models) {
    players.hasMany(models.inventories, {});
    players.belongsTo(models.games, {});
    players.hasMany(models.turns, {});
   //players.hasOne(models.users, {});
  }

  return players;
}