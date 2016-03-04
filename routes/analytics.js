exports.viewA = function(req, res){

	var randomNum = Math.random();

	if (randomNum > 0.5){
 	   res.render("discussion", {layout: false})
 	   console.log(randomNum);
	}
	else {
		res.redirect('/chat');
	}
 };

 exports.viewB = function(req, res){

 	var randomNum = Math.random();

 	if (randomNum > 0.5){
    	res.render("chat_sample", {versionB : true, layout: false});
    	   console.log(randomNum);
    }
    else 
    {
    	res.redirect('/discuss');
    }
 };


