//var data = require('../data.json');
var express = require('express');
var mongoose = require('mongoose');
//var takenData = ('/postData');

exports.view = function(req, res){

	var data = [];

	mongoose.model('posts').find({}, function(err, posts){
		//console.log(posts);
		res.render('bootprac', {postData: posts, layout: false });			
	}).sort({"date": -1});
	
};