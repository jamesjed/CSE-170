var data = require("../data.json");

exports.addPost = function(req, res) {
    var newPost = {
        imageURL: req.query.imageURL,
        column: req.query.column,
        subTitle: req.query.subTitle,
        description: req.query.description
    };
    
    data["ideas"].push(newPost);
    res.render('profile', data);
    console.log(data);
    console.log(JSON.stringfy(data));
}

function newData() {
  $('input[name="login"]').click(function() {
    var data = {
        column: $('#column').val(),
        description: $('#description').val(),
    };
    $.post('./sample', data, function(data) {
       console.log(data);
    });
  });
};