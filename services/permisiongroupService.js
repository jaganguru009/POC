var mongoose = require('mongoose');
var appRoot = require('app-root-path');
var permisionGroupModel = require(appRoot + '/_api/permisiongroups/permisionGroupModel');

mongoose.connect("mongodb://localhost/hodelDB")

exports.getpermisionGroups = function (queryString, callback) {
    var results = "response from permisionGroup get";
    callback(null, results);
    return;
}
exports.postpermisionGroup = function (permisionGroup, callback) {
    permisionGroupModel.create(permisionGroup, function (err, createdpermisionGroup) {
        if (err) {
            if (err.code === 11000) {
                err = {
                    "errorType": "Duplicate permisionGroupName",
                    "errorText": "Same permisionGroup name is available in the database,try new one"
                }
            }
            callback(null, err);

            return;
        }
        else {
            callback(null, createdpermisionGroup);

            return;
        }

    }
    );
} 
exports.patchpermisionGroup = function (permisionGroup, callback) {
    callback(null, permisionGroup);
    return;
}

exports.deletepermisionGroup = function (permisionGroup, callback) {
    callback(null, permisionGroup);
    return;
}