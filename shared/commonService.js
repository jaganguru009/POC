var appRoot = require('app-root-path');
var permissionModel = require(appRoot + '/_api/permissions/permissionModel');
var permissionGroupModel = require(appRoot + '/_api/permissiongroups/permissionGroupModel');
var departmentModel = require(appRoot + '/_api/departments/departmentModel');
var roleModel = require(appRoot + '/_api/roles/roleModel');
var userModel = require(appRoot + '/_api/users/userModel');

exports.getDashboard = function(user, callback) {
    //var results = "response from user get";  
    roleModel.findById(user[0].roleId, (err, role) => {
        console.log("Role" + JSON.stringify(role));
        if (err) {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            callback(null, err);
            return;
        } else {
            // send the list of all people
            //callback(null, results);
            permissionGroupModel.findById(role.permissionGroup, (err, permissionGroup) => {
                if (err) {
                    // Note that this error doesn't mean nothing was found,
                    // it means the database had an error while searching, hence the 500 status
                    callback(null, err);
                    return;
                }
                else {
                    permissionModel.find({
                        $and: [
                            { _id: { $in: permissionGroup.permissions } }
                        ]
                    }, function(err, results) {
                        if (err) {
                            console.log("error occured while searching user ");
                            callback(null, err);
                            return;
                        }
                        else {
                            if (results.length > 0) {
                                callback(null, results);
                                return;
                            }
                            else {
                                results = { "message": "No permissions Found" };
                                callback(null, results);
                                return;
                            }
                        }
                        // if (results.length == 0) {
                        //     return false;
                        // } else {
                        //     return true;
                        // }
                    });

                }
            }
            );
        }
    });

    return;
}

exports.getUserByUserName = function(userName, callback) {
    userModel.find({
        $and: [
            { $and: [{ userName: userName }] }
        ]
    }, function(err, results) {
        if (err) {
            console.log("error occured while searching user ");
        }
        else {
            if (results.length > 0) {
                callback(null, results);
            }
            else {
                results = { "message": "No permissions Found" };
                callback(null, results);

            }
        }
        // if (results.length == 0) {
        //     return false;
        // } else {
        //     return true;
        // }
    });
    return;
}
exports.postUser = function(user, callback) {
    userModel.create(user, function(err, createdUser) {
        if (err) {
            if (err.code === 11000) {
                err = {
                    "errorType": "Duplicate UserName",
                    "errorText": "Same user name is available in the database,try new one"
                }
            }
            callback(null, err);

            return;
        }
        else {
            callback(null, createdUser);

            return;
        }

    }
    );
}
exports.isUserValidated = function(user, callback) {
    userModel.find({
        $and: [
            { $and: [{ userName: user.userName }] },
            { $and: [{ password: user.password }] }
        ]
    }, function(err, results) {
        if (err) {
            console.log("error occured while searching user ");
        }
        else {
            if (results.length > 0) {
                callback(null, true);
            }
            else {
                callback(null, false);

            }
        }
        // if (results.length == 0) {
        //     return false;
        // } else {
        //     return true;
        // }
    });

}
exports.patchUser = function(id, user, callback) {
    userModel.findById(id, (err, result) => {
        // Handle any possible database errors
        if (err) {
            callback(null, err);
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            result.userName = user.name || result.userName;
            result.password = user.description || result.description;
            result.name = user.name || result.name;
            result.email = user.email || result.email;

            result.empCode = user.empCode || result.empCode;
            result.roleId = user.roleId || result.roleId;
            result.departmentId = user.departmentId || result.departmentId;
            result.status = user.status || result.status;

            //result.created = user.created || result.created;
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

exports.deleteUser = function(id, callback) {
    userModel.findByIdAndRemove(id, (err, result) => {
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        if (err) {
            callback(null, err);
        } else {
            let response = {
                message: "user successfully deleted",
                id: result._id
            };
            callback(null, response);
        }
        return;
    })
}