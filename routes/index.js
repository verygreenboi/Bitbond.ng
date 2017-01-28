var express = require('express');
var router = express.Router();
var path = require('path');
var gzipStatic = require('connect-gzip-static');
var oneDay = 86400000;

/* GET home page. */
router.use('/', gzipStatic(path.join(__dirname, '../dist')));

module.exports = router;
