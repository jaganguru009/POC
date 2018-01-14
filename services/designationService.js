var mongoose = require('mongoose');
var appRoot = require('app-root-path');
var designationModel = require(appRoot + '/_api/designations/designationModel');

mongoose.connect("mongodb://localhost/hodelDB")

exports.getdesignations = function (queryString, callback) {
    var results = "response from designation get";
    callback(null, results);
    return;
}
exports.postDesignation = function (designation, callback) {
    designationModel.create(designation, function (err, createddesignation) {
        if (err) {
            if (err.code === 11000) {
                err = {
                    "errorType": "Duplicate designationName",
                    "errorText": "Same designation name is available in the database,try new one"
                }
            }
            callback(null, err);

            return;
        }
        else {
            callback(null, createddesignation);

            return;
        }

    }
    );
} 
exports.patchdesignation = function (designation, callback) {
    callback(null, designation);
    return;
}

exports.deletedesignation = function (designation, callback) {
    callback(null, designation);
    return;
}