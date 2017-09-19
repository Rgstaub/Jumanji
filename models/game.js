module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define('game', {

    numPlayers: DataTypes.INTEGER,
    winningPlayer_id: DataTypes.INTEGER,
    allPlayer_ids: DataTypes.STRING,
    player1_id: DataTypes.INTEGER,
    player2_id: DataTypes.INTEGER,
    player3_id: DataTypes.INTEGER,
    player4_id: DataTypes.INTEGER,
    player1_data: DataTypes.TEXT,
    player2_data: DataTypes.TEXT,
    player3_data: DataTypes.TEXT,
    player4_data: DataTypes.TEXT
  })
  return Game;
}