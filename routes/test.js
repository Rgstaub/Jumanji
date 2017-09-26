
var myId = 18;

var string = "/joingame/:";
string = string + myId

console.log(string);

$.ajax({
  method: "get",
  url: string
}).done(function(gameObj) {


})


