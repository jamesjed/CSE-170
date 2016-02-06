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

var startDraw = function(e){
	dragging = true;
	putPoint(e);
}

var stopDraw = function(){
	dragging = false;
}

var touchPutPoint = function(e){
	e.preventDefault();
	if(dragging){
		var touch = e.touches[0];
		context.beginPath();

	// Offset x and y are the coordinates of the mouse relative
	// to the browser window
		context.arc(touch.pageX, touch.pageY, 2, radius, 2 * Math.PI);
		context.fill();
	}

}

var touchStartDraw = function(e){
	e.preventDefault();
	dragging = true;
	var touch = e.touches[0];
	touchPutPoint(e);
}

var touchStopDraw = function(){
	e.preventDefault();
	dragging = false;
}

canvas.addEventListener('mousemove', putPoint);
canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mouseup', stopDraw);

canvas.addEventListener('touchmove', touchPutPoint);
canvas.addEventListener('touchstart', touchStartDraw);
canvas.addEventListener('touchend', touchStopDraw);
