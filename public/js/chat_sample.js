$(document).ready(initialize);

function initialize(){

	var canvas = document.getElementById("whiteboardSurface");

	var context = canvas.getContext("2d");
	var context2 = canvas.getContext("2d");

	var radius = 3;
	var dragging = false;
	var endEmit = false;

	context.canvas.width  = (window.innerWidth);
	context.canvas.height = (window.innerHeight);

	context.lineWidth = radius*2;

	var socket = io.connect();
	var $whiteboard = $('#whiteboardSurface');

	$('#navTab1').on('click', function(){
		$('#navTab1').css({'background-color': '#00AFD1'});
		$('#navTab2').css({'background-color': 'gray'});
		$('#whiteboardTitle').css({'display': 'inline'});
		$('#whiteboard').css({'display': 'inline'});
		$('#chatTitle').css({'display': 'none'});
		$('#chat').css({'display': 'none'});
		ga('send', 'event', 'Tab-Click', 'Whiteboard-Click', 'Hello', 1);
		_gaq.push(['_trackEvent', 'button3', 'clicked']);
	});

	$('#navTab2').on('click', function(){
		$('#navTab2').css({'background-color': '#00AFD1'});
		$('#navTab1').css({'background-color': 'gray'});
		$('#whiteboardTitle').css({'display': 'none'});
		$('#whiteboard').css({'display': 'none'});
		$('#chatTitle').css({'display': 'inline'});
		$('#chat').css({'display': 'inline'});
	});

// Receive data from other user drawings and use the data
// to draw data on your own screen
socket.on('mouseReceive', function(data){
	//console.log(data.x + " " + data.y);

	/*
	context.beginPath();
	context.lineTo(data.x, data.y);
	context.stroke();
	context.beginPath(); */

	context.arc(data.x, data.y, data.radius, data.start, data.end);
	context.fill();
	context.beginPath();

});

var putPoint = function(e){
	if(dragging){
		context.lineTo(e.clientX, e.clientY);
		context.stroke();

		var data = {
			x: e.clientX,
			y: e.clientY,
			radius: radius,
			start: 0,
			end: 2 * Math.PI
		}
		socket.emit('mouseDraw', data);
		context.beginPath();

		// Offset x and y are the coordinates of the mouse relative
		// to the browser window
		context.arc(e.clientX, e.clientY, radius, 0, 2 * Math.PI);
		context.fill();
		context.beginPath();
		context.moveTo(e.clientX, e.clientY);
	}

}

var startDraw = function(e){
	dragging = true;
	endEmit = true;
	putPoint(e);
}

var stopDraw = function(){
	dragging = false;
	endEmit = false;
	context.beginPath();
}

socket.on('touchReceive', function(data){
	//console.log(data.x + " " + data.y);
	//context.beginPath();

	/*
	context.lineTo(data.x, data.y);
	context.stroke();
	context.beginPath(); */

	context.arc(data.x, data.y, data.radius, data.start, data.end);
	context.fill();
	context.beginPath();

});

var touchPutPoint = function(e){
	e.preventDefault();
	var touch = e.touches[0];
	if(dragging){
		context.lineTo(touch.pageX, touch.pageY);
		context.stroke();

		var data = {
			x: touch.pageX,
			y: touch.pageY,
			radius: radius,
			start: 0,
			end: 2 * Math.PI
		}
		context.beginPath();

		// Offset x and y are the coordinates of the mouse relative
		// to the browser window
		context.arc(touch.pageX, touch.pageY, radius, 0, 2 * Math.PI);
		socket.emit('touchDraw', data);
		context.fill();
		context.beginPath();
		context.moveTo(touch.pageX, touch.pageY);
	}

}

var touchStartDraw = function(e){
	e.preventDefault();
	context.beginPath();
	dragging = true;
	touchPutPoint(e);
}

var touchStopDraw = function(e){
	e.preventDefault();
	context.beginPath();
	dragging = false;

}

canvas.addEventListener('mousemove', putPoint);
canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mouseup', stopDraw);

canvas.addEventListener('touchmove', touchPutPoint);
canvas.addEventListener('touchstart', touchStartDraw);
canvas.addEventListener('touchend', touchStopDraw);

console.log("Javascript and JQuery loaded!");



$("#chatData").submit(broadcast);

socket.on('showUserType', function(data){
	console.log("Receiving data on client!");
	console.log(data[0].value);

	$('#chatWindow').append( data[0].value + '</br>');
	$('#chatWindow').scrollTop($('#chatWindow')[0].scrollHeight);

});


function broadcast(){

	event.preventDefault();
	var $serialized = $("#chatData").serializeArray();
	var serialized = JSON.stringify($serialized);
	console.log($serialized);

	socket.emit('userSubmit', $serialized);

	$.post('/chat', $serialized, function(data){
		$('#textIn').val('');
	});
} 

}



