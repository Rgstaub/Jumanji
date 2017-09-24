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

  addPlayer: (gameId, userId, cb) => {
    // Check if a player with matching gameId and userId already exists before creating a new one
    db.players.findOne({
      where: {
        userId: userId,
        gameId: gameId
      }
    }).then(result => { 
      // If no match is found, create the new player and set gameId and userId
      if (result === null) {
        db.players.create({
          userId: userId,
          gameId: gameId
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

  joinGame: (gameId, userId) => {
    // This function sets up all the data needed for the game screen and send it to the handlebars for rendering
    /*
    {
      inventory: [],
      gameTuen: 0,
      myturn: 0,

    }
    */

  },

  setPlayerTurn: (playerId, turn, cb) => {
    db.players.update({turn: turn}, {
        where: {
          id: playerId
        }
      }
    ).then(status => {
      return cb(status);
    })
  },

  setPlayerPos: (playerId, pos, cb) => {
    db.players.update({position: pos}, {
      where: {
        id: playerId
      }
    }).then(status => {
      return cb(status);
    })
  }







}

module.exports = jumanji;