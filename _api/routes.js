var express = require('express');
var router = express.Router();

// root resource only returns info
router.get('/', function (req, res, next) {
  res.json('{ "name": "sportsmgmt.net API", "version": "0.01 Alpha" }');
});
router.use('/users', require('./users/users'));
router.use('/signIn', require('./users/signIn'));
router.use('/tiles', require('./tiles/tiles'));

module.exports = router;