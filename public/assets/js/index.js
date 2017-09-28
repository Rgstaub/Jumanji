
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
      $.get(resumeUrl).done(function(response){
        console.log(response);
      })
    })
  }

  // $('#createGame').click(function() {
  //   event.preventDefault();

  // })

})