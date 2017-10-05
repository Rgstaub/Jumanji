var endTurn = function(playerId, position, turn) {
  
  let endStr = `/endturn/${playerId}/${position}/${turn}`;
  console.log(endStr);
  $.post(endStr).done(function(response) {
    console.log(response);
    location.reload();
  })
}


$(document).ready(function() {

  $(document).on('click', '.choice', function() {
    var choiceId = $(this).attr('data-choiceId');
    var turnId = $(this).attr('data-turnId');
    console.log(choiceId);
    console.log(turnId);
    var submitStr = "/submitchoice/" + choiceId + "/" + turnId + "/";
    $.post(submitStr).done(function(response) {
      console.log(response);
    })
  })
})