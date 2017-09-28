$(document).ready(function() {

$.ajax({
  method: "get",
  url: "joingame/findgames"
}).done(function(gameArr) {
  console.log(gameArr);
  gameArr.forEach(function(game) {
    var row = $('<tr></tr>');
    var name = $(`<td value=${game.id} class="clickable">${game.name}</td>`);
    var available = $(`<td>${game.available}</td>`);
    var players = $(`<td></td>`);
    var playerName = ""
    game.players.forEach(function(player){
        playerName += player.name + " "
    })
    row.append(name);
    row.append(available);
    row.append(playerName);
    
    
    $("tbody").append (row)
  })
})

$(document).on("click",".clickable", function(){
    //attach event to join game here

    //collect  gameid avatar userID
   var gameid=$(this).val;
   var avatar = chosenAvatar;
   var userId = 1;
   var string = "joingame/select/"+ gameid + "/" + userId + "/" + avatar

$.ajax({
method: "post",
url: string
}).done (function(){
    console.log("worked")
})

})

})
