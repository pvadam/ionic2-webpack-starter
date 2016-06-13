const webpack = require('webpack');
const helpers = require('./helpers');
var CopyWebpackPlugin = (CopyWebpackPlugin = require('copy-webpack-plugin'), CopyWebpackPlugin.default || CopyWebpackPlugin);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const METADATA = require('./metadata');

module.exports = {
  metadata: METADATA,
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'main': './src/main.browser.ts'
  },
  resolve: {
    extensions: [
      '',
      '.ts',
      '.js',
      '.scss'
    ],
    root: helpers.root('src'),
    modulesDirectories: [ 'node_modules' ],
    alias: {
      'angular2': helpers.root('node_modules/@angularclass/angular2-beta-to-rc-alias/dist/beta-17')
    }
  },
  module: {
    preLoaders: [
      // { test: /\.ts$/, loader: 'tslint-loader', exclude: [ helpers.root('node_modules') ] }
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/@angular')
        ]
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript',
        exclude: [ /\.(spec|e2e)\.ts$/ ]
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.scss$/,
        loader: 'raw!sass?includePaths[]=' + helpers.root('node_modules/ionicons/dist/scss')
      },
      {
        test: /\.html$/,
        loader: 'raw',
        exclude: [
          helpers.root('src/index.html')
        ]
      }
    ]
  },
  plugins: [
    new ForkCheckerPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: [ 'polyfills', 'vendor' ].reverse()
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'assets'
      },
      {
        from: 'node_modules/ionic-angular/fonts',
        to: 'assets/fonts',
        ignore: '*.scss'
      },
      {
        from: 'node_modules/ionicons/dist/fonts',
        to: 'assets/fonts',
        ignore: '*.scss'
      }
    ]),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency'
    })
  ],
  node: {
    global: 'window',
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
