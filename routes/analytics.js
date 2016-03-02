var versionA = true;

exports.viewA = function(req, res){
	var random_num = Math.random();   
    if (random_num >= 0) 
    {
        versionA = true;
        res.render("discussion", {layout: false});
    } 
    else
    {
        res.redirect('/chat');        
    }
  };

exports.viewB = function(req, res){
 	var random_num = Math.random();
  	if (random_num >= 0) 
    {
        versionA = false;
        res.render("chat_sample", {layout: false});
    } 
    else
    {
        res.redirect('/discuss');
    }
 };