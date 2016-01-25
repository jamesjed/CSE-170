var express = require('express');
var exphbs = require("express-handlebars");

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Middleware =============================================

app.use('/public', express.static('./public'));

// Routing ================================================

app.get('/', function(req, res){
	res.render("index", {layout:false});
});

// Listen on provided or default port =====================

app.listen(process.env.PORT || 8080);