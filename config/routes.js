'use strict';

var express = require('express');
var wwwRouter = express.Router();
var authRouter = express.Router();
var loginRouter = express.Router();
var gmail = require('app/routes/authorize/gmail');
var login = require('app/routes/login');

module.exports = function(app) {

  wwwRouter.get('/', require('app/routes/www').home);
  app.use(wwwRouter);

  authRouter.get('/gmail', gmail.init);
  authRouter.get('/gmail/callback', gmail.callback);
  app.use('/authorize', authRouter);

  loginRouter.get('/password', login.password.request);
  loginRouter.post('/password', login.password.request);
  loginRouter.get('/password/:passwordCode', login.password.set);
  loginRouter.post('/password/:passwordCode', login.password.set);
  app.use('/login', loginRouter);
};
