var mongoose = require('mongoose');
var appRoot = require('app-root-path');
var designationModel = require(appRoot + '/_api/designations/designationModel');

mongoose.connect("mongodb://localhost/hodelDB")

exports.getdesignations = function (queryString, callback) {
    designationModel.find((err, results) => {
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
exports.getDesignationById = function (id, callback) {
    designationModel.findById(id, (err, designation) => {
        if (err) {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            callback(null, err);
        } else {
            // send the list of all people
            callback(null, designation);
        }
    });
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
exports.patchdDesignation = function (designation, callback) {
    designationModel.findById(id, (err, result) => {
        // Handle any possible database errors
        if (err) {
            callback(null, err);
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            result.name = designation.name || result.name;
            result.description = designation.description || result.description; 
            result.created = designation.created || result.created;
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

exports.deleteDesignation = function (id, callback) {
   designationModel.findByIdAndRemove(id, (err, result) => {
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