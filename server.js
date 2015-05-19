var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

//controllers

//express
var app = express();

//express middleware
app.use(bodyParser.json());
app.use(cors());

//endpoints
app.post('/sighting', SightingCtrl.create);
app.get('/sighting', SightingCtrl.read);
app.put('/sighting/:id', SightingCtrl.update);
app.delete('/sighting/:id', SightingCtrl.delete);



//connections
var port = 9001;
var mongoUri = 'mongodb://localhost:27017/';

mongoose.connect(mongoUri);
mongoose.connection.once('open', function(){
	console.log('connected to mongoDB at:', mongoUri);
});

app.listen(port, function(){
	console.log('listening on port:', port)
});