var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
	name: String,
	url: String
});

module.exports = mongoose.model('Blog', blogSchema);