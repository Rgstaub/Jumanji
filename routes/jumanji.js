"use strict"

// require the Twilio API SMS notification service
const sms = require('../config/twilio');
const senderNumber = '+19802220114';

// dependencies
const db = require('../models/');
const myData = require('./userdata');
const path = require('path');

/*
     ____.                                __.__ 
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

  loadTurn: (playerId, cb) => {
    // This function sets up all the data needed for the game screen and send it to the handlebars for rendering
    
    let gameObj = {
      inventory: [],
      gameTurn: null,
      myturn: null,
      myName: null,
      myAvatar: null,
      myPosition: 8,
      puzzle: {
        puzzleId: null,
        intro: null,
        description: null,
        image: null,
        options: [
          // {
          //   optionId: 65,
          //   text: "..",
          //   action: "move",
          //   value: +2,
          //   result: "....",
          //   item: true,
          //   correctItem: 3
          // }
        ]
      },
      opponents: [
        // {
        //   name: "Arya",
        //   position: 6,
        //   turn: 4,
        //   avatar: "wolf.png"
        // }
      ]
    }
    
    // Get the specified player find the current turn
    db.players.findById(playerId, {include: [db.turns]}).then(player => {

      // collect an array for all of the turns already set for the player
      let allTurns = []
      player.turns.forEach(turnObj => {
        allTurns.push(turnObj.turn)
      });
      // If a turn does not exist for this player turn, do something....
      if (allTurns.indexOf(player.turn) === -1) {
        console.log("\n\nThis turn does not exists\n");
      // Otherwise, 
      } else {

      }
    })

  },

  setPlayerTurn: (playerId, turn, cb) => {
    db.players.update({turn: turn}, {
      where: {id: playerId}
    }).then((status, player) => {
      db.players.findById(playerId).then(player => {
        let completed = player.completedPuzzles.split(", ");
        db.puzzles.findAll({
          where: {
            id: {
              $not: completed
            }
          }
        }).then(puzzles => {
          console.log(puzzles);
        })
        db.turns.create({
          startingPos: player.position,
          turn: player.turn,
          playerId: player.id
        }).then(turn => {
          console.log(turn);
          return cb(status);
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
  }





}

module.exports = jumanji;