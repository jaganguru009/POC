var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var HTTP_PORT = 80;
var HTTPS_PORT = 443;

var app = express();

app.use(bodyParser.json());
// app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); 
mongoose.connect("mongodb://localhost/hodelDB");

// logger.info(JSON.stringify(process.env, null, 2))

// route requests by URI root 
app.use('/api', require('./_api/routes')); 
process.env.SECRETE_KEY="jaganKey";
app.listen(3000);
 
 
module.exports = app
