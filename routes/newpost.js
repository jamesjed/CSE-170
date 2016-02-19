var data = require("../data.json");

exports.addPost = function(req, res) {
    
    var newPost = {
        imageURL: "http://lorempixel.com/400/400/people",
        column: req.query.column,
        subTitle: "Sub Title",
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

    res.render('../views/bootprac', data);
}
