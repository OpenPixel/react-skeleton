'use strict';

const fs    = require('fs');
const path  = require('path');

class Config {
  constructor(env) {
    env = {
      environment: (process.env.NODE_ENV || 'development'),
      api_url: (process.env.API_URL || 'http://localhost:9090')
    };

    for (let file of fs.readdirSync(__dirname)) {
      if (file === 'index.js' || !/\.js$/.test(file)) continue;
      let name = path.basename(file, '.js');
      this[name] = require(`${__dirname}/${file}`)(env);
    }
  }
}

module.exports = Config;
