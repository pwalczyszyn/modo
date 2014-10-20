'use strict';

var path = require('path');
var express = require('express');

module.exports = function (app) {

  app.set('views', path.join(__dirname, '../app/views'));
  app.set('view engine', 'jsx');
  app.engine('jsx', require('express-react-views').createEngine());

  app.use(express.static(__dirname + '/public'));

};
