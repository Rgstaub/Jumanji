module.exports = function(sequelize, DataTypes) {
  var players = sequelize.define('players', {
    turn: DataTypes.INTEGER,
    avatar: {
      type: DataTypes.STRING,
      defaultValue: "sword"
    },
    position: DataTypes.INTEGER,
    playerName: DataTypes.STRING,
    completedPuzzles: DataTypes.STRING
  })

  players.associate = function(models) {
    players.hasMany(models.inventories, {});
    players.hasMany(models.turns, {});
    players.belongsTo(models.users, {});
    players.belongsTo(models.games, {});
  }

  return players;
}