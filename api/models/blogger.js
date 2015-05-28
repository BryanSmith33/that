var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var q = require('q');

var bloggerSchema = new Schema({
	firstName: String,
	lastName: String,
	email: { type: String, unique: true},
	blogUrl: { type: String, unique: true},
	password: String
	
});


//pre('save') is mongoose middleware that runs before every blogger is created
bloggerSchema.pre('save', function(next) {
	var blogger = this;
	//take password and encrypt it
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(blogger.password, salt, function(err, hash) {
			console.log(hash);
			blogger.password = hash;
			next();
		});
	});
});

bloggerSchema.methods.verifyPassword = function(password) {
	var deferred = q.defer();
	var blogger = this;
	bcrypt.compare(password, blogger.password, function(err, res) {
		if (err) {
			deferred.resolve(false);
		}
		deferred.resolve(true);
	});
	return deferred.promise;
};


module.exports = mongoose.model('Blogger', bloggerSchema);