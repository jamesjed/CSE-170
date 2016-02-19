var data = require("../data.json");

exports.addPost = function(req, res) {
    
    var newPost = {
        imageURL: "http://lorempixel.com/400/400/people",
        column: req.query.column,
        subTitle: "Sub Title",
        description: req.query.description
    };
    
    data["ideas"].push(newPost);
    res.render('../views/bootprac', data);
}