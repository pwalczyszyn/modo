'use strict';

var path = require('path');
var express = require('express');

module.exports = function(app) {
  var env = app.get('env');
  var envDir = app.get('env') === 'dev' ? 'dev' : 'dist';
  app.use(express.static(path.join(__dirname, '../static/home/', envDir)));
  console.log(path.join(__dirname, '../static/home/', envDir));
};
