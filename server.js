// Make sure to install these dependencies!
// Instructions are in the README.
var express = require('express');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');

var app = express();

// initialize validator
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(expressValidator({
    customValidators: {
        // Hint: You can re-use the regular expressions you used client-side
        // in between the forward slashes in the regular expresson search.
        // The birthday is given as an example.

        isVisibility: function(value) {
        		var arr = ["private", "public", "after"];
            return arr.indexOf(value) > -1;
        }
    }
}));

// Enable CORS for the backend
// Don't do this if frontend and backend are on the same server
var cors = require('cors-express');
app.use(cors({}));

//app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/',{index: 'html/welcomepagenosignin.html'}));
// app.engine('.html', require('ejs').__express);
// app.set('views', __dirname);
// app.set('view engine', 'html');

// MongoDB
var mongo = require('./backend_js/mongo.js');
mongo.connectToServer(function(err) {
  // Database is ready; listen on port 3000
  app.listen(3000, function () {
    console.log('App listening on port 3000');
  });
});

// MongoDB auto-increment
var autoIncrement = require("mongodb-autoincrement");

// SHA1
var sha1 = require('sha1');

// Reads bearer authorization token
var bearerToken = require('express-bearer-token');
app.use(bearerToken());

// JSON web token
// Reference: Phase 3 Sample
var jwt = require('jwt-simple');
var secret = 'QbSqjf3v1V2sMHyeo27W';

// Function for generating token
// Reference: Phase 3 Sample
var generateToken = function (userID) {
  var date = new Date();
  var payload = {
    userID: userID,
    exp: date.setHours(date.getHours() + 24)
  };
  return jwt.encode(payload, secret);
};

// Parse JSON and make sure that it's not empty
// Reference: Phase 3 Sample
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
app.post('*', jsonParser, function (req, res, next) {
  if (!req.body) return res.sendStatus(400);
  next();
});

// Authentication 
// Reference: Phase 3 Sample
app.all('*', jsonParser, function (req, res, next) {
  if (req.token) {
    var decodedToken = jwt.decode(req.token, secret);
    if (decodedToken && new Date(decodedToken.exp) > new Date()) {
      // Check if user exists and is admin
      mongo.getDB().collection('users').find({
        _id: decodedToken.userID
      }).toArray(function(err, docs) {
        if (docs.length > 0) {
          req.userID = docs[0]._id;
          req.email = docs[0].email;
          req.username = docs[0].username;
          req.admin = docs[0].admin;
        }
        next();
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

// Users endpoints
require('./backend_js/users.js')(app, mongo, autoIncrement, sha1, generateToken);

// Posts endpoints
require('./backend_js/posts.js')(app, mongo, autoIncrement);

// Comments endpoints
require('./backend_js/comments.js')(app, mongo, autoIncrement);
