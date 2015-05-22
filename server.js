var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session')

var blogger = require('./api/models/blogger');
var user = require('./api/models/user');


mongoose.connect('mongodb://localhost/personalProject');



var app = express();
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());

app.post('/api/user', function(req, res) {
	var user = new User(req.body);
	user.save(function(err, new_user) {
		if (err) {
			console.log("can't create user", err);
		}
		res.json(new_user);
	});
});


// user schema
app.get('/api/user', function(req, res) {
	User
	.find()
	.exec().then(function(users) {
		return res.json(users);
	});
});

app.delete('/api/user/:userId', function(req, res) {
	User.remove({ _id: req.params.userId }, function(err) {
		if (err) {
			console.log("can't delete user", err);
		}
		res.status(200).end();
	});
});


app.post('/api/user', function(req, res) {
	var user = new User(req.body);
	user.save(function(err, new_user) {
		if (err) {
			console.log("can't create user", err);
		}
		res.json(new_user);
	});
});


// blogger schema
app.get('/api/blogger', function(req, res) {
	User
	.find()
	.exec().then(function(users) {
		return res.json(users);
	});
});

app.delete('/api/blogger/:userId', function(req, res) {
	User.remove({ _id: req.params.userId }, function(err) {
		if (err) {
			console.log("can't delete blogger", err);
		}
		res.status(200).end();
	});
});

app.post('/api/blogger', function(req, res) {
	var user = new User(req.body);
	user.save(function(err, new_user) {
		if (err) {
			console.log("can't create blogger", err);
		}
		res.json(new_user);
	});
});



var port = 9891;
app.listen(port, function(){
	console.log('listening on port ' + port);
})