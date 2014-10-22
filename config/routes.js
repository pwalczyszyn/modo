'use strict';

var express = require('express');
var wwwRouter = express.Router();
var authRouter = express.Router();
var gmail = require('app/routes/authorize/gmail');

module.exports = function(app) {

  wwwRouter.get('/', require('app/routes/www').home);
  app.use(wwwRouter);

  authRouter.get('/gmail', gmail.init);
  authRouter.get('/gmail/callback', gmail.callback);
  app.use('/authorize', authRouter);

};
