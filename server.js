var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var flash    = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;

var User = require('./api/models/user');
var Blogger = require('./api/models/blogger');


// User
passport.use(new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {

        // asynchronous
        process.nextTick(function() {
            User.findOne({ 'email' :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err) return done(err);

                // if no user is found, return the message
                if (!user) return done(('No user found.'));
                // password is incorrect
                user.verifyPassword(password).then(function(doesMatch){
        		if(doesMatch) done(null, user);
        		else done(('Incorrect Password'))
                	})
            })
        });

    }));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});


mongoose.connect('mongodb://localhost/personalProject');

var app = express();
app.use(session({secret: 'somethingUniqueAndObscure'}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());



//User
app.post('/api/users', function(req, res) {
	User.findOne({ email: req.body.email }).exec().then(function(user) {
		//if we found a user, it's a duplicate
		if (user) {
			return res.status(400).json({message: "Email already exists."});
		}
		//if the user's password is too short ...
		if (req.body.password.length <= 8) {
			return res.status(400).json({message: "Password must be at least eight characters."});
		}
		//otherwise, create the user
		var user = new User(req.body);
		user.save(function(err, new_user) {
			if (err) {
				console.log("can't create user", err);
			}
			res.json(new_user);
		});
	})
});

app.post('/api/users/auth', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
	return res.json({message: "you logged in"});
});

app.get('/api/users', function(req, res) {
	User
	.find()
	.populate('favorite_places')
	.exec().then(function(users) {
		return res.json(users);
	});
});

app.delete('/api/users/:userId', function(req, res) {
	User.remove({ _id: req.params.userId }, function(err) {
		if (err) {
			console.log("can't delete user", err);
		}
		res.status(200).end();
	});
});


//Blogger
app.post('/api/bloggers', function(req, res) {
	Blogger.findOne({ email: req.body.email }).exec().then(function(blogger) {
		//if we found a blogger, it's a duplicate
		if (blogger) {
			return res.status(400).json({message: "Email already exists."});
		}
		//if the blogger's password is too short ...
		if (req.body.password.length <= 8) {
			return res.status(400).json({message: "Password must be at least eight characters."});
		}
		//otherwise, create the blogger
		var blogger = new Blogger(req.body);
		blogger.save(function(err, new_blogger) {
			if (err) {
				console.log("can't create blogger", err);
			}
			res.json(new_blogger);
		});
	})
});

app.post('/api/bloggers/auth', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
	return res.json({message: "you logged in"});
});

app.get('/api/bloggers', function(req, res) {
	Blogger
	.find()
	.populate('favorite_places')
	.exec().then(function(bloggers) {
		return res.json(bloggers);
	});
});

app.delete('/api/bloggers/:userId', function(req, res) {
	Blogger.remove({ _id: req.params.userId }, function(err) {
		if (err) {
			console.log("can't delete blogger", err);
		}
		res.status(200).end();
	});
});

var port = 9891;
app.listen(port, function(){
	console.log('listening on port ' + port);
});


