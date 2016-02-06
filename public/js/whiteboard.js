var canvas = document.getElementById("whiteboard");

var context = canvas.getContext("2d");

var radius = 10;
var dragging = false;

context.canvas.width  = (window.innerWidth)*.9;
context.canvas.height = (window.innerHeight)*.8;

var putPoint = function(e){

	if(dragging){
	context.beginPath();

	// Offset x and y are the coordinates of the mouse relative
	// to the browser window
	context.arc(e.offsetX, e.offsetY, 2, radius, 2 * Math.PI);
	context.fill();
	}
}

var startDraw = function(){
	dragging = true;
}

var stopDraw = function(){
	dragging = false;
}

canvas.addEventListener('mousemove', putPoint);
canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mouseup', stopDraw);

