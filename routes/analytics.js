exports.viewA = function(req, res){
    console.log("In A");
    var versionA = true;
    res.render("discussion", {versionA : true, layout: false})
 };

 exports.viewB = function(req, res){
    console.log("In B");
    var versionB = true;
    res.render("chat_sample", {versionB : true, layout: false});
 };



