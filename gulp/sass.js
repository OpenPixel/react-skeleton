'use strict';

const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');

module.exports = function(gulp, opts, $) {
  gulp.task('sass', function () {
    gulp.src([path.join(opts.srcDir, '/sass/base.scss')])
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(path.join(opts.publicDir, '/css')));
  });

  gulp.task('sass:watch', function () {
    gulp.watch(path.join(opts.srcDir, '/sass/**/*.scss'), ['sass']);
  });
};
