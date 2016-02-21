/*(var express = require('express');
var router = express.Router();
var user = require('../routes/user');

//Login Authentication
router.post('/login', function(req, res){
	var username = req.body.username;
	var password = req.body.password;

	User.findOne({username: username, password: password}, function(err, user){
		if(err){
			console.log(err);
			return res.status(500).send();
		}

		if(!user){
			return res.status(404).send();
		}
		//user is found
		req.session.user = user;
		return res.status(200).send();
	})
});

//Sign up as new user
router.post('/register', function(req, res){
	var username = req.body.username;
	var password = req.body.password;

	var newuser = new User();
	newuser.username = username;
	newuser.password = password;
	newuser.save(function(err, savedUser){
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		return res.status(200).send();
	})
});

module.exports = router

//TODO: npm install --save express-session
router.get('/bootprac', function(req, res){
	//if user is not logged in
	if(!req.session.user){
		return res.status(401).send();
	}
});

//logout by deleting session
router.get('/logout', function(req, res){
	req.session.destroy();
	return res.status(200).send();
});
*/