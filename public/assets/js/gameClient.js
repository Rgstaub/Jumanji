$(document).ready(function() {

  $(document).on('click', '.choice', function() {
    let choiceId = $(this).attr('data-choiceId');
    let turnId = $(this).attr('data-turnId');
    console.log(choiceId);
    console.log(turnId);
    let submitStr = "/submitchoice/" + choiceId + "/" + turnId + "/";
    $.post(submitStr).done(function(response) {
      console.log(response);
    })
    
  })
})