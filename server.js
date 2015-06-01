var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var flash    = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;

var User = require('./api/models/user');
var Blog = require('./api/models/blog');


mongoose.connect('mongodb://localhost/personalProject');


// User
passport.use('local', new LocalStrategy({
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

var requireAuth = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).end();
	}
	console.log(req.user);
	next();
};


var app = express();
app.use(session({secret: 'somethingUniqueAndObscure'}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());



//User

//sign up
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

//log in
app.post('/api/users/auth', passport.authenticate('local'), function(req, res) {
	return res.json({message: "you logged in"});
});

//log off
app.get('/api/auth/logout', function(req, res) {
	req.logout();
	return res.redirect('/#/login');
});

app.post('/api/users/me/blogss', requireAuth, function(req, res) {
	//find blog
	Blog.findOne({ _id: req.body._id }).exec().then(function(blog) {
		if (!blog) {
			return res.status(404).end();
		}
		//update the user with the blog
		User.findOne({ _id: req.user._id }).exec().then(function(user) {
			user.blogss.push(blog);
			user.save(function(err) {
				if (err) {
					console.log("can't add blog to user");
				}
				return res.json(user);
			});
		});
	});
});

app.get('/api/users/me', requireAuth, function(req, res) {
	User
	.findOne({_id: req.user.id})
	.populate('blogs')
	.exec().then(function(user) {
		return res.json(user);
	});
});

app.get('/api/users', requireAuth, function(req, res) {
	User
	.find()
	.populate('blogs')
	.exec().then(function(users) {
		return res.json(users);
	});
});


app.delete('/api/users/:userId', requireAuth, function(req, res) {
	User.remove({ _id: req.params.userId }, function(err) {
		if (err) {
			console.log("can't delete user", err);
		}
		res.status(200).end();
	});
});

app.post('/api/blogs', requireAuth, function(req, res) {
	var blog = new Blog(req.body);
	blog.save(function(err, new_blog) {
		if (err) {
			console.log("can't create blog", err);
		}
		res.json(new_blog);
	});
});

app.get('/api/blogs', requireAuth, function(req, res) {
	Blog
	.find()
	.sort('state')
	.limit(10)
	.skip(req.query.skip || 0)
	.exec().then(function(blogs) {
		return res.json(blogs);
	});
});

app.put('/api/blogs/:blogId', requireAuth, function(req, res) {
	Blog.update(req.body, function(err) {
		if (err) {
			console.log("can't update blog", err);
		}
		return res.json(req.body);
	});
});

app.delete('/api/blogs/:blogId', requireAuth, function(req, res) {
	Blog.remove({ _id: req.params.blogId }, function(err) {
		if (err) {
			console.log("can't delete blog", err);
		}
		res.status(200).end();
	});
});

var port = 9891;
app.listen(port, function(){
	console.log('listening on port ' + port);
});
