var mongoose = require('mongoose');
var appRoot = require('app-root-path');
var userModel = require(appRoot + '/_api/users/userModel');

mongoose.connect("mongodb://localhost/hodelDB")

exports.getUsers = function (queryString, callback) {
    //var results = "response from user get";
    userModel.find((err, results) => {
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

exports.getUserById = function (id, callback) {
    userModel.findById(id, (err, user) => {
        if (err) {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            callback(null, err);
        } else {
            // send the list of all people
            callback(null, user);
        }
    });
    return;
}
exports.postUser = function (user, callback) {
    userModel.create(user, function (err, createdUser) {
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
exports.isUserValidated = function (user, callback) {
    userModel.find({
        $and: [
            { $and: [{ userName: user.userName }] },
            { $and: [{ password: user.password }] }
        ]
    }, function (err, results) {
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
exports.patchUser = function (id, user, callback) {
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

            result.created = user.created || result.created;
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

exports.deleteUser = function (id, callback) {
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