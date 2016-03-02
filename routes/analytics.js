exports.viewA = function(req, res){

	var random_num = Math.random(); 
    console.log(random_num);
    
    if (random_num < 0.5) 
    {
        console.log("In A if");
        var versionA = false;
        res.render("discussion", {versionA : false, layout: false});
    } 
    else
    {
        console.log("In A else");
        res.redirect('/chat');        
    }
  };

exports.viewB = function(req, res){

    console.log("In B if");
    var versionA = true;
    res.render("discussion", {versionA : true, layout: false});

 };

