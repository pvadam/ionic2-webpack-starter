const pkg = require('../package.json');
const platforms = [
  'android',
  'darwin',
  'ios',
  'linux',
  'window'
];

module.exports = {
  baseUrl: '/',
  description: pkg.description,
  gaSiteID: '',
  host: 'localhost',
  port: 8080,
  platform: platforms.indexOf(process.env.PLATFORM) > -1 ? process.env.PLATFORM : 'web',
  themeColor: '',
  title: 'Ionic2 Webpack Starter'
};
