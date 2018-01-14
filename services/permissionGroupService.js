var mongoose = require('mongoose');
var appRoot = require('app-root-path');
var permisionGroupModel = require(appRoot + '/_api/permissiongroups/permissionGroupModel');

mongoose.connect("mongodb://localhost/hodelDB")

exports.getpermisionGroups = function (queryString, callback) {
    var results = "response from permisionGroup get";
    callback(null, results);
    return;
}
exports.postPermissionGroup = function (permisionGroup, callback) {
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
exports.patchPermisionGroup = function (permisionGroup, callback) {
    callback(null, permisionGroup);
    return;
}

exports.deletePermisionGroup = function (permisionGroup, callback) {
    callback(null, permisionGroup);
    return;
}