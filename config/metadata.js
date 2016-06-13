const pkg = require('../package.json');

module.exports = {
  baseUrl: '/',
  description: pkg.description,
  gaSiteID: '',
  host: 'localhost',
  port: 8080,
  platform: process.env.PLATFORM ? process.env.PLATFORM : 'web',
  themeColor: '',
  title: 'Ionic2 Webpack Starter'
};
