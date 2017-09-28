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

// This return an array of active games for a given player
app.get('/resumegames/:userId', (req, res) => {
  let userId = req.params.userId;
  db.players.findAll({
    where: {
      userId: userId
    },
    include: {
      model: db.games,
      include: [db.players]
    }
  }).then( myPlayers => {
    let games = []
    let gameIds = [];
    myPlayers.forEach(myPlayer => {
      gameIds.push(myPlayer.gameId);
      games.push(myPlayer.game);
    })
    console.log(games);
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
app.post('/joingame/select/:gameId/:userId/:avatar?', (req, res) => {
  let userId = myData.myId || req.params.userId;
  let playerId;
  console.log(userId);

  if (!userId) {
    res.send("Error: No valid userId found");
  } else {
    console.log("User " + userId + " found");
    // Add the new player row to the DB
    jumanji.addPlayer(req.params.gameId, userId, req.params.avatar, (player) => {
      // Set that player's position to 0
      jumanji.setPlayerPos(player.id, 0, (playerId) => {
        // Set that player's turn to 1
        jumanji.setPlayerTurn(playerId, 1, () => {
          console.log("turn set successfully");
          // Check if the game now has filled all its available spot.s. Start if so
          jumanji.checkForStart(req.params.gameId, (start) => {
            if (start) {
              // Load the game board
              jumanji.loadTurn(player.id, (result) => {
                res.json(result);
              });
            } else {
              res.json(player.id);
            }
          })
        })
      })
    })
  }
})

app.get('/loadturn/:playerId', (req, res) => {
  jumanji.loadTurn(req.params.playerId, (result) => {
    res.json(result);
  })
})

app.post('/submitchoice/:choiceId/:turnId/?:inventoryId', (req, res) => {
  jumanji.submitChoice(req.params.choiceId, req.params.turnId, (itemBool, itemId, action, value, startingPos, playerId) => {
    if (itemBool) {
      jumanji.removeFromInventory(req.params.inventoryId, () => {
        let newPosition = startingPos + value;
        jumanji.setPlayerPos(playerId, newPosition, () => {
          res.status(200);
        })
      })
    } else if (action === "get item") {
      jumanji.addToInventory(playerId, value, () => {
        res.status(200);
      })
    } else if (action === "move") {
      let newPosition = startingPos + value;
      jumanji.setPlayerPos(playerId, newPosition, () => {
        res.status(200);
      })
    } else if (action === "die") {
      jumanji.setPlayerPos(playerId, 0, () => {
        res.status(200);
      })
    }
    
  })
})

app.post('/createuser', (req, res) => {
  // %%%%%%% Need to validate and sanitaze this user input before proceeding %%%%%%%%
  console.log(req.body)
  db.users.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  }).then( response => {
    myData.myId = response.id;
    res.send(response); 
  });
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

  app.get('/createchoice/:puzzleId/:flavor', (req, res) => {
    db.choices.create({
      text: `Do: ${req.params.flavor}`,
      itemOptions: false,
      resultsAction: 'move',
      puzzleId: req.params.puzzleId,
      resultValue: 2,
      resultText: `A result related to ${req.params.flavor}`
    }).then( result => res.json(result));
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

  app.get('/additem/:flavor', (req, res) => {
    db.items.create({
      itemName: req.params.flavor,
      itemImageUrl: `${req.params.flavor}.png`
    }).then( item => res.send(item));
  })

  app.get('/addtoinventory/:itemId/:playerId', (req, res) => {
    db.inventories.create({
      playerId: req.params.playerId,
      itemId: req.params.itemId
    }).then( inventory => res.send(inventory));
  })

  app.get('/deletefrominventory/:inventoryId', (req, res) => {
    db.inventories.destroy({
      where: {
        id: req.params.inventoryId
      }
    }).then( result => res.send(result));
  })

  app.get('/getinventory/:playerId', (req, res) => {
    db.inventories.findAll({
      where: {
        playerId: req.params.playerId
      },
      include: [db.items]
    }).then( inventories => res.json(inventories));
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

