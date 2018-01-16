var appRoot = require('app-root-path');
var alertModel = require(appRoot + '/_api/alerts/alertModel');

exports.getAlerts = function (queryString, callback) {
    var results = "response from user get";
    callback(null, results);
    return;
} 