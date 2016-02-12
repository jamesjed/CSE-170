var data = require('../data.json');

exports.view = function(req, res){
	console.log(data);
	res.render('index', {
    "ideas": [
        {
			"imageURL": "http://www.planwallpaper.com/static/images/magic-of-blue-universe-images.jpg",			       
            "column": "Column 1",
            "subTitle": "subTitle",
            "description": "The purpose of life is to live it, to taste experience to the utmost, to reach out eagerly and without fear for newer and richer experience."
		},
        {
			"imageURL": "http://www.gettyimages.ca/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg",			       
            "column": "Column 2",
            "subTitle": "subTitle",
            "description": "The purpose of life is to live it, to taste experience to the utmost, to reach out eagerly and without fear for newer and richer experience."
		},
        {
			"imageURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk476zkSZ_rv0s_y4zRNKWUsUaktTcFxleDeU6ugF0uKFx0Y2W",			       
            "column": "Column 3",
            "subTitle": "subTitle",
            "description": "The purpose of life is to live it, to taste experience to the utmost, to reach out eagerly and without fear for newer and richer experience."
		},
        {
			"imageURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjQn2FLbOe8CZdOr_mubMUEOyev9RfMTY_izUK10NX67xmi-4Q",			       
            "column": "Column 4",
            "subTitle": "subTitle",
            "description": "The purpose of life is to live it, to taste experience to the utmost, to reach out eagerly and without fear for newer and richer experience."
		},
        {
			"imageURL": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSI8e-bdpebzB6bRlQLyMwqdpeMPDSvtD-51onZGN9kh8x4jyrZmA",			       
            "column": "Column 5",
            "subTitle": "subTitle",
            "description": "The purpose of life is to live it, to taste experience to the utmost, to reach out eagerly and without fear for newer and richer experience."
		},
        {
			"imageURL": "http://www.scrapsyard.com/wp-content/uploads/2015/07/Nature.jpeg",			       
            "column": "Column 6",
            "subTitle": "subTitle",
            "description": "The purpose of life is to live it, to taste experience to the utmost, to reach out eagerly and without fear for newer and richer experience."
		},
	]
});
};