'use strict';

module.exports = function(env) {

  function uri() {
    switch(env.environment) {
      default: return `${env.api_url}`;
    }
  }

  return {
    uri: uri(),
    auth: undefined,
    version: ''
  };
};
