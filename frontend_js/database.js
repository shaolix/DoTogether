var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var USERSchema = new Schema(
  {
    _id: {
		type: Number,
		required: true,
		unique: true
    },
    username: {
		type: String,
		required: true,
		unique: true
    },
    password: {
		type: String,
		requried: true
    },
    email: {
		type: String, 
		required: true,
		unique: true
    },
    admin: {
		type: Boolean,
		required: true
    },
    phone: {
		type: Number
    },
    age: {
		type: Number
    },
	city: {
		type: String
    },
    province: {
		type: String
    },
    avatar: {
		type: String
    }
    gender: {
		type: String
    }
    hobbies: [{hobby: String}],
    descriptions: {
		type: String
    }
  },
  {
    collection: 'users'
  }
);

var POSTSchema = new Schema(
  {
    _id: {
		type: Number,
		required: true,
		unique: true
    },
    user_id: {
		type: Number,
		requried: true
    },
    username: {
		type: String,
		requried: true
    },
    title: {
		type: String, 
		required: true
    },
    descriptions: {
		type: String, 
		required: true
    },
	date: {
		type: Date,
		required: true
    },
    comments: [{comment_id: Number}],
	category: {
		type: String,
		required: true
    }
    attendee: [{username: String}]
  },
  {
    collection: 'posts'
  }
);

var COMMENTSchema = new Schema(
  {
    _id: {
		type: Number,
		required: true,
		unique: true
    },
    username: {
		type: String,
		requried: true
    },
    post_id: {
		type: Number,
		requried: true    
    }
	date: {
		type: Date,
		required: true
    },
    contents: {
		type: String, 
		required: true
    }
  },
  {
    collection: 'comments'
  }
);

mongoose.connect('mongodb://localhost/dotogether'); 

module.exports = mongoose.model('users', USERSchema);
module.exports = mongoose.model('posts', POSTSchema);
module.exports = mongoose.model('comments', COMMENTSchema);

/*
when use the database
var users = require('./model/user');

*/ 
