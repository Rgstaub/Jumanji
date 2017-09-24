"use strict"

// require the Twilio API SMS notification service
const sms = require('../config/twilio');
const senderNumber = '+19802220114';

// dependencies
const db = require('../models/');
const myData = require('./userdata');
const path = require('path');
const jumanji = require('./jumanji.js');

//==================================================================================================|
//========================================| API Routes |============================================|
//==================================================================================================|

module.exports = (app) => {
  console.log("API routes have connected");

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$      PRODUCTION AREA      $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

// This returns an array of unstarted games and their properties
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
      },
      include: [db.users]
    }).then(players => {
      let sorted = sortGamesPlayers(games, players);
      res.json(sorted);
    })
  })
})

// This creates a new game based on input from the front-end
app.post('/create/add/:gameName/:numPlayers', (req, res) => {
  db.games.create({
    gameName: req.params.gameName,
    numPlayers: req.params.numPlayers,
  }).then( response => res.send(response) );
})

// This adds a player for the active user into the specified game
app.post('/joingame/select/:gameId/:userId?/:avatar?', (req, res) => {
  let userId = myData.myId || req.params.userId;
  console.log(userId);
  if (!userId) {
    res.send("Error: No valid userId found");
  } else {
    console.log("User " + userId + " found");
    // Add the new player row to the DB
    jumanji.addPlayer(req.params.gameId, userId, req.params.avatar, (player) => {
      // Set that player's turn to 0
      jumanji.setPlayerPos(player.id, 0, (status) => {
        if (status[0] !== 1) {
          res.send(`You found a bug. Its creepy-crawly eyes peer into your soul.
          Error: player position was not set properly when adding to game`)
        } else {
          // Set that player's position to 0
          jumanji.setPlayerTurn(player.id, 0, (status) => {
            if (status[0] !== 1) {
              res.send(`You found a bug. You want to touch it but you are too scared.
              You big baby.
              Error: player turn was not set properly when adding to game`)
            } else {
              // Check if the game now has filled all its available spot.s. Start if so
              jumanji.checkForStart(req.params.gameId, (start) => {
                if (start) {
                  // Load the game board
                  jumanji.loadTurn(player.id);
                } else {
                  res.send("waiting for more player");
                }
              })
            }
          })
        }
      })
    })
  }
})

app.post('/createuser', (req, res) => {
  // %%%%%%% Need to validate and sanitaze this user input before proceeding %%%%%%%%
  console.log(req.body)
  db.users.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  }).then( response => res.send(response) );
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

  app.get('/createpuzzle/:flavor', (req, res) => {
    db.puzzles.create({
      puzzleRhyme: `Something that rhymes with ${req.params.flavor}`,
      puzzleScenario: `Here's the situation with ${req.params.flavor}`,
      puzzleImageUrl: `${req.params.flavor}.jpg`
    }).then(puzzle => res.json(puzzle));
  })

  app.get('/createchoice', (req, res) => {
    db.choices.create({
      
    })
  })

  // Change this to POST - Add a player to a given game
  app.get('/addplayer/:userId/:gameId', (req,res) => {
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
          gameId: req.params.gameId
        }).then( response => {
          //setPlayerName(response)
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
      },
      include: [db.users]
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
    gameObj.gameState = game.state;
    gameObj.turn = game.currentTurn;
    gameObj.id = game.id;
    // Add the name of each player in the game to the array
    players.forEach(player => {
      if (player.gameId === game.id) {
        gameObj.players.push(player.user.name);
      }
    })
    // Calculate and set the number of available spots in the game
    gameObj.available = game.numPlayers - gameObj.players.length;
    data.push(gameObj);
  })
  return data;
}

