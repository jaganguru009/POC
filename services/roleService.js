var mongoose = require('mongoose');
var appRoot = require('app-root-path');
var roleModel = require(appRoot + '/_api/roles/roleModel');

mongoose.connect("mongodb://localhost/hodelDB")

exports.getroles = function (queryString, callback) {
    var results = "response from role get";
    callback(null, results);
    return;
}
exports.postRole = function (role, callback) {
    roleModel.create(role, function (err, createdrole) {
        if (err) {
            if (err.code === 11000) {
                err = {
                    "errorType": "Duplicate roleName",
                    "errorText": "Same role name is available in the database,try new one"
                }
            }
            callback(null, err);

            return;
        }
        else {
            callback(null, createdrole);

            return;
        }

    }
    );
} 
exports.patchRole = function (role, callback) {
    callback(null, role);
    return;
}

exports.deleteRole = function (role, callback) {
    callback(null, role);
    return;
}