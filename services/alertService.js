var mongoose = require('mongoose');
var appRoot = require('app-root-path');
var alertModel = require(appRoot + '/_api/alerts/alertModel');

mongoose.connect("mongodb://localhost/hodelDB")

exports.getAlerts = function (queryString, callback) {
    var results = "response from user get";
    callback(null, results);
    return;
} 