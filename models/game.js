module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define('game', {

    numPlayers: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    activeGame: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    winningPlayer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },
    allPlayer_ids: {
      type: DataTypes.STRING,
      allowNull: false
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
    player1_data: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    /* =============================| Example Player Data Object |=================================
    ====| This object will be stored as a string and parsed out by the server-sode controllers |===
    
    let playerData = {
      currentTurn: 7    // This player's current turn
      completedPuzzles: [1, 2, 3, 6, 13, 22],   // The IUs of the puzzles that the player has already seen in this game
      position: 11,     // Current position on the game board
      inventory: [3, 7, 11, 6, 1, 9]    // These are the IDs of inventory items currently carried by the player
      notifications: [
        {
          text: "Danny has triggered a mudslide! All players have been moved back 2 spaces",
          read: true
        },
        {
          text: "Richard has released a giant swarm of wasps! All players' movement rolls are -1 for the rest of the game",
          read: false
        }
      ],
    }
    */
    player2_data: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    player3_data: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    player4_data: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  })
  return Game;
}