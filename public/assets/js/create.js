$('document').ready(function() {

	var avatar;

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

	// $(document).on('click', '#chooseIdBtn', function(){
	// 	var avatarImg = x
	// 	});


	//_________________________________________________________________________________________________________

	// chosenAvatar = whatever you clicked on__________could propbably be coded as a for loop 
	// used in create and join

	$('.avatarImages').on('click', function() {
		avatar = this.id;
		console.log(avatar);
	})


})
