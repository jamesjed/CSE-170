var express = require('express');
var exphbs = require("express-handlebars");
var mongodb = require("mongodb");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var multer = require('multer');
//var session = require('express-session');

// Initialize express object
var app = express();

var post = require('./routes/post');
var analytics = require('./routes/analytics');


// Listen on provided or default port =====================

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//app.use(session({secret: "secret", resave:false,saveUninitialized:true}))
//app.use(multer());

mongoose.connect('mongodb://james:zerowing1@ds059125.mongolab.com:59125/cse170');

var postSchema = mongoose.Schema({
	title: String,
	imageURL: String,
	imageUPL: String,
	subtitle: String,
	description: String,
	color: String,
    tags: [String],
    date: Date
    
});

var userSchema = mongoose.Schema({
	username: String,
	password: String,
	email: String
});

var PostModel = mongoose.model('posts', postSchema);
var UserModel = mongoose.model('users', userSchema);

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
	socket.on('userSubmit', function(data){
		console.log("Socket received data!");
		io.sockets.emit('showUserType', data);
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

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
});

var upload = multer({ storage: storage});
//var upload = multer({ dest: 'public/uploads/'});

app.post('/newpost', upload.single('upl'), function(req, res){
    
  //  upload.single(req.body.upl.replace("C:\\fakepath\\", ""));
    console.log("Post request received!");
//    console.log(req, 'what2');
	console.log(req.body);
    console.log(req.file);
    

    
    var colors = ['#1FBBA6', '#F27935', '#A51E51', '#D64541', '#00AFD1', '#313750'];
 	var colorVar = Math.floor(Math.random()*5) + 0;
    
	var newPost = new PostModel;

	newPost.title = req.body.title;
	newPost.imageURL = req.body.imageURL;
    
	newPost.subtitle = req.body.subtitle;
	newPost.description = req.body.description;
	newPost.color = colors[colorVar]
    newPost.tags = req.body.tags.replace(/\s/g,'').split(",");
    newPost.date = new Date();
    
    if(req.file == undefined)
    {
        newPost.imageUPL = "";
    }
    else
    {
        newPost.imageUPL = req.file.path;
    }
	//error check
	newPost.save(function(err, savedObject){
		if(err){
			console.log(err);
			return res.status(500).send();
		}
	}); 
    
    res.status(200).send('<html><body></body><script type="text/javascript">window.location.href="/sample";</script></html>');
//	res.sendStatus(200);
//    res.redirect(307, '/sample');
	res.end();
});

app.post('/', function(req, res){
	console.log("Post request received!");
	console.log(req.body);

	var newUser = new UserModel;

	newUser.username = req.body.username;
	newUser.password = req.body.password;
	newUser.email = req.body.email;

	newUser.save(function(err, savedObject){
		if(err){
			console.log(err);
			return res.status(500).send();
		}
	}); 

	res.sendStatus(200);
	res.end();

});


app.post('/chat', function(req, res){
	console.log("Post request received on chat!");
	console.log(req.body.column);

	res.sendStatus(200);
	res.end();
});

/*
//TODO: finish login auth
//login authentication
app.get('/', function(req,res){
	UserModel.findOne({username: username, password: password}, function(err, user){
		if(err){
			console.log(err);
			return res.status(500).send();
		}

		if(!user){
			return res.status(404).send();
			res.redirect('/');
			res.end();
		}
		else{
			//user is found
			req.session.user = user;
			res.status(200).send();
			res.redirect('/views/bootprac');
			res.end();
		}
	})

}); */

app.get('/sample', post.view); 

/*
app.get('/sample', function(req, res) {
    res.render("bootprac", {layout: false});
});  */

app.get('/newpost', function(req, res) {
    res.render("newpost", {layout: false});
});

app.get('/profile', function(req, res) {
    res.render("profile", {layout: false});
});

app.get('/discuss', analytics.viewA);
app.get('/chat', analytics.viewB);

app.get('/preview', function(req, res) {
    res.render("preview", {layout: false});
});

app.get('/liveView', function(req, res) {
    res.render("liveView", {layout: false});
});

app.get('/following', function(req, res) {
	res.render("following", {layout: false});
});



