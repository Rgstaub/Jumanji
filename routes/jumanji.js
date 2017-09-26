"use strict"

// require the Twilio API SMS notification service
const sms = require('../config/twilio');
const senderNumber = '+19802220114';

// dependencies
const db = require('../models/');
const myData = require('./userdata');
const path = require('path');

/*
     ____                                 __ __ 
    |    |__ __  _____ _____    ____     |__|__|
    |    |  |  \/     \\__  \  /    \    |  |  |
/\__|    |  |  /  Y Y  \/ __ \|   |  \   |  |  |
\________|____/|__|_|  (____  /___|  /\__|  |__|
                     \/     \/     \/\______|   
*/
// The main object controlling the game's functionality and mechanics
const jumanji = {

  addPlayer: (gameId, userId, avatarOpt, cb) => {
    // Check if a player with matching gameId and userId already exists before creating a new one
    db.players.findOne({
      where: {
        userId: userId,
        gameId: gameId
      }
    }).then(result => { 
      // If no match is found, create the new player and set gameId and userId
      var avatar = "";
      if (!avatarOpt) avatar="vforvend.png";
      else avatar = avatarOpt;
      if (result === null) {
        db.players.create({
          userId: userId,
          gameId: gameId,
          avatar: avatar
        }).then(response => {
          console.log(`Adding new player with userId: ${userId} to gameId: ${gameId}`);
          return cb(response);
        })
      } else if (result.userId == userId) {
        return cb(`You found a bug! It is icky and squirmy.
        ERROR: Player userId: ${userId} already exists for Game ${gameId}.`)
      } else {
        return cb(`You found a bug! You contemplate its grossness.
        Player ID# ${userId} was not found`)
      }
    })
  },

  // This function sets up all the data needed for the game screen and send it to the handlebars for rendering
  loadTurn: (playerId, cb) => {
    // This function sets up all the data needed for the game screen and send it to the handlebars for rendering
    console.log("\n\n LOAD TURN \n\n")
    let gameObj = {
      inventory: [
        // {
        //   itemName: ,

        // }
      ],
      gameTurn: null,
      myTurn: null, //
      myName: null, 
      myPlayerId: null, //
      myAvatar: null, //
      myPosition: null, //
      puzzle: {
        puzzleId: null, //
        intro: null,
        description: null,
        image: null,
        choices: [
          // {
          //   choiceId: 65,
          //   text: "..",
          //   action: "move",
          //   value: +2,
          //   result: "....",
          //   item: true,
          //   correctItem: 3
          // }
        ]
      },
      opponents: [ //
        // {
        //   name: "Arya",
        //   position: 6,
        //   turn: 4,
        //   avatar: "wolf.png"
        // }
      ]
    }
    
    // Get the specified player find the current turn
    db.players.findById(playerId, {include: [
      db.turns, db.users, {
        model: db.games,
        include: [{
          model: db.players,
          include: db.users
        }]
      }]
    }).then(player => {
      // Set the readily available values
      gameObj.myTurn = player.turn;
      gameObj.myName = player.user.name;
      gameObj.myPlayerId = playerId;
      gameObj.myAvatar = player.avatar;
      gameObj.gameTurn = player.game.currentTurn;

      player.game.players.forEach(player => {
        
        if (player.id !== playerId) {
          let opponent = {
            name: player.user.name,
            position: player.position,
            turn: player.turn,
            avatar: player.avatar
          };        
          gameObj.opponents.push(opponent);
        }
      })
      
      // Get the correct turn row that corresponds to the player turn
      let currentTurn;
      player.turns.forEach(turnObj => {
        if (turnObj.turn === player.turn) {
          currentTurn = turnObj
        }
      })

      gameObj.puzzle.puzzleId = currentTurn.puzzleId;
      gameObj.myPosition = currentTurn.startingPos;

      db.puzzles.findById( currentTurn.puzzleId,
        {include: [db.choices]}
      ).then(puzzle => {
        gameObj.puzzle.intro = puzzle.puzzleRhyme;
        gameObj.puzzle.description = puzzle.puzzleScenario;
        gameObj.puzzle.image = puzzle.puzzleImage;
        puzzle.choices.forEach(choice => {
          let choiceObj = {
            choiceId: choice.id,
            text: choice.text,
            action: choice.action,
            value: choice.value,
            result: choice.result,
            item: choice.itemOption,
            correctItem: choice.correctItemId
          }
          gameObj.puzzle.choices.push(choiceObj);
        })
        cb(gameObj);
      })
    })
  },

  // Called when a player joind the game or at the end of each turn.
  // Sets turn to a given input, randomly assigns a puzzle that has not been
  // completed by the player, and updates the selected puzzle into the completed list
  setPlayerTurn: (playerId, turn, cb) => {
    db.players.update({turn: turn}, {
      where: {id: playerId}
    }).then((status, player) => {
      db.players.findById(playerId).then(player => {
        // Get an array of the puzzles completed by the player already
        let completed = [];
        if (player.completedPuzzles) {
          completed = player.completedPuzzles.split(", ");
        } else {
          completed = [];
        }
        // Get all the puzzles except for those already completed
        db.puzzles.findAll({
          where: {
            id: {$not: completed}
          }
        }).then(puzzles => {
          // Randomly select one puzzles
          let rand = Math.floor(Math.random() * puzzles.length);
          let randPuzzleId = puzzles[rand].id;
          // Create a new turn for the player and assign it the randomly selected puzzle
          db.turns.create({
            startingPos: player.position,
            turn: player.turn,
            playerId: player.id,
            puzzleId: randPuzzleId
          }).then(turn => {
            // Update the "completedPuzzles" string by adding the ID of the selected puzzle
            let updatedCompletedPuzzles = "";
            if (!player.completedPuzzles) {
              updatedCompletedPuzzles += `${randPuzzleId}`;
            } else {
              updatedCompletedPuzzles += `, ${randPuzzleId}`
            }
            db.players.update(
              {completedPuzzles: updatedCompletedPuzzles},
              {where: {id: player.id}}  
            ).then(status => {
              return cb(status);
            }) 
          })
        })
      })
    })
  },

  setPlayerPos: (playerId, pos, cb) => {
    db.players.update({position: pos}, {
      where: {id: playerId}
    }).then(status => {
      return cb(status);
    })
  },

  checkForStart: (gameId, cb) => {
    db.games.findById(gameId, {
      include: [db.players]
    }).then(game => {
      if (game.players.length - game.numPlayers === 0) {
        console.log("\nStart Game\n");
        db.games.update(
          {
            state: "active",
            currentTurn: 1
          }, 
          {where: {id: gameId}}
        ).then(() => {
          cb(true);
        })
      } else if (game.numPlayers - game.players.length > 0) {
        console.log("\nGame not Started\n")
        cb(false);
      } else console.log('something went wrong');
    })
  },

  addToInventory: (playerId, itemId, cb) => {
    db.inventories.create({
      playerId: playerId,
      itemId: itemId
    }).then(item => {
      cb(item);
    })
  },

  removeFromInventory: (inventoryId, cb) => {
    db.inventories.destroy({
      where: {
        id: inventoryId
      }
    }).then(status => cb(status))
  },

  submitChoice: (choiceId, playerId, cb) => {
    db.players.findById(playerId, {
      include: [db.turns]
    }).then( results => cb(results));
  }


}

module.exports = jumanji;