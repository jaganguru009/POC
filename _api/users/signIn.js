var express = require('express');
var router = express.Router();
var async = require('async');
var appRoot = require('app-root-path');
var jwt = require('jsonwebtoken');
var authenticationService = require(appRoot + '/services/authenticationService');
var userService = require(appRoot + '/services/userService');

// create new object
router.post('/', function (req, res, next) {

    userService.isUserValidated(req.body, function (err, isSuccess) { 
        if (isSuccess) {
            authenticationService.authenticate(req.body, function (err, token) {
                if (err) {
                    res.json(err);
                }
                else {
                    res.json({ success: true, token: token });
                }
            });
        }
        else {
            res.json({ "errorType": "loginFailed", "errorText": "Invalid credentials" });
        }
    });

});

module.exports = router;