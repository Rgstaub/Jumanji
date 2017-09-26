

$(document).on('click', '#chooseIdBtn', function(){
	event.preventDefault();
	var name = $('#gameName').val().trim();
	var players = $('#playerAmount').val();
	var url = "create/add/"+name+"/"+players
	$.ajax({
		method: "POST",
		url: url
	}).done(console.log(url));
});

$(document).on('click', '#chooseIdBtn', function(){
	var avatarImg = x
	});


//_________________________________________________________________________________________________________

// chosenAvatar = whatever you clicked on__________could propbably be coded as a for loop 
// used in create and join

document.getElementById("sword").onclick = function() {
	var chosenAvatar = this.id
	console.log(chosenAvatar)
}; 

document.getElementById("skull").onclick = function() {
	var chosenAvatar = this.id
	console.log(chosenAvatar)
}; 

document.getElementById("vforven").onclick = function() {
	var chosenAvatar = this.id
	console.log(chosenAvatar)
}; 

document.getElementById("magnify").onclick = function() {
	var chosenAvatar = this.id
	console.log(chosenAvatar)
}; 

document.getElementById("darth").onclick = function() {
	var chosenAvatar = this.id
	console.log(chosenAvatar)
}; 

document.getElementById("sun").onclick = function() {
	var chosenAvatar = this.id
	console.log(chosenAvatar)
}; 

document.getElementById("home").onclick = function() {
	var chosenAvatar = this.id
	console.log(chosenAvatar)
}; 

document.getElementById("health").onclick = function() {
	var chosenAvatar = this.id
	console.log(chosenAvatar)
}; 
______________________________________________________________________________________________________


