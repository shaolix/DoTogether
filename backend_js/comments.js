module.exports = function (app, mongo, autoIncrement) {

	// Post a comment
	app.post('/comments', function (req, res) {
	
		var time = new Date();
	   var year = time.getFullYear();
	   var month = time.getMonth();
	   var day = time.getDate();
	   var hour = time.getHours();
	   var minute = time.getMinutes();
	   var sec = time.getSeconds();
	   var finaltime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + sec;
	   
	   
	   if (!req.body.contents)
	   	return res.sendStatus(400);
	   
		autoIncrement.getNextSequence(mongo.getDB(), 'comments', function (err, autoIndex) {
			mongo.getDB().collection('comments').insertOne({
		      _id: autoIndex,
		      username: req.body.username,
		      post_id: parseInt(req.body.addpid),
		      date: finaltime,
		      contents: req.body.contents
		    }, function(err, result) {
				mongo.getDB().collection('posts').updateOne({
					_id: parseInt(req.body.addpid)
				}, {
					$addToSet: {comments: parseInt(result.insertedId)} // not very sure about result.insertedId
				}, function (err, result) {
					return res.status(200).json({
		      			username: req.username,
		         		date: finaltime,
		         		contents: req.body.contents
	   				});				
				});	      	
			});
		});
	});
	
	// Get a comment by id
	app.get('/comments/:cid', function (req, res) {
		
		mongo.getDB().collection('comments').find({
				_id: parseInt(req.params.cid)		
			}).toArray(function(err, docs) {    
				if (docs.length == 0) {
					return res.sendStatus(404);
				} else {
					return res.status(200).json({
						username: docs[0].username,
	         		date: docs[0].date,
	         		contents: docs[0].contents
					});		
				}    
		}); 	
	
	});

}