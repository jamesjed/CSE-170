var express = require('express');
var exphbs = require("express-handlebars");
var mongodb = require("mongodb");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var multer = require('multer');

// Initialize express object
var app = express();
var sample = require('./routes/sample');
var profile = require('./routes/newpost');
var post = require('./routes/post');
var postData = require('./routes/postData');

// Listen on provided or default port =====================

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//app.use(multer());

mongoose.connect('mongodb://james:zerowing1@ds059125.mongolab.com:59125/cse170');

var postSchema = mongoose.Schema({
	title: String,
	imageURL: String,
	subtitle: String,
	description: String,
	color: Number  
});

var PostModel = mongoose.model('posts', postSchema);

var port = process.env.PORT || 8080;

var server = app.listen(port, function(){
	console.log("Node server listening on port %s", port);
});


// Listen for user events then broadcast them out to other users
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

// Set UI engine ==========================================

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Middleware =============================================

app.use('/public', express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');



// Routing ================================================

app.get('/', function(req, res){
	res.render("index", {layout:false});
});

/*
app.get('/sample', function(req, res){
	res.render("bootprac", {layout:false});
}); */

app.post('/newpost', function(req, res){
	//console.log("Post request received!");
	//console.log(req.body);

	var newPost = new PostModel;

	newPost.title = req.body.title;
	newPost.imageURL = req.body.imageURL;
	newPost.subtitle = req.body.subtitle;
	newPost.description = req.body.description;

	newPost.save(function(err, savedObject){
		if(err){
			console.log(err);
		}
	});

});

app.get('/sample', post.view);

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
app.get('/postData', postData.viewData); */
/*
app.get('/sample', sample.view);
app.get('./profile', profile.addPost);
*/




