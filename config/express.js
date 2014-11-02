'use strict';

var path = require('path');
var express = require('express');
var morgan = require('morgan');

module.exports = function (app) {

  app.use(morgan('dev'));

  app.set('views', path.join(__dirname, '../app/views'));
  app.set('view engine', 'jsx');
  app.engine('jsx', require('express-react-views').createEngine());

};
