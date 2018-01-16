var express = require('express');
var router = express.Router();
var async = require('async');
var appRoot = require('app-root-path');
var jwt = require('jsonwebtoken');
var permissionGroupService = require(appRoot + '/services/permissionGroupService');
var securedAPI = require(appRoot + '/middleware/securedAPI');

router.get('/', function (req, res, next) {
  securedAPI.isSecured(req, res, function (err, isSecured) {
    if (isSecured) {
      permissionGroupService.getpermissionGroups("permissiongroups", function (err, results) {
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

// fetch one
router.get('/:id', function (req, res, next) {
  securedAPI.isSecured(req, res, function (err, isSecured) {
    if (isSecured) {
      permissionGroupService.getPermissionGroupById(req.params.id, function (err, results) {
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
      permissionGroupService.postPermissionGroup(req.body, function (err, results) {
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
      permissionGroupService.deletePermissionGroup(req.params.id, function (err, results) {
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
      permissionGroupService.patchPermissionGroup(req.params.id, req.body, function (err, results) {
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