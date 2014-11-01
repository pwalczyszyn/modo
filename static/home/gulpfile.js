'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');

var gutil = require('gulp-util');
var watchify = require('watchify');
var reactify = require('reactify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var env;
var dest;

// Default task
gulp.task('default', ['build:dev', 'watch']);

function configureEnv(_env) {
  env = _env;
  dest = env === 'dev' ? './dev' : './dist';
}

function handleError(task) {
  return function(err) {
    gutil.log(gutil.colors.red(err));
    notify.onError(task + ' failed, check the logs..')(err);
  };
}

function scripts(watch) {
  var bundler, rebundle;
  bundler = browserify('./src/js/main.js', {
    basedir: __dirname,
    debug: env === 'dev',
    cache: {}, // required for watchify
    packageCache: {}, // required for watchify
    fullPaths: watch // required to be true only for watchify
  });
  if(watch) {
    bundler = watchify(bundler);
  }

  bundler.transform(reactify);

  rebundle = function() {
    var stream = bundler.bundle();
    stream.on('error', handleError('Browserify'));
    stream = stream.pipe(source('bundle.js'));
    return stream.pipe(gulp.dest(dest + '/js'));
  };

  bundler.on('update', rebundle);
  return rebundle();
}

gulp.task('build:dev', function() {
  configureEnv('dev');
  gulp.start('build');
});
gulp.task('build:prod', function() {
  configureEnv('prod');
  gulp.start('build');
});

gulp.task('build', ['styles', 'scripts']);

gulp.task('styles', function() {
  gulp.src('./src/scss/*.scss')
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(sass({
      includePaths: ['./bower_components/foundation/scss']
    }))
    .pipe(autoprefixer())
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(gulp.dest(dest + '/css'));
});

gulp.task('scripts', function() {
  return scripts(false);
});

gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/scss/**/*.scss', ['styles']);

  // Watch .js files
  scripts(true);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch([dest + '/**']).on('change', livereload.changed);
});
