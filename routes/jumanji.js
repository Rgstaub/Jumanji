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

  loadTurn: (playerId) => {
    // This function sets up all the data needed for the game screen and send it to the handlebars for rendering
    /*
    {
      inventory: ["torch", "machete"],
      gameTurn: 3,
      myturn: 3,
      myName: "Jack",
      myPosition: 8,
      opponents: [
        {
          name: "Maria",
          position: 6
          turn:
        }
      ]

    }
    */

  },

  setPlayerTurn: (playerId, turn, cb) => {
    db.players.update({turn: turn}, {
      where: {id: playerId}
    }).then(status => {
      return cb(status);
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