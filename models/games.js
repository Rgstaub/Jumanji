module.exports = function(sequelize, DataTypes) {
  var games = sequelize.define('games', {

    gameName: {
      type: DataTypes.STRING,
      allowNull: false
    },
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
    // player1_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },
    // player1_avatarUrl: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // player2_id:{
    //   type: DataTypes.INTEGER,
    //   allowNull: true
    // },
    // player3_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true
    // },
    // player4_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true
    // },

  })

  games.associate = function(models) {
    // games.hasMany(models.inventories, {
    //   onDelete: "cascade"
    // });
    games.hasMany(models.players, {
      
    });

  };

  return games;
}