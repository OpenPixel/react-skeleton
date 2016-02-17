const path = require('path');

module.exports = function(env) {
  return {
    port: 5000,
    publicDir: path.resolve('public')
  };
};
