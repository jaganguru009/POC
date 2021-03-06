var appRoot = require('app-root-path');
var permissionGroupModel = require(appRoot + '/_api/permissiongroups/permissionGroupModel'); 

exports.getpermissionGroups = function (queryString, callback) {
    permissionGroupModel.find((err, results) => {
        if (err) {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            callback(null, err);
            return;
        } else {
            // send the list of all people
            callback(null, results);
            return;
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
            return;
        } else {
            if (group == null) {
                var response = {
                    "message": "No group found"
                }
                callback(null, response);
                return;
            }
            else {
                callback(null, group);
                return;
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
            return;
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            result.name = permissionGroup.name || result.name;
            result.permissions = permissionGroup.permissions || result.permissions;
            //result.created = permissionGroup.created || result.created;
            result.lastUpdated = Date.now();

            // Save the updated document back to the database
            result.save((err, result) => {
                if (err) {
                   callback(null, err);
                     return;
                }
                 callback(null, result);
                  return;
            });
        }
        
        
    });
}

exports.deletePermissionGroup = function (id, callback) {
    permissionGroupModel.findByIdAndRemove(id, (err, result) => {
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        if (err) {
            callback(null, err);
            return;
        } else {
            if(result==null)
            {
                 let response = {
                message: "group not found"
            };
            callback(null, response);
            return;
            }else
            {
                let response = {
                message: "group successfully deleted",
                id: result._id
             };
            callback(null, response);
            return;
            }
           
        }
    });
}