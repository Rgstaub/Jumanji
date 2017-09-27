
$(document).ready(function() {
  console.log(window.localStorage);
  // If there is no login ID  in local storage, redirect to the login page
  if (!window.localStorage.jumanjiId) {
    console.log("No login detected");
    var redirectUrl = "http://" + window.location.hostname + ":" + window.location.port + "/login.html";
    window.location.replace(redirectUrl);

  }
  // Otherwise, sent get request to server for active games to be rendered
  else {
    
  }

})