'use strict';

var www = require('app/routes/www');

var express = require('express');
var router = express.Router();

router.get('/', www.home);

module.exports = router;
