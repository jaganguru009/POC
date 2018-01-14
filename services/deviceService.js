var mongoose = require('mongoose');
var appRoot = require('app-root-path');
var deviceModel = require(appRoot + '/_api/devices/deviceModel');

mongoose.connect("mongodb://localhost/hodelDB")

exports.getdevices = function (queryString, callback) {
    var results = "response from device get";
    callback(null, results);
    return;
}
exports.postdevice = function (device, callback) {
    deviceModel.create(device, function (err, createddevice) {
        if (err) {
            if (err.code === 11000) {
                err = {
                    "errorType": "Duplicate deviceName",
                    "errorText": "Same device name is available in the database,try new one"
                }
            }
            callback(null, err);

            return;
        }
        else {
            callback(null, createddevice);

            return;
        }

    }
    );
} 
exports.patchdevice = function (device, callback) {
    callback(null, device);
    return;
}

exports.deletedevice = function (device, callback) {
    callback(null, device);
    return;
}