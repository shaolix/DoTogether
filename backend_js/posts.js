module.exports = function (app, mongo, autoIncrement) {
	// helper function for parsing comment
	function parseComment(comment) {
		return {
			_id: comment._id,
			post_id: comment.post_id,
			username: comment.username,
			date: comment.date,
			contents: comment.contents
		}
	} 

	// helper function for parsing post
	function parsePost(post) {
		return {
			_id: post._id,
			title: post.title,
			date: post.date,
			descriptions: post.descriptions,
			username: post.username,
			category: post.category
		}
	} 

	// Deal with admin/user_post_page and edit_post page
	// Get a post
	app.get('/posts/:pid', function (req, res, next) {
		mongo.getDB().collection('posts').find({
			_id: parseInt(req.params.pid)
		}).toArray(function(err, docs) {
			if (docs.length == 0){
			  return res.sendStatus(404);
			}
			res.json({
				_id: docs[0]._id,
				title: docs[0].title,
				username: docs[0].username,
				descriptions: docs[0].descriptions,
				date: docs[0].date,
				category: docs[0].category,
				admin: req.admin
			});
		});
	});

	
	// Delete a post
	app.delete('/posts/:pid', function (req, res, next) {
		mongo.getDB().collection('posts').deleteOne({
			_id: parseInt(req.params.pid),
			user_id: req.userID
		}, function(err, result) {
			if (result.deletedCount == 1) {
		  		// A post was deleted
		  		next();
			} else {
				return res.sendStatus(403);
			}
		});
	});
	
	app.delete('/posts/:pid', function (req, res) {
	  mongo.getDB().collection('comments').deleteMany({
	    post_id: parseInt(req.params.pid)
	  }, function(err, result) {
	    res.sendStatus(200);
	  });
	});
	
	
	// Update a post
	app.put('/posts/:pid', function (req, res) {
		// Validation: check for all theses input boxes are not empty
		if (!req.body.title || !req.body.descriptions || !req.body.category)
			return res.sendStatus(400);
		// Set update JSON
		var updateJSON = {};
		if (req.body.title)
			updateJSON.title = req.body.title;
		if (req.body.descriptions)
			updateJSON.descriptions = req.body.descriptions;
		if (req.body.category)
			updateJSON.category = req.body.category;
		// Update
		mongo.getDB().collection('posts').updateOne({
			_id: parseInt(req.params.pid)
		}, {
			$set: updateJSON
		}, function(err, result) {
			if (result.matchedCount == 1) {
		  		//res.sendStatus(200);
		  		mongo.getDB().collection('posts').find({
		  			_id: parseInt(req.params.pid)
		  		}).toArray(function(err, docs) {
		  			if (docs.length == 0) {
		  				return sendStatus(404);
		  			}
		  			var post = parsePost(docs[0]);
		  			res.json({
		  				admin: req.admin,
		  				post: post
		  			});
		  		});

			} else {
		  		res.sendStatus(403);
			}
		});
	});
	
	// Create a new post
	app.post('/post', function (req, res) {  
	  if (!req.body.username || !req.body.title || !req.body.category)
	    return res.sendStatus(400);
	
	  var errors = req.validationErrors();
	  var mappedErrors = req.validationErrors(true);
	  
	  if (errors) {
	    return res.sendStatus(400);
	  }
	  else {
		
		var time = new Date();
	   var year = time.getFullYear();
	   var month = time.getMonth();
	   var day = time.getDate();
	   var hour = time.getHours();
	   var minute = time.getMinutes();
	   var sec = time.getSeconds();
	   var finaltime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + sec;	  	
	  	
	    autoIncrement.getNextSequence(mongo.getDB(), 'posts', function (err, autoIndex) {
	      mongo.getDB().collection('posts').insertOne({
	        _id : autoIndex,
	        user_id: req.userID,
	        username : req.body.username,
	        title : req.body.title,
	        descriptions : req.body.descriptions,
			  date: finaltime,
			  comments: [],
	        category : req.body.category,	        
	        attendee : [req.body.username]	        
	      	}, function(err, result) {
	      		res.sendStatus(200);
	      	}
	      );
	    });
	  }
	
	});
	
	
	// Get all posts (for display post list)
	app.get('/postlist', function (req, res) {
		mongo.getDB().collection('posts').find({
		}).toArray(function (err, docs) {
			return res.status(200).json({posts: docs});		
		});
	});
	
	// Get post details for certain post
	app.get('/postdetail/:pid', function (req, res) {		
		mongo.getDB().collection('posts').find({
			_id: parseInt(req.params.pid)
		}).toArray(function (err, docs) {
			if (docs.length == 0) {
				return res.sendStatus(404);
			} else {
				return res.status(200).json({
					_id : docs[0]._id,
					user_id: docs[0].user_id,
					username : docs[0].username,
					title : docs[0].title,
					descriptions : docs[0].descriptions,
					date: docs[0].date,
					comments: docs[0].comments,
					category : docs[0].category,	        
					attendee : docs[0].attendee				
				});
			}		
		});			
	});
	
	// Join activity
	app.put('/join/:pid', function (req, res) {
		// Check whether user has logged in
		mongo.getDB().collection('posts').find({
			_id: parseInt(req.params.pid)
		}).toArray(function(err, docs) {
			if (docs.length < 0) {
				res.sendStatus(404);
			} else {
				mongo.getDB().collection('posts').updateOne({
					_id: parseInt(req.params.pid)
				}, {
					$addToSet: {attendee: req.body.username}
				}, function (err, result) {
					res.sendStatus(200);				
				});			
			}
		});
	});
  
}