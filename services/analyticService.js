var mongoose = require('mongoose');
var appRoot = require('app-root-path');
var analyticModel = require(appRoot + '/_api/analytics/analyticModel');

mongoose.connect("mongodb://localhost/hodelDB")

exports.getAnalytics = function (queryString, callback) {
    var results = "response from analytics";
    callback(null, results);
    return;
}  