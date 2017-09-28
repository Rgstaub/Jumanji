$(document).ready(function() {

	var avatar;
	var userId = window.localStorage.jumanjiId
	if (!userId) {
		var redirectUrl = "http://" + window.location.hostname + ":" + window.location.port + "/login.html";
		window.location.replace(redirectUrl);
	} else {

		let userIdStr = "/setUserId/" + userId;
		console.log(userIdStr);
		$.post(userIdStr).done(function() {

			$(document).on('click', '#chooseIdBtn', function(){
				event.preventDefault();
				var name = $('#gameName').val().trim();
				var players = $('#playerAmount').val();
				var createUrl = "create/add/"+name+"/"+players
				console.log(createUrl);
				$.ajax({
					method: "POST",
					url: createUrl
				}).done(function(response) {
					console.log(response);
					let selectUrl = '/joingame/select/' + response.id + '/' + localStorage.jumanjiId + '/' + avatar;
					console.log(selectUrl);
					$.ajax({
						method: "POST",
						url: selectUrl
					}).done(function(response) {
						console.log(response);
						var redirectUrl = "http://" + window.location.hostname + ":" + window.location.port + "/jumanji.html";
						console.log(redirectUrl);
						window.location.replace(redirectUrl);
					})
				});
			});
		})
	}

	$('.avatarImages').on('click', function() {
		avatar = this.id;

	})


})
