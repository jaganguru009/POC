var appRoot = require('app-root-path');
var deviceModel = require(appRoot + '/_api/devices/deviceModel');

exports.getDevices = function (queryString, callback) {
    deviceModel.find((err, results) => {
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

exports.getDeviceById = function (id, callback) {
    deviceModel.findById(id, (err, device) => {
        if (err) {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            callback(null, err);
        } else {
            if (device == null) {
                var response = {
                    "message": "No device found"
                }
                callback(null, response);
            }
            else {
                callback(null, device);
            }
        }
    });
    return;
}
exports.postDevice = function (device, callback) {
    deviceModel.create(device, function (err, createddevice) {
        if (err) {
            if (err.code === 11000) {
                err = {
                    "errorType": "Duplicate UDID",
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
exports.patchDevice = function (id, device, callback) {
    deviceModel.findById(id, (err, result) => {
        // Handle any possible database errors
        if (err) {
            callback(null, err);
            return;
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            result.UDID= device.UDID|| result.UDID;
            result.status = device.status || result.status;
            result.deviceNumber = device.deviceNumber || result.deviceNumber;
            result.roomNumber = device.roomNumber || result.roomNumber;
            result.deviceToken = device.deviceToken || result.deviceToken;
            //result.created = device.created || result.created;
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

exports.deleteDevice = function (id, callback) {
    deviceModel.findByIdAndRemove(id, (err, result) => {
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        if (err) {
            callback(null, err);
        } else {
            let response = {
                message: "device successfully deleted",
                id: result._id
            };
            callback(null, response);
        }
        return;
    })
}