
$(document).ready(function() {
  console.log(window.localStorage);
  var userId = window.localStorage.jumanjiId
  // If there is no login ID  in local storage, redirect to the login page
  if (!userId) {
    console.log("No login detected");
    var redirectUrl = "http://" + window.location.hostname + ":" + window.location.port + "/login.html";
    window.location.replace(redirectUrl);

  }
  // Otherwise, send get request to server for active games to be rendered
  else {
    let userIdStr = "/setUserId/" + userId;
    console.log(userIdStr);
    $.post(userIdStr).done(function() {
      let resumeUrl = "/resumegames/" + userId;
      console.log(resumeUrl);
      $.get(resumeUrl).done(function(gameArr){
        console.log(gameArr);
        gameArr.forEach(function(game) {

          var gamePanel = $(`<div class="panel panel-default resume-game fixed" data-playerId="${game.myPlayerId}"></div>`);
          var name = $(`<div class="panel panel-heading"></div>`);
          name.text(game.name);
          gamePanel.append(name);
          var players = $(`<div class="panel panel-body">Players in game:</div>`);
          if (game.gameState === "waiting") {
            var available = $(`<div class="panel panel-body"></div>`);
            available.text(`Open Spots: ${game.available}`);
            gamePanel.append(available);
          } else {
            var turn = $(`<div class="panel panel-body"></div>`);
            turn.text(`Turn: ${game.turn}`);
            gamePanel.append(turn);
          }
          var playerName = ""
          game.players.forEach(function(player){
              playerName = $(`<p>${player}</p>`);
              players.append(playerName);
          })
          
          
          gamePanel.append(players)
          $("#resumable").append(gamePanel);
        })
      })
    })
  }

  $(document).on('click', '.resume-game', function() {
    event.preventDefault();
    var playerId = $(this).attr("data-playerId");
    sessionStorage.setItem("jumanjiPlayerId", playerId);

    var resumeUrl = "/loadturn/" + playerId;
    $.get(resumeUrl).done(function(response) {
      console.log(response);
      var redirectUrl = "http://" + window.location.hostname + ":" + window.location.port + "/jumanji.html";
      console.log(redirectUrl);
      window.location.replace(redirectUrl);
    })
  })



})