var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	password: String
	
});

module.exports = mongoose.model('user', userSchema);