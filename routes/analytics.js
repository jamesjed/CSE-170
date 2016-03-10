exports.viewA = function(req, res){
    var x = 1;
    var y = 10;
	var random_num = Math.floor(Math.random() * ((y-x)+1)+x); 
    console.log(random_num);
    
    if (random_num > 5) 
    {
        console.log("In A if");
        var versionA = true;
        res.render("discussion", {versionA : true, layout: false});
    } 
    else
    {
        console.log("In A else");
        res.redirect('/chat');        
    }
  };

exports.viewB = function(req, res){

    console.log("In B if");
    var versionA = false;
    res.render("discussion", {versionA : false, layout: false});

 };

