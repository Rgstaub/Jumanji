module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define('player', {


    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    e_mail: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    numberOfGamesWon: DataTypes.INTEGER,
    numberOfGamesPlayed:DataTypes.INTEGER,
    numberOfGamesLost: DataTypes.INTEGER

  })
}