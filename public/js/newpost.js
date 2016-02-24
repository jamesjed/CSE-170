
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	console.log("Hello I am in newpost.js");
	initializePage();
});

/*
 * Function that is called when the document is ready.
 */

function initializePage() {
	$('#postNew').click(postNew);
}

function postNew(){
	var title = $('#postTitle').val();
	var url = $('#postImage').val();
 	var subtitle = $('#postSubtitle').val();
 	var description = $('#description').val();
 	var colors = ['#1FBBA6', '#F27935', '#A51E51', '#D64541', '#00AFD1', '#313750'];
 	var colorVar = Math.floor(Math.random()*5) + 0;

	var newPost = {
		"imageURL": url,
 		"title": title,
 		"subtitle": subtitle,
 		"description": description,
 		"color": colors[colorVar]
	} 
	
	$.post('./newpost', newPost, function(data){
	}); 


}