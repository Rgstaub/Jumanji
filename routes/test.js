
var myId = 18;

var string = "/joingame/:";
string = string + myId

console.log(string);

$.ajax({
  method: "get",
  url: string
}).done(function(gameObj) {


})


.done(function(gameArr) {
  gameArr.forEach(function(game) {
    var row = $('<tr></tr>');
    var name = $(`<td>${game.name}</td>`);
    var available = $(`<td>${game.available}</td>`);
    row.append(name);
    row.append(available);
  })

})