var appRoot = require('app-root-path');
var roomModel = require(appRoot + '/_api/rooms/roomModel');

exports.getRooms = function (queryString, callback) {
    roomModel.find((err, results) => {
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

exports.getRoomById = function (id, callback) {
    roomModel.findById(id, (err, room) => {
        if (err) {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            callback(null, err);
            return;
        } else {
           if (room == null) {
                var response = {
                    "message": "No room found"
                }
                callback(null, response);
                return;
            }
            else {
                callback(null, room);
                return;
            }
        }
    });
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

exports.patchRoom = function (id, room, callback) {
    roomModel.findById(id, (err, result) => {
        // Handle any possible database errors
        if (err) {
            callback(null, err);
            return;
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            result.roomNumber = room.roomNumber || result.roomNumber;
            result.roomType = room.roomType || result.roomType;
            result.floor = room.floor || result.floor;
            result.wing = room.wing || result.wing;
            result.maxPeople = room.maxPeople || result.maxPeople;
            result.description = room.description || result.description;
            result.maxIpads = room.maxIpads || result.maxIpads;
            result.status = room.status || result.status;
            //result.created = room.created || result.created;
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

exports.deleteRoom = function (id, callback) {
    roomModel.findByIdAndRemove(id, (err, result) => {
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        if (err) {
            callback(null, err);
             return;
        } else {
            if(result==null)
            {
                 let response = {
                message: "room not found"
            };
            callback(null, response);
            return;
            }else
            {
                let response = {
                message: "room successfully deleted",
                id: result._id
             };
            callback(null, response);
            return;
            }
           
        }
    })
}