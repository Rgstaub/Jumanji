"use strict"

// require the Twilio API SMS notification service
const sms = require('../config/twilio');
const senderNumber = '+19802220114';

// dependencies
const db = require('../models/');
const myData = require('./userdata');
const path = require('path');

//==================================================================================================|
//========================================| API Routes |============================================|
//==================================================================================================|

module.exports = (app) => {
  console.log("API routes have connected");

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$      PRODUCTION AREA      $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

// From clicking the "Create New Game" button on the home page. Redirect to game creation page


//========== Move these to HTML Routes =========
app.get('/', (req, res) => {
  res.redirect('index.html');
})

app.get('/creategame', (req, res) => {
  res.redirect('creategame.html');
})
//=============================================

app.get('/joingame/findgames', (req, res) => {
  db.games.findAll({
    where: {
      state: "waiting"
    }
  }).then(games => {
    let gameIds = [];
    games.forEach(game => gameIds.push(game.id));
    db.players.findAll({
      where: {
        gameId: gameIds
      }
    }).then(players => {
      let sorted = sortGamesPlayers(games, players)
    })
  })
})

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$       TEST AREA       $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

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
  app.get('/addplayer/:userId/:gameId?/:avatar', (req,res) => {
    // Check if a player with matching gameId and userId already exists before creating a new one
    db.players.findAll({
      where: {
        userId: req.params.userId,   
        gameId: req.params.gameId
      }
    }).then( result => {
      // If no match is found, create the new player and set gameId and userId
      if (result.length === 0) {
        console.log(`Adding new player with userId: ${req.params.userId} to gameId: ${req.params.gameId}`);
        db.players.create({
          userId: req.params.userId,
          gameId: req.params.gameId,
          avatar: req.params.avatar
        }).then( response => {
          setPlayerName(response)
          res.send("done");
        })
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

//======================================================================================================|
//=========================================| FUNCTIONS |================================================|
//======================================================================================================|

const sortGamesPlayers = (games, players) => {
  let data = [];
  games.forEach(game => {
    let gameObj = {};
    gameObj.name = game.gameName;
    gameObj.players = [];
    players.forEach(player => {
      if (player.gameId === game.id) {
        //player.
      }
    })
  })
}

const setPlayerName = (player) => {
  console.log("*****************");
  console.log(player.userId);
  db.users.findOne({
    where: {
      id: player.userId
    }
  }).then(response => {
    console.log(response.name);
    db.players.update({
      name: response.name
    },
    {
      where: {
        id: player.userId
      },
    })
    .then(response => console.log(response));
  })
}