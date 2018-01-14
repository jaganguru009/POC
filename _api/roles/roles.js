var express = require('express');
var router = express.Router();
var async = require('async');
var appRoot = require('app-root-path');
var jwt = require('jsonwebtoken');
var userService = require(appRoot + '/services/userService');
var securedAPI = require(appRoot + '/middleware/securedAPI');

router.get('/', function (req, res, next) {
  userService.getUsers("users", function (err, results) {
    res.send({ 'users': results });
  })

});

// fetch one
router.get('/:id', function (req, res, next) {
  res.send('get user by id');
});


// create new object
router.post('/', function (req, res, next) {
  securedAPI.isSecured(req, res, function (err, isSecured) {
    if (isSecured) {
      userService.postUser(req.body, function (err, results) {
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
  res.send('delete user ');
});

// partial update
router.patch('/:id', function (req, res, next) {
  res.send("edit a user");
});

module.exports = router;