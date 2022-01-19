require('coffee-script/register');

const gulp = require('gulp'),
  istanbul = require('gulp-istanbul'),
  umd = require('gulp-umd'),
  path = require('path'),
  concat = require('gulp-concat'),
  insert = require('gulp-insert'),
  mocha = require('gulp-mocha'),
  babel = require('gulp-babel'),
  replace = require('gulp-replace'),
  uglify = require('gulp-uglify'),
  runSequence = require('run-sequence'),
  argv = require('yargs').argv;


const onlyTest = argv.onlyTest || argv.limitTest;

const SQUEL_VERSION = require('./package.json').version;

gulp.task('build-basic', gulp.series(() =>

  gulp.src([
    './src/core.js',
  ])
  .pipe(concat('squel-basic.js'))
  .pipe(replace(/<<VERSION_STRING>>/i, SQUEL_VERSION))
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(umd({
    exports: function (file) {
      return 'squel';
    },
    namespace: function (file) {
      return 'squel';
    }
  }))
  .pipe(gulp.dest('./dist'))
  .pipe(uglify())
  .pipe(insert.prepend('/*! squel | https://github.com/hiddentao/squel | BSD license */'))
  .pipe(concat('squel-basic.min.js'))
  .pipe(gulp.dest('./dist'))

));

gulp.task('build-full', gulp.series(() =>

  gulp.src([
    './src/core.js',
    './src/mssql.js',
    './src/mysql.js',
    './src/postgres.js',
  ])
  .pipe(concat('squel.js'))
  .pipe(replace(/<<VERSION_STRING>>/i, SQUEL_VERSION))
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(umd({
    exports: function (file) {
      return 'squel';
    },
    namespace: function (file) {
      return 'squel';
    }
  }))
  .pipe(gulp.dest('./dist'))
  .pipe(uglify())
  .pipe(insert.prepend('/*! squel | https://github.com/hiddentao/squel | BSD license */'))
  .pipe(concat('squel.min.js'))
  .pipe(gulp.dest('./dist'))

));

gulp.task('default', gulp.series('build-basic', 'build-full', (done) => {
  done();
}));