'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const fs = require('fs');
const path = require('path');
const runSequence = require('run-sequence');
const Config = require('./config');

const opts = new Config().gulp;

for (let task of fs.readdirSync(opts.taskDir)) {
  console.log(task);
  let file = path.join(opts.taskDir, task);
  require(file)(gulp, opts, $);
}

gulp.task('build', ['browserify', 'sass']);

gulp.task('watch', ['browserify:watch', 'sass:watch', 'server:watch']);

gulp.task('dev', function(cb) {
  runSequence('build', 'server', 'watch', cb);
});
