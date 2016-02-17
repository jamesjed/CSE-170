'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
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
	var json = $.getJSON('/postData', updateAndPost);

	function updateAndPost(data){
		var jsonString = JSON.stringify(data, null, "\t");

		var newPost = {
			"imageURL": "http://www.yosemitehikes.com/images/wallpaper/yosemitehikes.com-upper-yosemite-falls-1900x1200.jpg",
			"title": "Next Steps in Conservation",
			"subtitle": "This is a subtitle",
			"description": "This is just a sample post with a picture of yosemite"
		}

		$.post('/newpost', newPost, function(data){
			console.log("Hello world!");
			checkRedirect();
		});

		//jsonString.ideas.push(newPost);
		console.log(newPost);
	}
/*
	function checkRedirect(data, function){
		if (data.size()>0){
			window.location.href = "/sample";
		}
		else{
			function(data);
		}

	} */
}