/*

$('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 500);
    return false;
}); */


'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	console.log("Hello I am in landing.js");
	initializePage();
});

function initializePage(){
	console.log("Page initialized!");
	$('.register').click(createNewUser);
	
}

function createNewUser(){

	console.log("Click detected!");

	var newUsername = $('#usernamePick').val();
	var newPassword = $('#passwordPick').val();
	var newEmail = $('#emailPick').val();

	var newUser = {
		"username": newUsername,
		"password": newPassword,
		"email": newEmail
	}
	console.log("new user!");
	$.post('/', newUser, function(data){
		//console.log(newPost);
	}); 

}