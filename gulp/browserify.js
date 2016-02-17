'use strict';

const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const path = require('path');
const watchify = require('watchify');

module.exports = function(gulp, opts, $) {
  let production = (process.env.NODE_ENV === 'production');

  let bundler = null;

  function getBundler() {
    if (bundler) return bundler;

    bundler = browserify({
      entries: [path.join(opts.srcDir, '/app.js')],
      standalone: 'App',
      transform: ['babelify'],
      extensions: ['.jsx'],
      debug: !production,
      cache: {},
      packageCache: {}
    });

    if (!production) {
      bundler = watchify(bundler);
    }

    return bundler;
  }

  gulp.task('browserify', function() {
    let stream = getBundler();
    return stream
      .bundle()
      .on('error', function(err) {
        stream.emit('error', err);
      })
      //Pass desired output filename to vinyl-source-stream
      .pipe(source('bundle.js'))
      // Start piping stream to tasks!
      .pipe(gulp.dest(opts.publicDir));
  });

  gulp.task('browserify:watch', function () {
    getBundler().on('update', function() {
      gulp.start('browserify');
    });
  });
};
