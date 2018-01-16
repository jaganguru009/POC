var mongoose = require('mongoose');
var appRoot = require('app-root-path');
var permissionGroupModel = require(appRoot + '/_api/permissiongroups/permissionGroupModel');

mongoose.connect("mongodb://localhost/hodelDB")

exports.getpermissionGroups = function (queryString, callback) {
    permissionGroupModel.find((err, results) => {
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
exports.getPermissionGroupById = function (id, callback) {
    permissionGroupModel.findById(id, (err, group) => {
        if (err) {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            callback(null, err);
        } else {
            if (group == null) {
                var response = {
                    "message": "No group found"
                }
                callback(null, response);
            }
            else {
                callback(null, group);
            }
        }
    });
    return;
}

exports.postPermissionGroup = function (permisionGroup, callback) {
    permissionGroupModel.create(permisionGroup, function (err, createdpermisionGroup) {
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
exports.patchPermissionGroup = function (id, permissionGroup, callback) {
    permissionGroupModel.findById(id, (err, result) => {
        // Handle any possible database errors
        if (err) {
            callback(null, err);
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            result.name = permissionGroup.name || result.name;
            result.permissions = permissionGroup.permissions || result.permissions;
            //result.created = permissionGroup.created || result.created;
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

exports.deletePermissionGroup = function (id, callback) {
    permissionGroupModel.findByIdAndRemove(id, (err, result) => {
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        if (err) {
            callback(null, err);
        } else {
            let response = {
                message: "permissionGroup successfully deleted",
                id: result._id
            };
            callback(null, response);
        }
        return;
    })
}