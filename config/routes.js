'use strict';

var express = require('express');
var wwwRouter = express.Router();
var authRouter = express.Router();
var accountRouter = express.Router();
var gmail = require('app/routes/authorize/gmail');
var account = require('app/routes/account');

module.exports = function(app) {

  wwwRouter.get('/', require('app/routes/www').home);
  app.use(wwwRouter);

  authRouter.get('/gmail', gmail.init);
  authRouter.get('/gmail/callback', gmail.callback);
  app.use('/authorize', authRouter);

  accountRouter.get('/password', account.password.request);
  accountRouter.post('/password', account.password.request);
  accountRouter.get('/password/:passwordCode', account.password.set);
  accountRouter.post('/password:passwordCode', account.password.set);
  app.user('/account', accountRouter);
};
