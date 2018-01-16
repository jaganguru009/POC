var appRoot = require('app-root-path');
var tileModel = require(appRoot + '/_api/tiles/tileModel');

exports.getTiles = function (queryString, callback) {
    var results = "response from Tiles get";
    callback(null, results);
    return;
}
exports.postTile = function (tile, callback) {
    tileModel.create(tile, function (err, createdTile) {
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
exports.patchTile = function (tile, callback) {
    callback(null, tile);
    return;
}

exports.deleteTile = function (tile, callback) {
    callback(null, tile);
    return;
}