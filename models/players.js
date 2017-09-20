module.exports = function(sequelize, DataTypes) {
  var players = sequelize.define('players', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    phone: DataTypes.STRING
  })

  players.associate = function(models) {
    players.hasMany(models.games, {});
    players.hasMany(models.turns, {});
    players.hasMany(models.inventories, {})
  }

  return players;
}