module.exports = function(sequelize, DataTypes) {
  var players = sequelize.define('players', {
    turn: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    position: DataTypes.INTEGER,
    playerName: DataTypes.STRING
  })

  players.associate = function(models) {
    players.hasMany(models.inventories, {});
    //players.hasOne(models.games, {});
    players.hasMany(models.turns, {});
    players.belongsTo(models.users, {});
  }

  return players;
}