const helpers = require('./helpers');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

module.exports = {
  devtool: 'inline-source-map',
  resolve: {
    extensions: [ '', '.ts', '.js' ],
    root: helpers.root('src')
  },
  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'tslint',
        exclude: [ helpers.root('node_modules') ]
      },
      {
        test: /\.js$/,
        loader: 'source-map',
        exclude: [
          // these packages have problems with their sourcemaps
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/@angular')
        ]
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript',
        query: {
          compilerOptions: {
            // Remove TypeScript helpers to be injected below by DefinePlugin
            removeComments: true
          }
        },
        exclude: [ /\.e2e\.ts$/ ]
      },
      {
        test: /\.json$/,
        loader: 'json',
        exclude: [ helpers.root('src/index.html') ]
      },
      {
        test: /\.html$/,
        loader: 'raw',
        exclude: [ helpers.root('src/index.html') ]
      }
    ],
    postLoaders: [
      {
        test: /\.(js|ts)$/, loader: 'istanbul-instrumenter',
        include: helpers.root('src'),
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/
        ]
      }
    ]
  },
  plugins: [
    // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
    new DefinePlugin({
      'ENV': process.env.NODE_ENV,
      'HMR': false
    })
  ],
  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  },
  node: {
    global: 'window',
    process: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
