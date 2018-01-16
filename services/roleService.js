var appRoot = require('app-root-path');
var roleModel = require(appRoot + '/_api/roles/roleModel'); 

exports.getRoles = function (queryString, callback) {
    roleModel.find((err, results) => {
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

exports.getRoleById = function (id, callback) {
    roleModel.findById(id, (err, role) => {
        if (err) {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            callback(null, err);
            return;
        } else {
            if (role == null) {
                var response = {
                    "message": "No role found"
                }
                callback(null, response);
                return;
            }
            else {
                callback(null, role);
                return;
            }
        }
    });
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

exports.patchRole = function (id, role, callback) {
    roleModel.findById(id, (err, result) => {
        // Handle any possible database errors
        if (err) {
            callback(null, err);
            return;
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            result.name = role.name || result.name;
            result.permissionGroup = role.permissionGroup || result.permissionGroup;
            result.status = role.status || result.status; 
            //result.created = role.created || result.created;
            result.lastUpdated = Date.now();

            // Save the updated document back to the database
            result.save((err, res) => {
                if (err) {
                    callback(null, err);
                    return;
                }
                else
                {
                    callback(null, result);
                     return;
                }
                // res.status(200).send(res);
            });
        }
        
    });
}

exports.deleteRole = function (id, callback) {
    roleModel.findByIdAndRemove(id, (err, result) => {
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        if (err) {
            callback(null, err);
            return;
        } else {
            if(result==null)
            {
                 let response = {
                message: "role not found"
            };
            callback(null, response);
            return;
            }else
            {
                let response = {
                message: "role successfully deleted",
                id: result._id
             };
            callback(null, response);
            return;
            }
           
        }
        //return;
    })
}