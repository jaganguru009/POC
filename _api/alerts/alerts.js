var express = require('express');
var router = express.Router();
var async = require('async');
var appRoot = require('app-root-path');
var jwt = require('jsonwebtoken');
var alertService = require(appRoot + '/services/alertService');
var securedAPI = require(appRoot + '/middleware/securedAPI');

router.get('/', function (req, res, next) {
  alertService.getAlerts("alerts", function (err, results) {
    res.send({ 'alerts': results });
  })

});

// fetch one
router.get('/:id', function (req, res, next) {
  res.send('get alert by id');
});


// create new object
router.post('/', function (req, res, next) {
  securedAPI.isSecured(req, res, function (err, isSecured) {
    if (isSecured) {
      alertService.postUser(req.body, function (err, results) {
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
  res.send('delete alert ');
});

// partial update
router.patch('/:id', function (req, res, next) {
  res.send("edit a alert");
});

module.exports = router;