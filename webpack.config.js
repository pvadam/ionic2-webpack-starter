// Look in ./config folder for webpack.dev.js
switch (process.env.NODE_ENV) {
  case 'dev':
  case 'development':
    module.exports = require('./config/webpack.dev');
    break;

  case 'stg':
  case 'staging':
    module.exports = require('./config/webpack.stg');
    break;

  case 'prd':
  case 'production':
    module.exports = require('./config/webpack.prd');
    break;

  case 'test':
  case 'testing':
    module.exports = require('./config/webpack.test');
    break;
}
