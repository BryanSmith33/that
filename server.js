var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

var blogger = require('./models/blogger');
var user = require('./models/user');


mongoose.connect('mongodb://localhost/personalProject');


var app = express();
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());

app.post('/api/users', function(req, res) {
	var user = new User(req.body);
	user.save(function(err, new_user) {
		if (err) {
			console.log("can't create user", err);
		}
		res.json(new_user);
	});
});

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



var port = 9891;
console.log('listening on port ' + port);