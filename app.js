var express = require('express');
var exphbs = require("express-handlebars");

// Initialize express object
var app = express();
var sample = require('./routes/sample');
var profile = require('./routes/newpost');

// Listen on provided or default port =====================

var port = process.env.PORT || 8080;

var server = app.listen(port, function(){
	console.log("Node server listening on port %s", port);
});

var io = require('socket.io').listen(server)
	console.log("Socket is working");

io.sockets.on('connection', function(socket){
	socket.on('send message', function(data){
		io.sockets.emit('new message', data);
	});
	socket.on('mouseDraw', function(data){
		io.sockets.emit("mouseReceive", data);
	});
	socket.on('touchDraw', function(data){
		io.sockets.emit("touchReceive", data);
	});
	socket.on('mouse position', function(data){
		socket.broadcast.emit("send position", data);
	});
});

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Middleware =============================================

app.use('/public', express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');

// Routing ================================================

app.get('/', function(req, res){
	res.render("index", {layout:false});
});

app.get('/sample', function(req, res){
	res.render("bootprac", {layout:false});
});

app.get('/practice', function(req, res){
	res.render("bootprac", {layout:false});
});

app.get('/newpost', function(req, res) {
    res.render("newpost", {layout: false});
});

app.get('/profile', function(req, res) {
    res.render("profile", {layout: false});
});

app.get('/discuss', function(req, res) {
    res.render("discussion", {layout: false});
});

app.get('/preview', function(req, res) {
    res.render("preview", {layout: false});
});

app.get('/liveView', function(req, res) {
    res.render("liveView", {layout: false});
});

app.get('/following', function(req, res) {
	res.render("following", {layout: false});
});

app.get('/chat', function(req, res){
	res.render("socket_test", {layout: false});
});

/*
app.get('/sample', sample.view);
<<<<<<< HEAD
app.get('./profile', profile.addPost);
*/



