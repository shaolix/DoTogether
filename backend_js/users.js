module.exports = function (app, mongo, autoIncrement, sha1, generateToken) {

	// Create user
	app.post('/users', function (req, res) {
	
	  // Validation
	  if (!req.body.email || !req.body.username || !req.body.password){
	    return res.sendStatus(400);
	  }
	  // Query database: first, check if email or username already exists
	  mongo.getDB().collection('users').count({
	    $or: [{email: req.body.email}, {userName: req.body.username}]
	  }, function(err, count) {
	    if (count > 0) {
	      // Email or username already exists
	      return res.sendStatus(403);
	    }
	    // Insert into database
	    autoIncrement.getNextSequence(mongo.getDB(), 'users', function (err, autoIndex) {
	      mongo.getDB().collection('users').insertOne({
	        _id: autoIndex,
	        email: req.body.email,
	        username: req.body.username,
	        password: sha1(req.body.username + req.body.password),
	        admin: false,
	        phone: "N/A",
	        age: "N/A",
	        city: "N/A",
	        province: "N/A",
	        avatar: "N/A",
	        gender: "N/A",
	        descriptions: "N/A",
	        hobbies: "Come on! You are not that boring, right?"
	      }, function(err, result) {
	        var token = generateToken(result.insertedId);
	        res.json({
	          _id: result.insertedId,
	          token: token
	        });
	      });
	    });
	  });
	});
	
//Get all user
app.get('/users/getalluser',function(req,res){
  console.log("in get all users function");
  mongo.getDB().collection('users').find().toArray(function(err,docs){
    var allusers = [];
    var allusers_id = [];
    for(var i = 0; i < docs.length; i++){
      allusers.push(docs[i].username);
      allusers_id.push(docs[i]._id);
      console.log(docs[i].username);
      console.log(docs[i]._id);
    }
    res.json({
      alluser:allusers,
      alluser_id:allusers_id
    });
  });
});
	
	// Suspend user
	app.delete('/users/:uid', function (req, res) {

	  console.log(req.params.uid);
	  mongo.getDB().collection('users').remove({
	    _id: parseInt(req.params.uid)
	  }, function(err, result) {
	    res.sendStatus(200);
	  });
	});
	
	// Update user
	// app.put('/users/:uid', function (req, res, next) {
	//   // Check if either admin or user ID matches that on token
	//   if (!req.admin && req.userID != parseInt(req.params.uid))
	//     return res.sendStatus(401);
	//   // Validation
	//   if (!req.body.oldPassword || (!req.body.email && !req.body.password))
	//     return res.sendStatus(400);
	//   // Query database (check password)
	//   mongo.getDB().collection('users').find({
	//     _id: parseInt(req.params.uid),
	//     password: sha1(req.email + req.body.oldPassword)
	//   }).toArray(function(err, docs) {
	//     // If password not found
	//     if (docs.length == 0) {
	//       return res.sendStatus(403);
	//     } else {
	//       next();
	//     }
	//   });
	// });
	
	// app.put('/users/:uid', function (req, res, next) {
	// 	console.log(req.body);
	//   // Change email, if specified
	//   if (req.body.email) {
	//     // Query database
	//     mongo.getDB().collection('users').count({
	//       email: req.body.email
	//     }, function(err, count) {
	//       //if (count > 0) {
	//         // Email already exists
	//        // return res.sendStatus(403);
	//       //} else {
	//         mongo.getDB().collection('users').updateOne({
	//           _id: parseInt(req.params.uid)
	//         }, {
	//           $set: {email: req.body.email, password: sha1(req.body.email + req.body.oldPassword)}
	//         }, function(err, result) {
	//           next();
	//         });
	//       //}
	//     });
	//   } else {
	//     next();
	//   }
	// });
	
	// app.put('/users/:uid', function (req, res, next) {
	//   // Change password, if specified
	//   if (req.body.password) {
	//     // Query database
	//     // Change email for salting if needed
	//     if (req.body.email) {
	//       req.email = req.body.email;
	//     }
	//     // Update password
	//     mongo.getDB().collection('users').updateOne({
	//       _id: parseInt(req.params.uid)
	//     }, {
	//       $set: {password: sha1(req.email + req.body.password)}
	//     }, function(err, result) {
	//       next();
	//     });
	//   } else {
	//     next();
	//   }
	// });
	
	app.put('/users/:uid', function (req, res) {
	  
	  console.log(req.body.gender);
	  console.log(req.body.city);
	  var newInfo = {};
	  if (req.body.gender)
	    newInfo.gender = req.body.gender;
	  if (req.body.city)
	    newInfo.city = req.body.city;
	  if (req.body.province)
	    newInfo.province = req.body.province;
	  if (req.body.descriptions)
	    newInfo.descriptions = req.body.descriptions;
	  if (req.body.phone)
	    newInfo.phone = req.body.phone;
	  if (req.body.avatar)
	  	 newInfo.avatar = req.body.avatar;
		if (req.body.hobbies)
	  	 newInfo.hobbies = req.body.hobbies;
	console.log("newInfo");
	console.log(newInfo);
	  mongo.getDB().collection('users').updateOne({
	    _id : parseInt(req.params.uid)
	  }, {
	    $set : newInfo
	  });
	  res.sendStatus(200);
	});
	
// Log in
app.post('/login', function (req, res) {
  console.log(req.body.username);
  console.log(req.body.password);
  // Validation
  if (!req.body.username || !req.body.password)
    return res.sendStatus(400);
  // Query database
  mongo.getDB().collection('users').find({
    username: req.body.username,
    password: sha1(req.body.username + req.body.password)
  }).toArray(function(err, docs) {
    if (docs.length == 0) {
      return res.sendStatus(403);
    }
    var token = generateToken(docs[0].username);
    res.json({
      username: docs[0].username,
      token: token
    });
  });
});
	
	
	// Get certain user's information by user_id (to fill the user profile in each post)
	app.get('/userprofile/:uid', function (req, res) {
		mongo.getDB().collection('users').find({
			username: req.params.uid
		}).toArray(function(err, docs) {    
			if (docs.length == 0) {
				return res.sendStatus(404);
			} else {
				return res.status(200).json({
					_id: docs[0]._id,
					username: docs[0].username,
					email: docs[0].email,
					phone: docs[0].phone,
					city: docs[0].city,
					avatar: docs[0].avatar,
					gender: docs[0].gender,
					province: docs[0].province,
					descriptions: docs[0].descriptions,
					hobbies: docs[0].hobbies
				});		
			}    
		});
	});	

}