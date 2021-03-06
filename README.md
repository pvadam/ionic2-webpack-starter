# Ionic 2 Webpack Starter

> An Ionic 2 starter kit that uses Webpack with HMR, Karma, Protractor, Istanbul, Typescript, Typings, TSLint and Codelyzer.

## Prerequisites
```
// Install system packages
$ brew install node imagemagick homebrew/science/vips

> Note: The version of `node` should be `>= 6.0.0` and `npm` should be `>= 3.8.0`

// Install the node packages globally
$ npm install -g typings webpack-dev-server webpack cordova asar

// Install the project dependencies
$ npm i
```

## Building HTML5 Web App
```
// Start the web app development
$ npm start

// Generate the app bundles
$ npm run build:<dev|stg|prd>
```

## Building Electron App
```
// Start the electron app development
$ npm run start:elt

// Enable Electron Devtools (Run in chrome console)
$ require(`${process.cwd()}/node_modules/devtron`).uninstall();

// Generate and package the app bundles as a Electron app
$ npm run pkg:<darwin|linux|window>
```

## Building Hybrid Mobile App (Android/iOS)
```
// Add Android/iOS platform
$ cordova platform add <android|ios> --save
```