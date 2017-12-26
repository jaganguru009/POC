var jwt = require('jsonwebtoken');

exports.isSecured = function (req, res, callback) {
    var token = req.body.token || req.headers['token'];
    if (token) {
        jwt.verify(token, process.env.SECRETE_KEY, function (err, decode) {
            if (err) {
                res.status(500).send("Invalid token");
            }
            else {

                callback(null, true);
            }
        });

    }
    else {
        res.send("Please send token");
    }

} 