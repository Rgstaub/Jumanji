module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define('game', {

    numPlayers: DataTypes.INTEGER,
    winningPlayer_id: DataType.INTEGER,
    allPlayer_ids: DataTypes.STRING,
    player1_id: DataTypes.INTEGER,
    player2_id: DataTypes.INTEGER,
    player3_id: DataTypes.INTEGER,
    player4_id: DataTypes.INTEGER,
    player1_name: DataTypes.STRING,
    player2_name: DataTypes.STRING,
    player3_name: DataTypes.STRING,
    player4_name: DataTypes.STRING,
    player1_pos: DataTypes.INTEGER,
    player2_pos: DataTypes.INTEGER,
    player3_pos: DataTypes.INTEGER,
    player4_pos: DataTypes.INTEGER,
    player1_turn: DataType.INTEGER,
    player2_turn: DataType.INTEGER,
    player3_turn: DataType.INTEGER,
    player4_turn: DataType.INTEGER,
    player1_completedQuestions: DataTypes.STRING,
    player2_completedQuestions: DataTypes.STRING,
    player3_completedQuestions: DataTypes.STRING,
    player4_completedQuestions: DataTypes.STRING,
    player1_inventory: DataTypes.STRING,
    player2_inventory: DataTypes.STRING,
    player3_inventory: DataTypes.STRING,
    player4_inventory: DataTypes.STRING,

  })
}