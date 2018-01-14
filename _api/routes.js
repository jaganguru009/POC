var express = require('express');
var router = express.Router();

// root resource only returns info
router.get('/', function (req, res, next) {
  res.json('{ "name": "sportsmgmt.net API", "version": "0.01 Alpha" }');
});
router.use('/users', require('./users/users'));
router.use('/signIn', require('./users/signIn'));
router.use('/tiles', require('./tiles/tiles'));

router.use('/rooms', require('./rooms/rooms'));
router.use('/permissions', require('./permissions/permissions'));
router.use('/permissiongroups', require('./permissiongroups/permissiongroups'));
router.use('/roles', require('./roles/roles'));
router.use('/departments', require('./departments/departments'));
router.use('/designations', require('./designations/designations'));
router.use('/devices', require('./devices/devices'));


module.exports = router; 