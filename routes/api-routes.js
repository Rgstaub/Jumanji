// require the Twilio API SMS notification service
const sms = require('../config/twilio');
const senderNumber = '+19802220114';

// Our Sequelize database connection
const db = require('../models/');

// A module to allow us to run synchronous functions asyncronously
const async = require('async');

//========================================| API Routes |========================================

module.exports = function(app) {
  // placeholder code
  console.log("API routes have connected");

  app.get('/testsms', (req, res) => {
    console.log("Test SMS sent");
    sms.messages.create({
      body: 'Richard: your turn!',
      to: '+17049062487',  // For testing - replace this with data from the user account later
      from: senderNumber
    })
    .then( message => res.send(message.sid));
  })

  app.get('/creategame/:name', (req, res) => {
    db.games.create({
      gameName: req.params.name,
      numPlayers: 4

    }).then( response => res.send(response) );
  })

  app.get('/createuser/:name', (req, res) => {
    db.users.create({
      name: req.params.name,
      email: "rgstaub@gmail.com",
      phone: "+17049062487"

    }).then( response => res.send(response) );
  })

  // Change this to POST - Add a player to a given game
  app.get('/addplayer/:userId/:gameId/:avatar', (req,res) => {
    // Check if a player with matching gameId and userId already exists before creating a new one
    db.players.findAll({
      where: {
        userId: req.params.userId,   
        gameId: req.params.gameId
      }
    }).then( result => {
      console.log(result);
      // If no match is found, create the new player and set gameId and userId
      if (result.length === 0) {
        console.log(`Adding new player with userId: ${req.params.userId} to gameId: ${req.params.gameId}`);
        db.players.create({
          userId: req.params.userId,
          gameId: req.params.gameId,
          avatar: req.params.avatar,
        }).then( response => res.send(response))
      }
      else {
        res.send(`Player userId: ${req.params.userId} already exists for Game ${req.params.gameId}.`)
      }
    })
  })

  // Get an array of the names of all the players in a given game
  app.get('/namesingame/:gameId', (req, res) => {
    let gId = req.params.gameId;
    db.players.findAll({
      where: {
        gameId: gId
      }
    }).then( players => {
      let ids = [];
      players.forEach(player => {
        ids.push(player.userId)
      })
      console.log(ids);
      db.users.findAll({
        where: {
          id: ids
        }
      }).then(result => {
        let names = [];
        result.forEach(result => names.push(result.name));
        res.send(names);
      })
    })  
  })

  // Get an array of the names of all the players in a given game
  app.get('/playersingame/:gameId', (req, res) => {
    let gId = req.params.gameId;
    db.players.findAll({
      where: {
        gameId: gId
      }
    }).then( players => {
      res.send(players);
    })  
  })
}
