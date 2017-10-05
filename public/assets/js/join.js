$(document).ready(function() {

  var chosenAvatar;
  var userId = localStorage.jumanjiId;
  console.log(userId);

  let userIdStr = "/setUserId/" + userId;
  console.log(userIdStr);
  $.post(userIdStr).done(function() {

    $.ajax({
      method: "get",
      url: "joingame/findgames"
    }).done(function(gameArr) {
      console.log(gameArr);
      gameArr.forEach(function(game) {
        var gamePanel = $(`<div class="panel panel-default join-game fixed" data-gameId="${game.id}"></div>`);
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
  })

  $(document).on("click",".join-game", function(){
    event.preventDefault();
    var gameId = $(this).attr("data-gameId");
    //assemble the string for the API call
    var joinStr = "joingame/select/" + gameId + '/' + userId + '/';
    if (chosenAvatar) {
      joinStr += chosenAvatar;
    }
    console.log(joinStr);

    $.post(joinStr).done(function(playerId) {
      sessionStorage.setItem("jumanjiPlayerId", playerId);
      var redirectUrl = "http://" + window.location.hostname + ":" + window.location.port + "/jumanji.html";
      console.log(redirectUrl);
      window.location.replace(redirectUrl);
    })



	})

  $('.avatarImages').on('click', function() {
		chosenAvatar = this.id;
		console.log(chosenAvatar);
  })
})