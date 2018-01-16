var appRoot = require('app-root-path');
var analyticModel = require(appRoot + '/_api/analytics/analyticModel');

exports.getAnalytics = function (queryString, callback) {
    var results = "response from analytics";
    callback(null, results);
    return;
}  