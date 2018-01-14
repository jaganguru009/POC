var express = require('express');
var router = express.Router();
var async = require('async');
var appRoot = require('app-root-path');
var jwt = require('jsonwebtoken');
var permissionService = require(appRoot + '/services/permissionService');
var securedAPI = require(appRoot + '/middleware/securedAPI');

router.get('/', function (req, res, next) {
  permissionService.getPermissions("permissions", function (err, results) {
    res.send({ 'permissions': results });
  })

});

// fetch one
router.get('/:id', function (req, res, next) {
  securedAPI.isSecured(req, res, function (err, isSecured) {
    if (isSecured) {
      permissionService.getPermissionById(req.params.id, function (err, results) {
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


// create new object
router.post('/', function (req, res, next) {
  securedAPI.isSecured(req, res, function (err, isSecured) {
    if (isSecured) {
      permissionService.postPermission(req.body, function (err, results) {
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
  securedAPI.isSecured(req, res, function (err, isSecured) {
    if (isSecured) {
      permissionService.deletePermission(req.params.id, function (err, results) {
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

// partial update
router.patch('/:id', function (req, res, next) {
  securedAPI.isSecured(req, res, function (err, isSecured) {
    if (isSecured) {
      permissionService.patchPermission(req.params.id, req.body, function (err, results) {
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

module.exports = router;