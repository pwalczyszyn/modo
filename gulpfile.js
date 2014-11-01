'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('serve', function() {
  return nodemon({
    script: 'server.js',
    ext: 'js jsx',
    env: {
      'NODE_ENV': 'development'
    },
    ignore: ['./static/**'],
    nodeArgs: ['--debug']
  });

});
