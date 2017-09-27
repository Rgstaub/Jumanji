$(document).ready(function() {
  $.get('joingame/findgames').done(function(response) {
    console.log(response);
    response.forEach(function(game) {
      let container = $(`<div class="join-game panel panel-default" value="${game.id}></div>`);
      let title = $(`<div class="panel-heading" >`)
    }
  })



})