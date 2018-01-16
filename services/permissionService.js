var appRoot = require('app-root-path');
var permissionModel = require(appRoot + '/_api/permissions/permissionModel');

exports.getPermissions = function (queryString, callback) {
    permissionModel.find((err, results) => {
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

exports.getPermissionById = function (id, callback) {
    permissionModel.findById(id, (err, permission) => {
        if (err) {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            callback(null, err);
        } else {
            if (permission == null) {
                var response = {
                    "message": "No permission found"
                }
                callback(null, response);
            }
            else {
                callback(null, permission);
            }
        }
    });
    return;
}
exports.postPermission = function (permission, callback) {
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
exports.patchPermission = function (id, permission, callback) {
    permissionModel.findById(id, (err, result) => {
        // Handle any possible database errors
        if (err) {
            callback(null, err);
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            result.name = permission.name || result.name;
            result.departmentId = permission.departmentId || result.departmentId; 
            //result.created = permission.created || result.created;
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

exports.deletePermission = function (id, callback) {
    permissionModel.findByIdAndRemove(id, (err, result) => {
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        if (err) {
            callback(null, err);
        } else {
            let response = {
                message: "permission successfully deleted",
                id: result._id
            };
            callback(null, response);
        }
        return;
    })
}