'use strict';

require('shelljs/global');

const gulp = require('gulp');
const electron = require('electron-connect').server.create({
  electron: require('electron-prebuilt')
});

gulp.task('start:elt', () => {
  const args = [ 'src/main_process/index.js' ];
  let firstTime = true;

  switch (process.env.NODE_ENV) {
    case 'dev':
      gulp.watch([ 'src/main_process/*' ], () => { electron.restart(args); });

      const child = exec('npm start', { async: true });
      child.stdout.on('data', (data) => {
        if (firstTime && data.indexOf('bundle is now VALID.') > -1) {
          firstTime = false;
          electron.start(args, () => {});
        }
      });
      break;

    case 'stg':
    case 'prd':
      break;
  }
});
