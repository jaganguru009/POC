var mongoose = require('mongoose');
var appRoot = require('app-root-path');
var departmentModel = require(appRoot + '/_api/departments/departmentModel');

mongoose.connect("mongodb://localhost/hodelDB")

exports.getDepartments = function (queryString, callback) {
    departmentModel.find((err, results) => {
        if (err) {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            callback(null, err);
        } else {
            // send the list of all people
            callback(null, results);
        }
    });
    return;
}

exports.getDepartmentById = function (id, callback) {
    departmentModel.findById(id, (err, department) => {
        if (err) {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            callback(null, err);
        } else {
            // send the list of all people
            if (department == null) {
                var response = {
                    "message": "No document found"
                }
                callback(null, response);
            }
            else {
                callback(null, department);
            }

        }
    });
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

exports.patchDepartment = function (id, department, callback) {
    departmentModel.findById(id, (err, result) => {
        // Handle any possible database errors
        if (err) {
            callback(null, err);
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            result.name = department.name || result.name;
            result.description = department.description || result.description;
            //result.created = department.created || result.created;
            result.lastUpdated = Date.now;

            // Save the updated document back to the database
            result.save((err, res) => {
                if (err) {
                    callback(null, err);
                }
                // res.status(200).send(res);
            });
        }
        callback(null, result);
        return;
    });
}

exports.deleteDepartment = function (id, callback) {
    departmentModel.findByIdAndRemove(id, (err, result) => {
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        if (err) {
            callback(null, err);
        } else {
            let response = {
                message: "department successfully deleted",
                id: result._id
            };
            callback(null, response);
        }
        return;
    })
}