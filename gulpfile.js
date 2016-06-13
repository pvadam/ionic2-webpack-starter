require('shelljs/global');

const gulp = require('gulp');
const sharp = require('sharp');
const runSequence = require('run-sequence');
const metadata = require('./config/metadata');

gulp.task('package', () => {
  if ([ 'darwin', 'window', 'linux' ].indexOf(process.env.PLATFORM) > -1) {
    exec(`cp package.json ./www`, { silent: true });
    exec(`cp -R main_process ./www`, { silent: true });
    exec(`mkdir -p ./www/config && cp -R config/metadata.js ./www/config`, { silent: true });
    exec(`./node_modules/electron-packager/cli.js ./www "${metadata.title}" --out=./releases --platform=${process.env.PLATFORM} --arch=all --icon=./src/assets/icons/electron.icns --asar=true`, { silent: true });
  } else if ([ 'ios', 'android' ].indexOf(process.env.PLATFORM) > -1) {
    // TODO - Add cordova packaging
  } else {
    // TODO - Error handling
  }
});

gulp.task('icon:generate', () => {
  const sourceIcon = './icon.png';
  const dstPath = './src/assets/icons';
  const platformIcons = {
    android: [ 36, 48, 72, 96, 144, 192 ],
    apple: [ 57, 60, 72, 76, 114, 120, 144, 152, 180, { size: 192, names: [ '', 'precomposed' ] } ],
    ms: [ 70, 144, 150, 310 ],
    favicon: [ 16, 32, 96, 192 ]
  };

  for (let type in platformIcons) {
    let icons = platformIcons[type];
    exec(`mkdir -p ${dstPath}`, { silent: true });

    for (let i = 0; i < icons.length; i++) {
      const iconSize = icons[i];

      if (typeof iconSize === 'object') {
        iconSize.names.forEach((is) => {
          sharp(sourceIcon)
            .resize(iconSize.size)
            .toFile(`${dstPath}/${type}-icon${is !== '' ? '-precomposed' : ''}.png`);
        });
      } else {
        let filename = `${dstPath}/${type}-icon-${iconSize}x${iconSize}.png`;

        if (type === 'favicon') {
          filename = `${dstPath}/${type}-${iconSize}x${iconSize}.png`;

          if (iconSize === 16) {
            exec(`./node_modules/png2ico/bin/png2ico -i ${sourceIcon} -o ${dstPath}/favicon.ico`, { silent: true });
          }
        }

        sharp(sourceIcon)
          .resize(iconSize)
          .toFile(filename);
      }
    }
  }

  // Generate icon for electron app
  exec(`./node_modules/node-icns/index.js --in=${sourceIcon} --out=${dstPath}/electron.icns`, { silent: true });
});

gulp.task('serve:elt', () => {
  let firstTime = true;
  const args = [];
  const electron = require('electron-connect').server.create({
    electron: require('electron-prebuilt')
  });

  switch (process.env.NODE_ENV) {
    case 'dev':
      gulp.watch([ 'main_process/*' ], () => { electron.restart(args); });

      const child = exec('npm start', { async: true });
      child.stdout.on('data', (data) => {
        if (firstTime && data.indexOf('bundle is now VALID.') > -1) {
          firstTime = false;
          electron.start(args, () => {});
        } else {
          // TODO - Add a better error handling
        }
      });

      break;

    case 'stg':
    case 'prd':
      break;
  }
});

gulp.task('start:elt', (callback) => {
  runSequence('icon:generate', 'serve:elt', callback);
});

gulp.task('prepare:assets', (callback) => {
  runSequence('icon:generate', callback);
});
