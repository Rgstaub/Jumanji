

//========================| HTML Routes |======================

module.exports = function(app) {
  console.log("HTML routes have connected");

  app.get('/', (req, res) => {
    res.redirect('index.html');
  })
  
  app.get('/create', (req, res) => {
    res.redirect('create.html');
  })
  
  app.get('/join', (req, res) => {
    res.redirect('join.html')
  })
}