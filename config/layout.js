'use strict';

const
  path = require('path');

module.exports = function() {
  return {
    favicon: path.resolve('public/favicon.ico'),
    publicDir: path.resolve('public'),
    pageConstants: {
      title: 'Thing',
      analytics: 'UA-XXXXXXXX-1',
      appStart: 'App.default.start();'
    }
  };
};
