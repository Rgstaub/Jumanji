const jumanji = require('./jumanji.js');
const myData = require('./userData');
const path = require('path');


//========================| HTML Routes |=========================

module.exports = function(app) {
  console.log("HTML routes have connected");

  app.post('/', (req, res) => {
    console.log("PING")
    jumanji.checkId(myData.myId, (identified) => {
      if (identified) res.redirect(welcome.html);
      else {
        res.redirect('login.html');
      }
    })
  })

  app.get('/login', (req, res) => {
    console.log("Login route");
    res.redirect('login.html');
  })
  
  app.get('/create', (req, res) => {
    res.redirect('create.html');
  })
  
  app.get('/join', (req, res) => {
    res.redirect('join.html')
  })

    

}