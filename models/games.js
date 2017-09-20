module.exports = function(sequelize, DataTypes) {
  var games = sequelize.define('games', {

    numPlayers: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      defaultValue: "waiting", // Other options are "active" and "complete"
      allowNull: false
    },
    winningPlayer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },
    player1_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    player2_id:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    player3_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    player4_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

  })

  games.associate = function(models) {
    games.hasMany(models.inventories, {
      onDelete: "cascade"
    });
    games.hasMany(models.turns, {
      onDelete: "cascade"
    });
    // games.hasMany(models.players, {
//      ********* Unhandled rejection Error: Cyclic dependency found. games is dependent of itself. 
//                Dependency chain: choices -> puzzles -> turns -> games -> players => games
    // })
  };

  return games;
}