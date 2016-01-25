var express = require('express');
var exphbs = require("express-handlebars");

var app = express();



// Middleware =============================================

app.use('/public', express.static('./public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routing ================================================

app.get('/', function(req, res){
	res.render("index", {layout:false});
});

// Listen on provided or default port =====================

app.listen(process.env.PORT || 8080);