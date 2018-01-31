var express = require('express');
var router = express.Router();
var async = require('async');
var appRoot = require('app-root-path');
var jwt = require('jsonwebtoken');
var authenticationService = require(appRoot + '/services/authenticationService');
var userService = require(appRoot + '/services/userService');
var commonService = require(appRoot + '/shared/commonService');
var deviceService = require(appRoot + '/services/deviceService');
var roomService = require(appRoot + '/services/roomService');
var utils = require(appRoot + '/shared/utils');
// create new object
router.post('/', function (req, res, next) {

    userService.isUserValidated(req.body, function (err, isSuccess) {
        if (isSuccess) {
            authenticationService.authenticate(req.body, function (err, token) {
                if (err) {
                    res.json(err);
                    return;
                }
                else {
                    //res.json({ success: true, token: token });
                    if (req.body.loginFlag == "registerDevice") {
                        var device = req.body;
                        delete device["loginFlag"];
                        device["deviceNumber"] = utils.getSixDigitRandomNumber();
                        device["status"] = true;
                        device["isVerified"] = false;
                        device["roomNumber"] = "";
                        deviceService.postDevice(device, function (err, results) {
                            if (err) {
                                res.json({ result: false, acessToken: token, error: err });
                                return;
                            }
                            else {
                                if (results.errorType == undefined)
                                { res.json({ result: true, acessToken: token, deviceNumber: device.deviceNumber }); }
                                else {
                                    { res.json({ result: false, acessToken: token, error: results.errorType }); }
                                }
                                return;
                            }

                        });

                    } else if (req.body.loginFlag == "roomAllocationLogin") {
                        res.json({ result: true, acessToken: token });
                        return;

                    } else if (req.body.loginFlag == "submitRoom") {
                        // roomService.getDeviceByUDID()

                    } else if (req.body.loginFlag == "roomNumberVarification") {

                    } else {
                        commonService.getUserByUserName(req.body.userName, function (err, user) {
                            commonService.getDashboard(user, function (err, dashboard) {
                                res.json({ dashboard: dashboard, "token": token });
                                return;
                            });
                        });
                    }

                }
            });
        }
        else {
            res.json({ "errorType": "loginFailed", "errorText": "Invalid credentials" });
            return;
        }
    });

});

module.exports = router;