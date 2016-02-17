var data = require('../data.json');

exports.viewData = function(req, res){
	res.json(data);
}

