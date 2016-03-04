//var data = require('../data.json');
var express = require('express');
var mongoose = require('mongoose');
//var takenData = ('/postData');

exports.view = function(req, res){

	var data = [];
	var tags = {}; 
    
    if (req.query.search != undefined && req.query.search.length > 0) {
        tags = {'tags': {$in: req.query.search.toLowerCase().split(' ')}};
    } 
        
	
	mongoose.model('posts').find(tags , function(err, posts){
		
        if(posts.length <= 0) {
            
        }
        
		res.render('bootprac', {postData: posts, layout: false });			
	}).sort({"date": -1});
	
};