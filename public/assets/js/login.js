
$(document).ready(function() {
  $('#submitBtn').click(function() {
    event.preventDefault();
    var name = $('#usr').val().trim();
    // var password = $('#pwd').val().trim();
    var email = $('#eMail').val().trim();
    var phone = $('#phoneNumber').val().trim();
    if (name) {
      console.log(name);
      let data = {
        "name": name,
        // "password": password,
        "email": email,
        "phone": phone
      }
      $.post('/createuser', data).done(function(response) {
        console.log(response);
        localStorage.setItem("jumanjiId", response.id);
        var redirectUrl = "http://" + window.location.hostname + ":" + window.location.port + "/index.html";
        window.location.replace(redirectUrl);
      })
    }
  })
})

