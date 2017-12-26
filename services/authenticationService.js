var jwt = require('jsonwebtoken');

exports.authenticate = function (user, callback) {
    var token = jwt.sign(user, process.env.SECRETE_KEY)
    callback(null, token);
}