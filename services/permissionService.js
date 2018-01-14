var mongoose = require('mongoose');
var appRoot = require('app-root-path');
var permissionModel = require(appRoot + '/_api/permissions/permissionModel');

mongoose.connect("mongodb://localhost/hodelDB")

exports.getpermissions = function (queryString, callback) {
    var results = "response from permission get";
    callback(null, results);
    return;
}
exports.postpermission = function (permission, callback) {
    permissionModel.create(permission, function (err, createdpermission) {
        if (err) {
            if (err.code === 11000) {
                err = {
                    "errorType": "Duplicate permissionName",
                    "errorText": "Same permission name is available in the database,try new one"
                }
            }
            callback(null, err);

            return;
        }
        else {
            callback(null, createdpermission);

            return;
        }

    }
    );
} 
exports.patchpermission = function (permission, callback) {
    callback(null, permission);
    return;
}

exports.deletepermission = function (permission, callback) {
    callback(null, permission);
    return;
}