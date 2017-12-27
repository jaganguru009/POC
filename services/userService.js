var mongoose = require('mongoose');
var appRoot = require('app-root-path');
var userModel = require(appRoot + '/_api/users/userModel');

mongoose.connect("mongodb://localhost/hodelDB")

exports.getUsers = function (queryString, callback) {
    var results = "response from user get";
    callback(null, results);
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
exports.patchUser = function (user, callback) {
    callback(null, user);
    return;
}

exports.deleteUser = function (user, callback) {
    callback(null, user);
    return;
}