var express = require('express');
var fs = require('fs');
var app = express();
var port = 8000;
var multiparty = require('multiparty');
var bodyParser = require('body-parser');
var util = require('util');
var mongo = require('mongodb');
var db = require('monk')('localhost:27017/tilegame');
var ejslocals = require('ejs-locals');

app.use(express.static('public'));
app.use(bodyParser.json());
app.engine('ejs', ejslocals);
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.redirect('/game');
});

app.get('/game', function(req, res) {
	res.render('game');
});

app.get('/map/:id', function(req, res) {
	var maps = db.get('maps');
	maps.findById(req.params.id, function(err, doc) {
		res.json(doc);
	});
});

app.listen(port, function() { console.log("go to http://localhost:" + port); });
