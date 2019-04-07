var schema = require('./app/db/schema.js');
var settings = require('./app/settings');
var auth = require('./app/models/auth');

var user = require('./app/api/usersapi');
var worldcup = require('./app/api/worldcupapi');
var gp = require('./app/api/gpapi');

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

var dbconnection = process.env.MONGODB_URI || settings.db.host

console.log(dbconnection);

mongoose.connect(dbconnection);

// MIDDLEWARES

app.use(auth.allowCors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// API entrypoints

// World CUP
app.get('/worldcup', worldcup.getAllWorldCups);
app.get('/worldcup/current', worldcup.getCurrentWorldCup);
app.get('/worldcup/:id', worldcup.getWorldCup);

app.post('/worldcup', worldcup.createWorldCup);
app.get('/worldcup/:id/classification', worldcup.getClassification);

// Users
app.post('/users', user.createUser);
app.get('/users', user.getUsers);

// GP Grand Prix
app.get('/worldcup/:id/gp', gp.getGPs);
app.post('/worldcup/:id/gp', gp.createGP);
app.get('/worldcup/:id/nextgp', gp.getNextGP);
app.get('/gp/:id', gp.getGP);
app.put('/gp/:id', gp.updateGP);
app.put('/gp/:id/result', gp.updateGPResult);
app.get('/gp/:id/result', gp.gpGetResults);


// Disclaimer
app.get('/', function(req, res, next) {
    res.send(200, "This is the MK8API")
})


// Running the server

var port = process.env.PORT || settings.app.port;

var server = app.listen(port, function () {

	var host = server.address().address;
	var port = server.address().port;

	console.log('MK8 API is running at '+ 'port')

});


process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);
    process.exit(1);
});
