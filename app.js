var schema = require('./app/db/schema.js');
var settings = require('./app/settings');

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

mongoose.connect(settings.db.host);

//MIDDLEWARES

app.use(auth.allowCors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
