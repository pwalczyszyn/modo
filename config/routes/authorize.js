'use strict';

var express = require('express');
var router = express.Router();

var gmail = require('app/routes/authorize/gmail');

router.get('/gmail', gmail.init);
router.get('/gmail/callback', gmail.callback);

module.exports = router;
