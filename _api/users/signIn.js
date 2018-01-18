var express = require('express');
var router = express.Router();
var async = require('async');
var appRoot = require('app-root-path');
var jwt = require('jsonwebtoken');
var authenticationService = require(appRoot + '/services/authenticationService');
var userService = require(appRoot + '/services/userService');
var commonService = require(appRoot + '/shared/commonService');

// create new object
router.post('/', function (req, res, next) {

    userService.isUserValidated(req.body, function (err, isSuccess) {
        if (isSuccess) {
            authenticationService.authenticate(req.body, function (err, token) {
                if (err) {
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                    res.json(err);
                    return;
                }
                else {
                    //res.json({ success: true, token: token });
                    commonService.getUserByUserName(req.body.userName, function (err, user) {
                        commonService.getDashboard(user, function (err, dashboard) {
                            res.header("Access-Control-Allow-Origin", "*");
                            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                            res.json({ dashboard: dashboard });
                            return;
                        });
                    });
                }
            });
        }
        else {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.json({ "errorType": "loginFailed", "errorText": "Invalid credentials" });
            return;
        }
    });

});

module.exports = router;