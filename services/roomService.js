var mongoose = require('mongoose');
var appRoot = require('app-root-path');
var roomModel = require(appRoot + '/_api/rooms/roomModel');

mongoose.connect("mongodb://localhost/hodelDB")

exports.getrooms = function (queryString, callback) {
    var results = "response from room get";
    callback(null, results);
    return;
}
exports.postRoom = function (room, callback) {
    roomModel.create(room, function (err, createdroom) {
        if (err) {
            if (err.code === 11000) {
                err = {
                    "errorType": "Duplicate roomName",
                    "errorText": "Same room name is available in the database,try new one"
                }
            }
            callback(null, err);

            return;
        }
        else {
            callback(null, createdroom);

            return;
        }

    }
    );
}
exports.patchRoom = function (room, callback) {
    callback(null, room);
    return;
}

exports.deleteRoom = function (room, callback) {
    callback(null, room);
    return;
}