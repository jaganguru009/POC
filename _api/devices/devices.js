var express = require('express');
var router = express.Router();
var async = require('async');
var appRoot = require('app-root-path');
var jwt = require('jsonwebtoken');
var deviceService = require(appRoot + '/services/deviceService');
var securedAPI = require(appRoot + '/middleware/securedAPI');

router.get('/', function (req, res, next) {
  deviceService.getDevices("devices", function (err, results) {
    res.send({ 'devices': results });
  })

});

// fetch one
router.get('/:id', function (req, res, next) {
  res.send('get device by id');
});


// create new object
router.post('/', function (req, res, next) {
  securedAPI.isSecured(req, res, function (err, isSecured) {
    if (isSecured) {
      deviceService.postDevice(req.body, function (err, results) {
        if (err) {
          res.json(err);
        }
        else {
          res.json(results);
        }

      })

    }
  })
});




// delete (needs to be replaced with archival so as not to lose context for other data)
router.delete('/:id', function (req, res, next) {
  res.send('delete device ');
});

// partial update
router.patch('/:id', function (req, res, next) {
  res.send("edit a device");
});

module.exports = router;