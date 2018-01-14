var mongoose = require('mongoose');
var appRoot = require('app-root-path');
var departmentModel = require(appRoot + '/_api/departments/departmentModel');

mongoose.connect("mongodb://localhost/hodelDB")

exports.getDepartments = function (queryString, callback) {
    var results = "response from department get";
    callback(null, results);
    return;
}
exports.postDepartment = function (department, callback) {
    departmentModel.create(department, function (err, createdDepartment) {
        if (err) {
            if (err.code === 11000) {
                err = {
                    "errorType": "Duplicate department",
                    "errorText": "Same department is available in the database,try new one"
                }
            }
            callback(null, err);

            return;
        }
        else {
            callback(null, createdDepartment);

            return;
        }

    }
    );
} 
exports.patchDepartment = function (department, callback) {
    callback(null, department);
    return;
}

exports.deleteDepartment = function (department, callback) {
    callback(null, department);
    return;
}