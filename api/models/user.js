var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var q = require('q');

var userSchema = new Schema({
	firstName: String,
	lastName: String,
	email: { type: String, unique: true},
	blogUrl: { type: String, unique: true},
	password: String
});

//pre('save') is mongoose middleware that runs before every user is created
userSchema.pre('save', function(next) {
	var user = this;
	//take password and encrypt it
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(user.password, salt, function(err, hash) {
			console.log(hash);
			user.password = hash;
			next();
		});
	});
});

// checking if password is valid
userSchema.methods.verifyPassword = function(password) {
	console.log('get here to verifyPassword')
	var deferred = q.defer();
	var user = this;
	bcrypt.compare(password, user.password, function(err, res) {
		if (err) {
			console.log('err', err);
			deferred.resolve(err);
		}
		console.log(res);
		deferred.resolve(res);
	});
	return deferred.promise;
	console.log('password verified')
};

module.exports = mongoose.model('User', userSchema);