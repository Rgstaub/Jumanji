$(document).ready(function() {

  $.ajax({
    method: "get",
    url: "joingame/findgames"
  }).done(function(gameArr) {
    console.log(gameArr);
    gameArr.forEach(function(game) {
      var gamePanel = $(`<div class="panel panel-default join-game fixed" val="${game.id}"></div>`);
      var name = $(`<div class="panel panel-heading"></div>`);
      name.text(game.name);
      var players = $(`<div class="panel panel-body">Players in game:</div>`);
      var available = $(`<div class="panel panel-body"></div>`);
      available.text(`Open Spots: ${game.available}`);
      var playerName = ""
      game.players.forEach(function(player){
          playerName = $(`<p>${player}</p>`);
          players.append(playerName);
      })
      gamePanel.append(name);
      gamePanel.append(available);
      gamePanel.append(players)
      $("#joinable").append(gamePanel);
    })
  })

  $(document).on("click",".join-game", function(){
    event.preventDefault();
      //assemble the string for the API call
      var joinStr = "joingame/select/"
      var gameId = $(this).val();
      console.log(gameId);
      //collect  gameid avatar userID
    //  var gameid=$(this).val;
    //  var avatar = chosenAvatar;
    //  var userId = 1;
    //  var string = "joingame/select/"+ gameid + "/" + userId + "/" + avatar

  // $.ajax({
  // method: "post",
  // url: string
  // }).done (function(){
  //     console.log("worked")
  // })


  })
})