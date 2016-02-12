var canvas = document.getElementById("whiteboard");

var context = canvas.getContext("2d");
var context2 = canvas.getContext("2d");

var radius = 3;
var dragging = false;

context.canvas.width  = (window.innerWidth)*.9;
context.canvas.height = (window.innerHeight)*.7;

context.lineWidth = radius*2;

var socket = io.connect();
var $whiteboard = $('#whiteboard');

socket.on('mouseReceive', function(data){
	console.log(data.x + " " + data.y);
	context.arc(data.x, data.y, data.radius, data.start, data.end);
	context.fill();
	context.beginPath();
	context.moveTo(data.x, data.y);
	context.lineTo(data.x, data.y);
	context.stroke();
	context.beginPath();
});



/*
socket.on('mouse position', function(data){
	console.log(data.mousex + " " + data.mousey);
}); */

var putPoint = function(e){
	if(dragging){
		context.lineTo(e.clientX, e.clientY);
		context.stroke();
		var dummy = "Circle drawn";
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
	//console.log("Mouse x: " + e.clientX + " Mouse y: " + e.clientY );
	/*
	var mousePos = {
		mousex: e.clientX,
		mousey: e.clientY
	} */

	//socket.emit('mouse position', mousePos);
}

var startDraw = function(e){
	dragging = true;
	putPoint(e);
}

var stopDraw = function(){
	dragging = false;
	context.beginPath();
}

socket.on('touchReceive', function(data){
	console.log(data.x + " " + data.y);
	context.arc(data.x, data.y, data.radius, data.start, data.end);
	context.fill();
	context.beginPath();
	context.moveTo(data.x, data.y);
	context.lineTo(data.x, data.y);
	context.stroke();
	context.beginPath();
});

var touchPutPoint = function(e){
	e.preventDefault();
	var touch = e.touches[0];
	if(dragging){
		context.lineTo(touch.pageX, touch.pageY);
		context.stroke();
		var dummy = "Circle drawn";
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


