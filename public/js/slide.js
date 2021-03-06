

$(document).ready(initialize);

function initialize(){
	var socket = io.connect();

	$(function(){
		$("#toggle").click(function(){
			$("#displayInfo").toggle('slide');
			event.preventDefault();
			return true;
		});
	});

	console.log("Javascript and JQuery loaded!");

	$("#chatData").submit(broadcast);

	socket.on('showUserType', function(data){
		console.log("Receiving data on client!");
		console.log(data[0].value);

		$('#chatWindow').append(data[0].value + '</br>');
		$('#chatWindow').scrollTop($('#chatWindow')[0].scrollHeight);

	});

	function broadcast(){

		event.preventDefault();
		var $serialized = $("#chatData").serializeArray();
		var serialized = JSON.stringify($serialized);
		console.log($serialized);

		socket.emit('userSubmit', $serialized);

		$.post('/discuss', $serialized, function(data){
			$('#textIn').val('');
		});
	}

}