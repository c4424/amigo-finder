// API Routes
// =============================================================

// Use fs to read/write friend data (JSON objects) to/from friends.js
const fs = require('fs');

module.exports = function(app, path) {


	app.get('/api/friends', function(req, res) {
		fs.readFile("app/data/friends.js", "utf8", function(err, data) {
			if (err) throw err;
			res.json(JSON.parse(data));
		});
	});

	app.post('/api/friends', function(req, res) {

		fs.readFile('app/data/friends.js', function (err, data) {
			// Read existing friends to array
		    var friends = JSON.parse(data);
			
		    var bestMatch = -1;
		    var bestScore = 999;

		    // Loop through the friends to find the best match
		    for (var i = 0; i < friends.length; i++) {
		    	var currentScore = 0;
		    	for (var j = 0; j < friends[i]['scores'].length; j++) {
		    		currentScore += Math.abs((parseInt(req.body['scores[]'][j]) - parseInt(friends[i]['scores'][j])));
				}

				if(currentScore <= bestScore) {
					bestScore = currentScore;
					bestMatch = i;
		    	}
		    }
			// Return results
			res.send(friends[bestMatch]);

		});
	});
}
