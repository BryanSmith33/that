var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bloggerSchema = new Schema({
	firstName: String,
	lastName: String,
	email: String,
	blogUrl: String,
	password: String
	
});

module.exports = mongoose.model('blogger', bloggerSchema);